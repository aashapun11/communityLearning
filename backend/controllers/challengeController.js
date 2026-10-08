const Challenge = require('../models/ChallengeModel');
const CheckIn = require('../models/CheckInModel');
const AppError = require('../utils/AppError');
const { processJoinRewards } = require('../utils/challengeRewards');
const {topicCategories} = require('../constants/topicCategories');
const Badge = require('../models/BadgeModel');



const createChallenge = async (req, res, next) => {
    try {
        const { title, topic, description, difficulty, duration, startDate, isPublic } = req.body;


        // calculate endDate automatically
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(end.getDate() + Number(duration) - 1); // -1 because endDate is inclusive (duration);

        const challenge = new Challenge({
            title,
            topic,
            description,
            difficulty,
            duration,
            startDate: start,
            endDate: end,
            isPublic,
            rewards: [
              {badgeType: "on_fire"},
              {badgeType: "unstoppable"},
              {badgeType: "finisher"}
            ],
            createdBy: req.user._id  // comes from JWT middleware
        });

        await challenge.save();

        res.status(201).json({
            message: "Challenge created successfully",
            challenge
        });

    } catch (err) {
        next(err);
    }
};

const updateChallenge = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, topic, description, difficulty, duration, startDate, isPublic } = req.body;

        // find challenge
        const challenge = await Challenge.findById(id);

        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        // only creator can update
        if (challenge.createdBy.toString() !== req.user._id.toString()) {
            return next(new AppError("Not authorized to update this challenge", 403));
        }

        // lock if participants have joined
        if (challenge.participants.length > 0) {
            return next(new AppError("Cannot update challenge once participants have joined", 400));
        }

        // recalculate endDate if startDate or duration changes
        const start = new Date(startDate || challenge.startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + (duration || challenge.duration));

        challenge.title = title || challenge.title;
        challenge.topic = topic || challenge.topic;
        challenge.description = description || challenge.description;
        challenge.difficulty = difficulty || challenge.difficulty;
        challenge.duration = duration || challenge.duration;
        challenge.startDate = start;
        challenge.endDate = end;
        challenge.isPublic = isPublic ?? challenge.isPublic; //if undefined or null, use existing value

        await challenge.save();

        res.status(200).json({
            message: "Challenge updated successfully",
            challenge
        });

    } catch (err) {
        next(err);
    }
};

const deleteChallenge = async (req, res, next) => {
    try {
        const { id } = req.params;

        // find challenge
        const challenge = await Challenge.findById(id);
        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        // only creator can delete
        if (challenge.createdBy.toString() !== req.user._id.toString()) {
            return next(new AppError("Not authorized to delete this challenge", 403));
        }

        // hard delete if no participants
        if (challenge.participants.length === 0) {
            await Challenge.findByIdAndDelete(id);
            return res.status(200).json({ message: "Challenge deleted successfully" });
        }

        // soft delete if participants exist
        challenge.isActive = false;
        await challenge.save();

        res.status(200).json({ message: "Challenge archived successfully" });

    } catch (err) {
        next(err);
    }
};

const getTopics = async (req, res, next) => {
  try {
    
    const topics = await Challenge.aggregate([
      { $match: { isPublic: true, isActive: true } },
      { $group: { _id: "$topic", count: { $sum: 1 } } }
    ]);
    res.status(200).json({ topics });
  } catch (err) {
    next(err);
  }
};

// const getChallenges = async (req, res, next) => {
//     try {
//         const { topic, difficulty, search, page = 1, limit = 10 } = req.query;

//         // build filter
//         const filter = { isPublic: true, isActive: true };

//         if (topic) filter.topic = topic;
//         if (difficulty) filter.difficulty = difficulty;
//         if (search) {
//             filter.title = { $regex: search, $options: 'i' }; // case insensitive
//         }

//         const skip = (page - 1) * limit;

//         const challenges = await Challenge.find(filter)
//             .populate('createdBy', 'name avatar')
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(Number(limit));

//         const total = await Challenge.countDocuments(filter);
//         const formattedChallenges = challenges.map(challenge => ({
//         ...challenge.toObject(),
//         totalParticipants: challenge.participants.length,
//         }));

//         res.status(200).json({
//             challenges: formattedChallenges,
//             pagination: {
//                 total,
//                 page: Number(page),
//                 pages: Math.ceil(total / limit)
//             }
//         });

//     } catch (err) {
//         next(err);
//     }
// };

