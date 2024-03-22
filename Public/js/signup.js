
document.getElementById("signupbob").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const firstname = document.querySelector('input[name="firstname"]').value;
    const lastname = document.querySelector('input[name="lastname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const phone = document.querySelector('input[name="phone"]').value;

    const signupData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        phone: phone
    };

    fetch("/signup", {
        method: "POST",
        body: JSON.stringify(signupData),
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
