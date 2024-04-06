const imgDiv=document.querySelector('.user-img');
const img=document.querySelector('#photo');
const file=document.querySelector('#file');
const buttonupload=document.querySelector('#buttonupload');


window.onload=function(){
    const storedProfilePicURL=localStorage.getItem("profilePicURL");
    if(storedProfilePicURL){
        document.getElementById("photo").src=storedProfilePicURL;
    }
    else{
        document.getElementById("photo").src="Images/avatar.jpg";
    }
};

document.getElementById("file").addEventListener("change", function(event){
    const file=event.target.files[0];
    const reader=new FileReader();

    reader.onload=function(){
        const imageURL=reader.result;
        document.getElementById("photo").src=imageURL;

        localStorage.setItem("profilePicURL", imageURL);

    };
    reader.readAsDataURL(file);
});

document.getElementById("removeprofilepic").addEventListener("click", function(){
    document.getElementById("photo").src="Images/avatar.jpg";
    localStorage.removeItem("profilePicURL");
});

document.getElementById("saveprofilepic").addEventListener("click", function(){
    const currentProfilePicURL=document.getElementById("photo").src;

    alert("Profile picture saved" );
});




/* Add car */
document.addEventListener('DOMContentLoaded', function () {
    const carForm = document.getElementById('carForm');
    const carList = document.getElementById('list');
    
    // Fetch and display user's cars when the page loads
    fetchAndDisplayCars();

    // Function to fetch and display user's cars
    function fetchAndDisplayCars() {
      
        
        fetch('/getAllCars', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            }, 
       
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.vehicle && data.vehicle.length > 0) {
                data.vehicle.forEach(vehicle => {
                    addCarToList(vehicle.plate, vehicle.make, vehicle.model, vehicle.color);
                });
            } else {
                console.log('No cars found for the user');
            }
        })
        .catch(error => console.error('Error fetching cars:', error));
    }

    carForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const plate = document.querySelector('input[name="plate"]').value;
        const make = document.querySelector('input[name="make"]').value;
        const model = document.querySelector('input[name="model"]').value;
        const color = document.querySelector('input[name="color"]').value;
     
        if (plate && make && model && color) {
            addCarToList(plate, make, model, color); // Add car to the list first
            addCarToDatabase(plate, make, model, color); // Then add it to the database
            carForm.reset();
        } else {
            console.error('Please enter all information.');
        }
    });

    function addCarToList(plate, make, model, color) {
        const listItem = document.createElement('li');
        listItem.innerHTML =
            "<b>License Plate:</b> <span class='plate'>" + plate + "</span>, <b>Car Make:</b> <span class='make'>" + make
            + "</span>, <b>Car Model:</b> <span class='model'>" + model + "</span>, <b>Car Color:</b> <span class='color'>"
            + color + "</span> <button class='remove'>Remove</button>";
        carList.appendChild(listItem);

        listItem.querySelector('.remove').addEventListener('click', function () {
            listItem.remove();
            removeCarFromDatabase(plate); // Call the function to remove car from the database
        });
    }

    function addCarToDatabase(plate, make, model, color) {
        const uID = document.getElementById('uID').value; // Retrieve user's ID from HTML element
        fetch('/addCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plate: plate,
                make: make,
                model: model,
                color: color,
                uID:uID
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
        })
        .catch(error => console.error('Error:', error)); // Log and handle errors
    }

    function removeCarFromDatabase(plate) {
        // Send an AJAX request to the server 
        fetch('/deleteCar', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plate: plate
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
           
        })
        .catch(error => console.error('Error:', error));
    }
});







/* Add debit/credit card */
document.addEventListener('DOMContentLoaded', function () {
    const cardForm = document.getElementById('cardForm');
    const cardList = document.getElementById('lists');

    // Fetch and display user's cards when the page loads
    fetchAndDisplayCards();

    cardForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
        const cardNo = document.querySelector('input[name="cardNo"]').value;
        const cardCVV = document.querySelector('input[name="cardCVV"]').value;
        const cardExDate = document.querySelector('input[name="cardExDate"]').value;
        const zipCode = document.querySelector('input[name="zipCode"]').value;

        if (cardNo && cardCVV && cardExDate && zipCode) {
            addCardToDatabase(cardNo, cardCVV, cardExDate, zipCode); // Submit the form asynchronously
            cardForm.reset();
        } else {
            console.error('Please enter all information.');
        }
    });

    function addCardToDatabase(cardNo, cardCVV, cardExDate, zipCode) {
        const uID = document.getElementById('uID').value; // Retrieve user's ID from HTML

        fetch('/addCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cardNo: cardNo,
                cardCVV: cardCVV,
                cardExDate: cardExDate,
                zipCode: zipCode,
                uID: uID
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error:', error)); // Log and handle errors
    }

    // Fetch and display user's cards info
    function fetchAndDisplayCards() {
        // Fetch user's cards from the server
        fetch('/getAllCards', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Display fetched cards
            data.payment.forEach(payment => {
                addCardToList(payment.cardNo, payment.cardCVV, payment.cardExDate, payment.zipCode);
            });
        })
        .catch(error => console.error('Error fetching cards:', error));
    }

    // Function to add card to the list
    function addCardToList(cardNo, cardCVV, cardExDate, zipCode) {
        const listItems = document.createElement('li');
        listItems.innerHTML =
            "<b>Debit/Credit Card #:</b> <span class='No'>" + cardNo + "</span>, <b>Date:</b> <span class='ExDate'>" + cardExDate
            + "</span>, <b>CVV:</b> <span class='cvv'>" + cardCVV + "</span>, <b>Zip Code:</b> <span class='zip'>"
            + zipCode + "</span> <button class='remove'>Remove</button>";
        cardList.appendChild(listItems);

        listItems.querySelector('.remove').addEventListener('click', function () {
            listItems.remove();
            removeCardFromDatabase(cardNo); // Call the function to remove cardNo from the database
        });
    }

    // Function to remove card from the database
    function removeCardFromDatabase(cardNo) {
        fetch('/deleteCard', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cardNo: cardNo
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Optionally handle success/failure response
        })
        .catch(error => console.error('Error:', error));
    }
});