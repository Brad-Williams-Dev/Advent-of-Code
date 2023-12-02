const fs = require('fs');
const path = require('path');

function calibrationValues(arr) {
    let calibrationValues = [];
    const numberWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const digitMapping = { 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9' };

    function findFirstAndLastDigit(str) {
        let firstDigit = '';
        let lastDigit = '';

        // Find the first digit or spelled-out digit
        for (let i = 0; i < str.length; i++) {
            if (!isNaN(str[i]) && str[i].trim() !== '') {
                firstDigit = str[i];
                break;
            } else {
                for (const word of numberWords) {
                    if (str.substr(i, word.length) === word) {
                        firstDigit = digitMapping[word];
                        i += word.length - 1; // Skip the rest of the word
                        break;
                    }
                }
            }
            if (firstDigit) break;
        }

        // Find the last digit or spelled-out digit
        for (let i = str.length - 1; i >= 0; i--) {
            if (!isNaN(str[i]) && str[i].trim() !== '') {
                lastDigit = str[i];
                break;
            } else {
                for (const word of numberWords) {
                    if (i - word.length + 1 >= 0 && str.substr(i - word.length + 1, word.length) === word) {
                        lastDigit = digitMapping[word];
                        break;
                    }
                }
            }
            if (lastDigit) break;
        }

        return [firstDigit, lastDigit];
    }

    for (const line of arr) {
        const [firstDigit, lastDigit] = findFirstAndLastDigit(line);

        if (firstDigit && lastDigit) {
            calibrationValues.push(parseInt(firstDigit + lastDigit));
        }
    }

    const sum = calibrationValues.reduce((a, b) => a + b, 0);
    console.log('Sum:', sum);
}

// Usage with your data...


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
