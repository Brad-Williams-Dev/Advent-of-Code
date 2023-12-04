const fs = require("fs");
const path = require('path');



function checkScratchTickets(data) {
    let totalPoints = 0;

    for (let i = 0; i < data.length; i++) {
        // Splitting each card data into two parts: before and after '|'
        const parts = data[i].split('|');
        const leftSide = parts[0].trim().split(' ').map(Number);
        const rightSide = parts[1].trim().split(' ').map(Number);

        let points = 0;
        let isFirstWinningNumber = true;

        // Checking each number on the right side against the left side
        for (let number of rightSide) {
            if (leftSide.includes(number)) {
                if (isFirstWinningNumber) {
                    points = 1;
                    isFirstWinningNumber = false;
                } else {
                    points *= 2;
                }
            }
        }

        totalPoints += points;
    }

    console.log("Total Points: ", totalPoints);
    return totalPoints;
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