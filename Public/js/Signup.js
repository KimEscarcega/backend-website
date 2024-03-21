
document.getElementById("signupbob").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const FirstName = document.querySelector('input[name="FirstName"]').value;
    const LastName = document.querySelector('input[name="LastName"]').value;
    const Email = document.querySelector('input[name="Email"]').value;
    const Password = document.querySelector('input[name="Password"]').value;
    const Phone = document.querySelector('input[name="Phone"]').value;

    const Signup = {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Password: Password,
        Phone: Phone
    };

    fetch("/api/Signup", {
        method: "POST",
        body: JSON.stringify(Signup),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
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
        }
    })
    .catch(error => console.error("Error:", error));
});

