const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({

title: {
    type: String,
    required: true,
    trim: true
},

   topic: {
    type: String,
    required: true,
    enum: ['algorithms', 'data-structures', 'mathematics', 
           'artificial-intelligence', 'c', 'c++', 'java', 
           'python', 'node', 'sql', 'databases', 'linux-shell'],

//       Seee this ...................        enum: [
//     // Core CS
//     'algorithms',
//     'data-structures',
//     'mathematics',
//     'operating-systems',
//     'networking',
//     'database-management-systems',
//     'software-engineering',

//     // Programming Languages
//     'c',
//     'c++',
//     'java',
//     'python',
//     'javascript',
//     'typescript',
//     'csharp',
//     'go',
//     'rust',
//     'kotlin',
//     'swift',
//     'r',
//     'php',
//     'ruby',

//     // Web Development
//     'html',
//     'css',
//     'react',
//     'nextjs',
//     'nodejs',
//     'expressjs',

//     // Databases
//     'sql',
//     'nosql',
//     'mongodb',
//     'postgresql',
//     'mysql',
//     'databases',

//     // Data Science & AI
//     'numpy',
//     'pandas',
//     'machine-learning',
//     'deep-learning',
//     'artificial-intelligence',
//     'data-analysis',
//     'data-visualization',

//     // Systems & DevOps
//     'linux',
//     'shell',
//     'git',
//     'github',
//     'docker',
//     'kubernetes',
//     'cloud-computing',
//     'aws',

//     // Security
//     'cybersecurity',
//     'cryptography',

//     // Programming Concepts
//     'object-oriented-programming',
//     'functional-programming',
//     'design-patterns',
//     'regex',
//     'testing',
//     'debugging',

//     // Mobile Development
//     'android-development',
//     'ios-development',

//     // Misc
//     'other'
//  ]
},  
    description: {
        type: String,
        required: true
    },
    difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    duration: {
        type: Number, // in days
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    maxParticipants: {
    type: Number,
    default: null // null = unlimited
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{ timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);