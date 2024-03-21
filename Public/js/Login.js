

document.getElementById("LoginForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const Email = document.querySelector('input[name="Email"]').value;
    const Password = document.querySelector('input[name="Password"]').value;

    const Login = {
        Email: Email,
        Password: Password
    };

    fetch("/api/Login", {
        method: "POST",
        body: JSON.stringify(Login),
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
            
            //Once ALL info is correct redirect to mainScreen
            window.location.href = "/MainScreen.html";
        }
    })
    .catch(error => console.error("Error:", error));
});


