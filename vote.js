const contestants = [
    { id: 1, name: 'Samuel', votes: 0 },
    { id: 2, name: 'Big Jay', votes: 0 },
    { id: 3, name: 'Tunmininu', votes: 0 },
    { id: 4, name: 'Yemi', votes: 0 },
    { id: 5, name: 'Ifeoluwa', votes: 0 }
];

let userHasVoted = false; // To ensure users can only vote once

const contestantsContainer = document.getElementById('contestants');
const messageDiv = document.getElementById('message');

// Load contestants dynamically
function loadContestants() {
    contestantsContainer.innerHTML = '';
    contestants.forEach(contestant => {
        const contestantDiv = document.createElement('div');
        contestantDiv.classList.add('contestant');

        contestantDiv.innerHTML = `
            <span>${contestant.name} - Votes: ${contestant.votes}</span>
            <button class="vote-btn" data-id="${contestant.id}" ${
            userHasVoted ? 'disabled' : ''
        }>Vote</button>
        `;

        contestantsContainer.appendChild(contestantDiv);
    });

    document.querySelectorAll('.vote-btn').forEach(button => {
        button.addEventListener('click', initiatePayment);
    });
}

// Handle payment and voting
function initiatePayment(event) {
    const contestantId = parseInt(event.target.getAttribute('data-id'));
    const amountInKobo = 100 * 100; // Amount in kobo (e.g., 100 NGN)

    // Paystack Payment Integration
    const handler = PaystackPop.setup({
        key: 'pk_test_70a5edb95c29c7b64aa84cac0928851d429ee39e', // This test public key is my public key and it is there so when the user makes the payment so I will see the money in my pastack account.
        email: 'ifeoluwaolugbode2402@gmail.com',
        amount: amountInKobo,
        currency: 'NGN',
        callback: function (response) {
            // Payment successful
            castVote(contestantId);
            messageDiv.textContent = 'Payment successful! Your vote has been counted.';
        },
        onClose: function () {
            alert('Payment was not completed. Please try again.');
        }
    });

    handler.openIframe();
}

// Cast a vote
function castVote(contestantId) {
    if (userHasVoted) {
        messageDiv.textContent = 'You have already voted!';
        return;
    }

    const contestant = contestants.find(c => c.id === contestantId);
    if (contestant) {
        contestant.votes++;
        userHasVoted = true; // Prevent further voting
        loadContestants(); // Refresh the UI
    }
}

// Initial load
loadContestants();
