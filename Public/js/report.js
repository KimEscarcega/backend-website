document.addEventListener('DOMContentLoaded', function () {

    const reportForm = document.getElementById('reportForm');

    reportForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const d = document.querySelector('input[name="reportDate"]').value;
        const st = document.querySelector('input[name="reportConfirmedStartTime"]').value;
        const et = document.querySelector('input[name="reportConfirmedEndTime"]').value;
        const ot = document.querySelector('input[name="reportOccupiedTime"]').value;
        const s = document.querySelector('input[name="reportSpot"]').value;
        const l = document.querySelector('input[name="reportLicense"]').value;

     
        if (d && st && et && ot && s && l) {
    
            addReportToDatabase(d, st, et, ot, s, l); // Then add it to the database
            reportForm.reset();
        } else {
            console.error('Please enter all information.');
        }
    });

function addReportToDatabase(reportDate, reportConfirmedStartTime, reportConfirmedEndTime, reportOccupiedTime, reportSpot, reportLicense) {
    const uID = document.getElementById('uID').value; // Retrieve user's ID from HTML element
    fetch('/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            d: reportDate,
            st: reportConfirmedStartTime,
            et: reportConfirmedEndTime,
            ot: reportOccupiedTime,
            s: reportSpot,
            l: reportLicense,
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