const fs = require('fs');
const path = require('path');


isGamePossible = (gamesData) => {
    let powers = [];
    let redCount = 0;
    let greenCount = 0;
    let blueCount = 0;
    for (let gameKey in gamesData) {
        if (gamesData.hasOwnProperty(gameKey)) {
            let gameRounds = gamesData[gameKey];
            for (let round of gameRounds) {
                if (round.red > redCount) {
                    redCount = round.red;
                }
                if (round.green > greenCount) {
                    greenCount = round.green;
                }
                if (round.blue > blueCount) {
                    blueCount = round.blue;
                }


            }
            powers.push(redCount * greenCount * blueCount);
            redCount = 0;
            greenCount = 0;
            blueCount = 0;

        }
    }
    let answer = 0;
    for (let i = 0; i < powers.length; i++) {
        answer += powers[i];
    }
    console.log(powers);
    console.log(answer);
};






function readAndProcessData() {
    const filePath = path.join(__dirname, 'data.txt'); // Update the path if necessary

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const gamesData = data.trim().split('Game ').slice(1); // Splitting by 'Game ' and removing the first empty element
        let gamesResults = {};

        gamesData.forEach(gameData => {
            const gameNumber = gameData.split(':')[0].trim(); // Extracting the game number
            const roundsData = gameData.substring(gameData.indexOf(':') + 1).trim().split('; ');

            const rounds = roundsData.map(round => {
                const colors = round.split(', ');
                let roundResult = {};
                colors.forEach(colorSegment => {
                    const [count, color] = colorSegment.split(' ');
                    roundResult[color] = parseInt(count);
                });
                return roundResult;
            });

            gamesResults[`Game ${gameNumber}`] = rounds; // Assigning rounds to the corresponding game
        });

        console.log(isGamePossible(gamesResults));
    });
}

readAndProcessData();

