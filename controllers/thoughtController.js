const { User, Thought, Reaction } = require('../models');
const mongoose = require('mongoose');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Get thought by id
    getSingleThought(req, res) {
        Thought.findById(req.params.thoughtId)
            .then((thought) => {
                return !thought
                    ? res.status(404).json({ message: 'No thought with that ID '})
                    : res.json({
                        thought
                })
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    // Add a new thought
    createThought(req, res) {
        let thought;
        Thought.create(req.body)
            .then((newThought) => {
                thought = newThought;
                const userId = new mongoose.Types.ObjectId(req.body.userId);
                return User.findByIdAndUpdate(userId, { $push: {thoughts: thought._id} });
            })
            .then(() => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },

    // Update a thought by id
    updateThought(req, res) {
        Thought.findByIdAndUpdate( req.params.thoughtId, req.body, { new: true })
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
                : res.json({ 
                    thought 
                    })      
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Delete a thought by id
    deleteThought(req, res) {
        let thought;
        Thought.findByIdAndDelete(req.params.thoughtId)
            // deletes thought from user thoughts array
            .then((newThought) => {
                thought = newThought;
                return User.findOneAndUpdate({ username: newThought.username }, { $pull: {thoughts: req.params.thoughtId} });
            })
            .then(() =>
                !thought
                ? res.status(404).json({ message: 'No such thought exists'})
                : res.json({message: "Thought deleted!"})    
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    createReaction(req, res) {
        Thought.findByIdAndUpdate(req.params.thoughtId, { $push: {reactions: req.body } }, { new: true })
            .then((thought) => 
                !thought
                ? res.status(404).json({ message: 'No such thought exists'})
                : res.json({
                    thought
                })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    }
};