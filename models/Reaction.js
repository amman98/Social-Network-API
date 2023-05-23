const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
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
    }
);

module.exports = Reaction;