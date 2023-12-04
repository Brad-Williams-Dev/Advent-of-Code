const fs = require("fs");
const path = require('path');


function processCard(data, cardIndex, totalCards, cardsCount) {
    if (cardIndex >= data.length) {
        return; // No more cards to process
    }

    const parts = data[cardIndex].split('|');
    const leftSide = parts[0].trim().split(' ').map(Number);
    const rightSide = parts[1].trim().split(' ').map(Number);

    let matches = 0;
    for (let number of rightSide) {
        if (leftSide.includes(number)) {
            matches++;
        }
    }

    // Process the next 'matches' cards
    for (let i = 1; i <= matches; i++) {
        processCard(data, cardIndex + i, totalCards, cardsCount);
    }

    // Count this card
    cardsCount[cardIndex] = (cardsCount[cardIndex] || 0) + 1;
    totalCards.count += 1;
}

function checkScratchTickets(data) {
    let totalCards = { count: 0 };
    let cardsCount = [];

    for (let i = 0; i < data.length; i++) {
        processCard(data, i, totalCards, cardsCount);
    }

    console.log("Total scratchcards: ", totalCards.count);
    return totalCards.count;

}

function readAndProcessData() {
    const filePath = path.join(__dirname, 'data.txt'); // Update the path if necessary

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Processing each line to format it correctly
        let dataArray = data.trim().split('\n').map(line => {
            // Split the line by spaces and filter out non-numeric and non-'|' elements
            let elements = line.split(' ').filter(el => el === '|' || !isNaN(parseInt(el)));

            // Join the elements back into a string
            return elements.join(' ');
        });

        // console.log(dataArray);
        checkScratchTickets(dataArray);
    });
}


readAndProcessData();
