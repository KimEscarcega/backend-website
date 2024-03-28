document.getElementById("feedbackform").addEventListener("submit",(event) => {
   // event.preventDefault(); // Prevent form submission

    const feedbackDate = document.querySelector('input[name="feedbackDate"]').value;
    const reviewtxt = document.querySelector('textarea[name="reviewtxt"]').value;

    const feedbackData = {
        feedbackDate: feedbackDate,
        reviewtxt: reviewtxt,
    };

    fetch("/feedback", {
        method: "POST",
        body: JSON.stringify(feedbackData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No response');
        }
        return response.json();
    })
    .then(data => {
        const success = document.getElementById("Success");
        const error = document.getElementById("error");

        if (data.status === "error") {
            success.style.display = "none";
            error.style.display = "block";
            error.innerText = data.error;
        } else {
            error.style.display = "none";
            success.style.display = "block";
            success.innerText = data.success;

            window.location.href = "/main";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        // Handle/display the error to the user
    });
});
