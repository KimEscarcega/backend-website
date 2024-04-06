document.getElementById("LoginForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const loginData = {
        email: email,
        password: password
    };

    fetch("/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        const success = document.getElementById("Success");
        const error = document.getElementById("error");

        //if you get an error
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
    .catch(error => console.error("Error:", error));
});