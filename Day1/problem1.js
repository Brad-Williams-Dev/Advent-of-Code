const fs = require('fs');
const path = require('path');

// Your existing calibrationValues function
function calibrationValues(arr) {
    let calibrationValues = [];
    for (let i = 0; i < arr.length; i++) {
        let firstDigit = '';
        let lastDigit = '';

        // Find the first digit
        for (let j = 0; j < arr[i].length; j++) {
            if (!isNaN(arr[i][j]) && arr[i][j].trim() !== '') {
                firstDigit = arr[i][j];
                break;
            }
        }

        // Find the last digit
        for (let j = arr[i].length - 1; j >= 0; j--) {
            if (!isNaN(arr[i][j]) && arr[i][j].trim() !== '') {
                lastDigit = arr[i][j];
                break;
            }
        }

        if (firstDigit !== '' && lastDigit !== '') {
            calibrationValues.push(parseInt(firstDigit + lastDigit));
        }
    }
    let answer = 0;

    for (let i = 0; i < calibrationValues.length; i++) {
        answer += calibrationValues[i];
    }

    console.log(answer);
}


function readAndProcessData() {
    const filePath = path.join(__dirname, 'dataProblem1.txt'); // Update the path if necessary

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        let dataArray = data.trim().split('\n');
        calibrationValues(dataArray);
    });
}

readAndProcessData();
