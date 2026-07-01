const Comment = require('../models/CommentModel');
const CheckIn = require('../models/CheckInModel');
const Post = require('../models/PostModel');
const AppError = require('../utils/AppError');
const {createNotification} = require('../utils/notificationHelper');

// Add comment or reply
const addComment = async (req, res, next) => {
    try {
        const { targetId, targetType, text, parentId } = req.body;

    // get target owner
    let targetOwnerId;
    if (targetType === 'CheckIn') {
        const checkIn = await CheckIn.findById(targetId).select('userId');
        targetOwnerId = checkIn.userId;
    } 
    else if (targetType === 'Post') {
        const post = await Post.findById(targetId).select('userId');
        targetOwnerId = post.userId;
    }

    // if reply → check parent comment exists
    let parentComment = null;
    if (parentId) {
        parentComment = await Comment.findById(parentId);
        if (!parentComment) {
            return next(new AppError("Parent comment not found", 404));
        }
    }

    const comment = await Comment.create({
        userId: req.user._id,
        targetId,
        targetType,
        text,
        parentId: parentId || null
    });

    await comment.populate('userId', 'name username avatar');

    // notifications
    if (parentComment) {
        // reply → notify parent comment owner
        const parentOwnerId = parentComment.userId;

        if (parentOwnerId.toString() !== req.user._id.toString()){
            await createNotification(
                parentOwnerId,
                'comment',
                `${req.user.name} replied to your comment`,
                comment._id,
                'Comment'
            );
        }
 // notify target owner only if different from parent comment owner
        if (
            targetOwnerId.toString() !== req.user._id.toString() &&
            targetOwnerId.toString() !== parentOwnerId.toString()
        ) {
            await createNotification(
                targetOwnerId,
                'comment',
                `${req.user.name} commented on your ${targetType}`,
                comment._id,
                targetType
            );
        }
    } else {
        // top level comment → notify target owner
        if (targetOwnerId.toString() !== req.user._id.toString()) {
            await createNotification(
                targetOwnerId,
                'comment',
                `${req.user.name} commented on your ${targetType}`,
                comment._id,
                targetType
            );
        }
    }

    res.status(201).json({
        message: "Comment added successfully",
        comment
    });
    } catch (err) {
        next(err);
    }
};

// Get comments for a CheckIn or Post
const getComments = async (req, res, next) => {
    try {
        const { targetId, targetType } = req.query;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        // get top level comments only
        const comments = await Comment.find({
            targetId,
            targetType,
            parentId: null
        })
            .populate('userId', 'name username avatar')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        // get replies for each comment
        const commentsWithReplies = await Promise.all(
            comments.map(async (comment) => {
                const replies = await Comment.find({
                    parentId: comment._id
                }).populate('userId', 'name username avatar')
                  .sort({ createdAt: 1 });

                return {
                    ...comment.toObject(),
                    replies
                };
            })
        );

        const total = await Comment.countDocuments({
            targetId,
            targetType,
            parentId: null
        });

        res.status(200).json({
            comments: commentsWithReplies,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (err) {
        next(err);
    }
};

// Delete comment
const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);
        if (!comment) {
            return next(new AppError("Comment not found", 404));
        }

        // only owner can delete
        if (comment.userId.toString() !== req.user._id.toString()) {
            return next(new AppError("Not authorized to delete this comment", 403));
        }

        // delete comment + all its replies
        await Comment.deleteMany({
            $or: [
                { _id: id },
                { parentId: id }
            ]
        });

        res.status(200).json({ message: "Comment deleted successfully" });

    } catch (err) {
        next(err);
    }
};

// Upvote comment
const toggleCommentUpvote = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);
        if (!comment) {
            return next(new AppError("Comment not found", 404));
        }

        const alreadyUpvoted = comment.upvotes.includes(req.user._id);

        if (alreadyUpvoted) {
            comment.upvotes = comment.upvotes.filter(
                uid => uid.toString() !== req.user._id.toString()
            );
        } else {
            comment.upvotes.push(req.user._id);
        }

        await comment.save();

        res.status(200).json({
            message: alreadyUpvoted ? "Upvote removed" : "Upvoted successfully",
            totalUpvotes: comment.upvotes.length
        });

    } catch (err) {
        next(err);
    }
};

module.exports = { addComment, getComments, deleteComment, toggleCommentUpvote };