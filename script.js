var cardCount = 0;
var totalEntered = 0;

// function isValidNumber(input) {
//     return /^\d*\.?\d*$/.test(input);
// }

function calculateAverage() {
    return totalEntered / cardCount || 0;
}

function calculatePercentage(average) {
    return 7.1 * average + 11;
}

function updateAverage() {
    var average = calculateAverage();
    var percentage = calculatePercentage(average);
    document.getElementById('averageText').textContent = 'Average: ' + average.toFixed(2);
    document.getElementById('percentageText').textContent = 'Percentage: ' + percentage.toFixed(2);
}

function enableAddButton() {
    var fileLinkValue = document.getElementById('fileLinkInput').value.trim();
    var cardCountValue = document.getElementById('cardCountInput').value.trim();
    var addButton = document.getElementById('addCardBtn');
    addButton.disabled = !(fileLinkValue && cardCountValue);
}

function addCard() {
    var enteredNumber = document.getElementById('cardCountInput').value.trim();
    if (enteredNumber <= 0) {
        alert('Please enter a valid number greater than 0.');
        return;
    }
    var totalAfterAdding = cardCount + 1;
    if (totalAfterAdding > 8) {
        $('#errorModal').modal('show');
        return;
    }
    cardCount++;
    totalEntered += parseFloat(enteredNumber);
    updateAverage();
    var pastedLink = document.getElementById('fileLinkInput').value.trim();
    var newCard = document.createElement('div');
    newCard.className = 'col-md-6';
    newCard.innerHTML = `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">Semester ${cardCount}</h5>
                <p class="card-text"> SGPI : ${enteredNumber}</p>
                <p class="card-text"><a href="${pastedLink}" target="_blank">View Marksheet</a></p>
            </div>
        </div>
    `;
    document.getElementById('cardContainer').appendChild(newCard);
    document.getElementById('cardCountInput').value = '';
    document.getElementById('fileLinkInput').value = '';
    document.getElementById('addCardBtn').setAttribute('disabled', 'disabled');
    // enableAddButton();
}

document.getElementById('addCardBtn').addEventListener('click', addCard);
document.getElementById('fileLinkInput').addEventListener('input', enableAddButton);
document.getElementById('cardCountInput').addEventListener('input', enableAddButton);
