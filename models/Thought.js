const { Schema } = require('mongoose');

// creates schema for Thought model
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter function formats the date
            get: function() {
                // Example format: 5:50:27 PM
                return this.createdAt.toLocaleTimeString();
            }, 
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Reaction,
                ref: 'Reaction',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    });

module.exports = Thought;