const { User, Thought } = require('../models');

const userCount = async () =>
    User.aggregate()
        .count('userCount')
        .then((numberOfUsers) => numberOfUsers);

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    headCount: await userCount(),
                };
                return res.json(userObj);
            })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    // Get user by id
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('`-__v')
            .then(async (user) =>
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

    // Add a new user
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
    },

    // Update a user by id
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
            .then(async (user) =>
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
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'No such user exists'})
                : res.json({
                    user
                  })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};