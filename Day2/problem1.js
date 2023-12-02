const fs = require('fs');
const path = require('path');


isGamePossible = (gamesData) => {
    let gamePossible = [];
    let redCount = 12;
    let greenCount = 13;
    let blueCount = 14;

    for (let gameKey in gamesData) {
        if (gamesData.hasOwnProperty(gameKey)) {
            let gameRounds = gamesData[gameKey];
            let isCurrentGamePossible = true;

            for (let round of gameRounds) {
                if ((round.red && round.red > redCount) ||
                    (round.green && round.green > greenCount) ||
                    (round.blue && round.blue > blueCount)) {
                    isCurrentGamePossible = false;
                    break; // Stop checking this game if any round is not possible
                }
            }

            if (isCurrentGamePossible) {
                let gameIndex = parseInt(gameKey.split(' ')[1]);
                gamePossible.push(gameIndex);
            }
        }
    }

    let answer = 0;

    for (let i = 0; i < gamePossible.length; i++) {
        answer += gamePossible[i];
    }
    console.log(gamePossible);
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