const getChallenges = async (req, res, next) => {
  try {
    const { topic } = req.query;

    // Build filter
    const filter = {
      isPublic: true,
      isActive: true,
    };

    // Filter by topic if provided
    if (topic) {
      filter.topic = topic.trim().toLowerCase();
    }

    // Fetch challenges
    const challenges = await Challenge.find(filter)
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalChallenges: challenges.length,
      topic: topic || null,
      challenges,
    });
  } catch (err) {
    next(err);
  }
};
const getChallengeById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const challenge = await Challenge.findOne({ _id: id, isActive: true })
            .populate('createdBy', 'name avatar')
            .populate('participants', 'name avatar');

        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        const today = new Date();
        const DAY = 1000 * 60 * 60 * 24;

        let completedDays = 0;
        let remainingDays = challenge.duration;
        let progressPercent = 0;
        let status = "";

        if (today < challenge.startDate) {
            status = "upcoming";

            completedDays = 0;
            remainingDays = challenge.duration;
            progressPercent = 0;

        } else if (today > challenge.endDate) {
            status = "completed";

            completedDays = challenge.duration;
            remainingDays = 0;
            progressPercent = 100;

        } else {
            status = "ongoing";

            completedDays =
                Math.floor((today - challenge.startDate) / DAY) + 1;

            completedDays = Math.min(completedDays, challenge.duration);

            remainingDays = challenge.duration - completedDays;

            progressPercent = Math.floor(
                (completedDays / challenge.duration) * 100
            );
        }


         // user progress — only if logged in
        let userProgress = null;

       if (req.user) {
    const isParticipant = challenge.participants.some(
        p => p._id.toString() === req.user._id.toString()
    );

    userProgress = {
        isJoined: isParticipant
    };

    if (isParticipant) {
        const totalCheckIns = await CheckIn.countDocuments({
            userId: req.user._id,
            challengeId: id
        });

        userProgress = {
            ...userProgress,
            totalCheckIns,
            progressPercent: Math.min(
                100,
                Math.floor((totalCheckIns / challenge.duration) * 100)
            ),
            isCompleted: totalCheckIns >= challenge.duration
        };
    }
}

        res.status(200).json({
            challenge,
            stats: {
                totalParticipants: challenge.participants.length,
                completedDays,
                remainingDays,
                progressPercent,
                status
            },
            userProgress
        });

    } catch (err) {
        next(err);
    }
};

