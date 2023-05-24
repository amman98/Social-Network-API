const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    // Get user by id
    getSingleUser(req, res) {
        User.findById(req.params.userId)
            //.populate({ path: 'thoughts', select: '-__v' })
            // .select('`-__v')
            .populate("friends")
            .populate("thoughts")
            .then((user) => {
            return !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json({
                    user
                })
            }
            )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    // Add a new user
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
    },

    // Update a user by id
    updateUser(req, res) {
        User.findByIdAndUpdate( req.params.userId , req.body, { new: true })
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json({
                    user
                    })
            )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    // Delete a user by id 
    deleteUser(req, res) {
        User.findByIdAndDelete( req.params.userId )
            .then((user) => {
                if(!user) {
                    return res.status(404).json({ message: 'No such user exists' });
                }

                return Thought.deleteMany({ _id: { $in: user.thoughts } });
            })
            .then((user) => 
                res.json({message: "User and associated thoughts deleted!"})
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Add a friend to user's friend list
    createFriend(req, res) {
        User.findByIdAndUpdate(req.params.userId, { $push: {friends: req.params.friendId} }, { new: true })
            .then((user) => {
                return !user
                ? res.status(404).json({ message: 'No such user exists'})
                : res.json({
                    user
                  })
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Delete a friend in user's friend list
    deleteFriend(req, res) {
        User.findByIdAndUpdate(req.params.userId, { $pull: {friends: req.params.friendId} }, { new: true })
            .then((user) => {
                return !user
                ? res.status(404).json({ message: 'No such user exists'})
                : res.json({
                    user
                  })
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
};