document.addEventListener('DOMContentLoaded', function () {

    const reportForm = document.getElementById('feedbackForm');

    reportForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const d = document.querySelector('input[name="feedbackDate"]').value;
        const r = document.querySelector('input[name="reviewtxt"]').value;

     
        if (d && r) {
    
            addFeedbackToDatabase(d, r); // Then add it to the database
            feedbackForm.reset();
        } else {
            console.error('Please enter all information.');
        }
    });

function addFeedbackToDatabase(feedbackDate, reviewtxt) {
    const uID = document.getElementById('uID').value; // Retrieve user's ID from HTML element
    fetch('/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            d: feedbackDate,
            r: reviewtxt,
            uID: uID

        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
    })
    .catch(error => console.error('Error:', error)); // Log and handle errors
}
});