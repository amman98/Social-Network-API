const userData = [
    "amman",
    "john",
];

const reactionsData = [
    "Good point!",
    "Love this!",
    "Couldn't agree more.",
    "Nice",
    "Okay",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getReactions = () => {
    const results = [];
    for(let i = 0; i < reactionsData.length; i++) {
        results.push({
            reactionBody: reactionsData[i],
            username: getRandomArrItem(userData),
        });
    }

    return results;
}

module.exports = { getRandomArrItem, getReactions };