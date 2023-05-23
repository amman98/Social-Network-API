const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomArrItem, getReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
  
    // Drop existing users
    await User.deleteMany({});
  
    // Drop existing thoughts
    await Thought.deleteMany({});
  
    // Create empty arrays to hold the users and thoughts
    const users = [];
    const thoughts = [];

    // due to codependency between users and thoughts, must hard code their data
    
    // add user data
    const userAmman = {
        username: "amman",
        email: "ammannega@gmail.com",
        thoughts: [],
        friends: [],
    }

    const userJohn = {
        username: "john",
        email: "john@gmail.com",
        thoughts: [],
        friends: [],
    }

    // add thought data
    const thoughtOne = {
        thoughtText: "I love JavaScript!",
        username: userAmman.username,
        reactions: [],
    }
    const thoughtTwo = {
        thoughtText: "Going on vacation in Hawaii!",
        username: userAmman.username,
        reactions: [],
    }

    const thoughtThree = {
        thoughtText: "Any movie recommendations?",
        username: userJohn.username,
        reactions: [],
    }

    const thoughtFour = {
        thoughtText: "Who's gonna see the new Marvel movie?",
        username: userJohn.username,
        reactions: [],
    }

    // push thought data to users
    userAmman.thoughts.push(thoughtOne);
    userAmman.thoughts.push(thoughtTwo);

    userJohn.thoughts.push(thoughtThree);
    userJohn.thoughts.push(thoughtFour);

    // add user and thought objects to arrays
    users.push(userAmman);
    users.push(userJohn);

    thoughts.push(thoughtOne);
    thoughts.push(thoughtTwo);
    thoughts.push(thoughtThree);
    thoughts.push(thoughtFour);

    const reactions = getReactions(); // get array of reactions
  
    // add a reaction to a random thought
    for(let i = 0; i < reactions.length; i++) {
        getRandomArrItem(thoughts).reactions.push(reactions[i]);
    }

    // Add users and thoughts to the collections and await the results
    await User.collection.insertOne(userAmman);
    await User.collection.insertOne({
        username: userJohn.username,
        email: userJohn.email,
        thoughts: userJohn.thoughts,
        friends: [userAmman._id],
    });

    //await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  });