const getChallengeDetails = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { challengeId } = req.params;

    // Find challenge
    const challenge = await Challenge.findById(challengeId)
      .populate("createdBy", "name username avatar")
      .select(
        "_id title topic description difficulty duration startDate endDate participants maxParticipants isPublic isActive createdBy rewards"
      )
      .lean();

    if (!challenge) {
      return res.status(404).json({
        message: "Challenge not found",
      });
    }

    // Check whether current user has joined
    const hasJoined = challenge.participants.some(
      (participantId) =>
        participantId.toString() === userId.toString()
    );

    if (!hasJoined) {
      return res.status(403).json({
        message: "You have not joined this challenge",
      });
    }

    // Get user's check-ins for this challenge
    const checkIns = await CheckIn.find({
      userId,
      challengeId,
    })
      .sort({ date: -1 })
      .select("_id note mediaUrl date upvotes")
      .lean();

    // Calculate challenge day for each check-in
    const challengeStart = new Date(challenge.startDate);
    challengeStart.setHours(0, 0, 0, 0);

    const checkInsWithDay = checkIns.map((checkIn) => {
      const checkInDate = new Date(checkIn.date);
      checkInDate.setHours(0, 0, 0, 0);

      const differenceInDays =
        Math.floor(
          (checkInDate - challengeStart) /
            (1000 * 60 * 60 * 24)
        );

      return {
        ...checkIn,
        day: differenceInDays + 1,
      };
    });

    // Latest check-in
    const lastCheckIn =
      checkIns.length > 0
        ? checkIns[0].date
        : null;

    // Total completed days
    const completedDays = checkIns.length;

    // Calculate progress
    const progress =
      challenge.duration > 0
        ? Math.round(
            (completedDays / challenge.duration) * 100
          )
        : 0;

    // Remaining days
    const remainingDays = Math.max(
      challenge.duration - completedDays,
      0
    );

    // Fetch rewards and check if user has unlocked them
   const rewards = await Promise.all(
  (challenge.rewards || []).map(async (reward) => {
    const badge = await Badge.findOne({
      userId,
      type: reward.badgeType,
    }).lean();
    return {
      badgeType: reward.badgeType,
      unlocked: !!badge,
    };
  })
);

    res.status(200).json({
      message: "Challenge details fetched successfully",

      challenge: {
        ...challenge,

        participantsCount:
          challenge.participants.length,

        hasJoined,

        completedDays,
        remainingDays,
        progress,

        lastCheckIn,

        checkIns: checkInsWithDay,
        rewards
      },

      userProgress: {
        currentStreak: req.user.currentStreak,
        longestStreak: req.user.longestStreak,
        coins: req.user.coins,
      },
    });
  } catch (error) {
    next(error);
  }
};

 const getMyChallenges = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const challenges = await Challenge.find({
      participants: userId,
    })
      .select(
        "_id title topic difficulty duration startDate endDate participants isActive"
      )
      .sort({ createdAt: -1 })
      .lean();

    const challengesWithProgress = await Promise.all(
      challenges.map(async (challenge) => {
        // Get user's latest check-in for this challenge
        const lastCheckIn = await CheckIn.findOne({
          userId,
          challengeId: challenge._id,
        })
          .sort({ date: -1 })
          .select("date")
          .lean();

        // Count total check-ins for this challenge
        const completedDays = await CheckIn.countDocuments({
          userId,
          challengeId: challenge._id,
        });

        return {
          ...challenge,

          // Challenge-level information
          membersCount: challenge.participants.length,

          // User-specific information
          completedDays,
          currentStreak: req.user.currentStreak,
          coins: req.user.coins,

          lastCheckIn: lastCheckIn
            ? lastCheckIn.date
            : null,
        };
      })
    );

    res.status(200).json({
      message: "My challenges fetched successfully",
      count: challengesWithProgress.length,
      challenges: challengesWithProgress,
    });
  } catch (error) {
    next(error);
  }
};
const joinChallenge = async (req, res, next) => {
    try {
        const { id } = req.params;

        const challenge = await Challenge.findById(id);

        // challenge exists?
        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        // challenge active and public?
        if (!challenge.isActive || !challenge.isPublic) {
            return next(new AppError("Challenge is not available", 400));
        }

        // joining before startDate?
        const today = new Date();
        if (today >= challenge.startDate) {
            return next(new AppError("Challenge has already started, cannot join", 400));
        }

        // already joined?
        const alreadyJoined = challenge.participants.includes(req.user._id);
        if (alreadyJoined) {
            return next(new AppError("You have already joined this challenge", 400));
        }

        challenge.participants.push(req.user._id);
        await challenge.save();

        const rewards = await processJoinRewards(req.user._id);

        res.status(200).json(
            {message: "Successfully joined the challenge" ,
            rewards : {
                totalCoinsEarned: rewards.totalCoinsEarned,
                badgesEarned: rewards.badgesEarned
            }
        }
        );

    } catch (err) {
        next(err);
    }
};

const leaveChallenge = async (req, res, next) => {
    try {
        const { id } = req.params;

        const challenge = await Challenge.findById(id);

        // challenge exists?
        if (!challenge) {
            return next(new AppError("Challenge not found", 404));
        }

        // challenge ended?
        const today = new Date();
        if (today > challenge.endDate) {
            return next(new AppError("Challenge has already ended", 400));
        }

        // creator cannot leave
        if (challenge.createdBy.toString() === req.user._id.toString()) {
            return next(new AppError("Creator cannot leave their own challenge", 400));
        }

        // already not a participant?
        const isParticipant = challenge.participants.includes(req.user._id);
        if (!isParticipant) {
            return next(new AppError("You are not a participant of this challenge", 400));
        }

        // remove from participants
        challenge.participants = challenge.participants.filter(
            participant => participant.toString() !== req.user._id.toString()
        );

        await challenge.save();

        res.status(200).json({ message: "Successfully left the challenge" });

    } catch (err) {
        next(err);
    }
};
const getChallengesCategory = async (req, res, next) => {
  try {
    res.status(200).json({
      categories: topicCategories,
    });
  } catch (err) {
    next(err);
  }
};

const getTopicsByCategory  = (req, res) => {
  const { slug } = req.params;

  const topics = topicCategories[slug];

  if (!topics) {
    return res.status(404).json({
      message: "Category not found"
    });
  }

  res.status(200).json({
    topics
  });
};

module.exports = { createChallenge, updateChallenge, deleteChallenge, getChallenges, getChallengeById, getChallengeDetails, getMyChallenges, joinChallenge, leaveChallenge, getTopicsByCategory, getChallengesCategory };