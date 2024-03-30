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

  // Function to fetch and display user's cars when the page loads
  function fetchAndDisplayCars() {
      // Send an AJAX request to fetch user's cars from the server
      fetch('/getAllCars', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
          // Optionally, include authentication token or session information in the request headers
      })
      .then(response => response.json())
      .then(data => {
          // Display fetched cars
          data.vehicle.forEach(vehicle => {
              addCarToList(vehicle.plate, vehicle.make, vehicle.model, vehicle.color);
          });
      })
      .catch(error => console.error('Error fetching cars:', error));
  }

  // Fetch and display user's cars when the page loads
  fetchAndDisplayCars();

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
      // Send an AJAX request to the server to add the car to the database
      fetch('/addCar', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              plate: plate,
              make: make,
              model: model,
              color: color
          })
      })
      .then(response => response.json())
      .then(data => {
          console.log(data); // Log response data (optional)
          // Optionally handle success/failure response
      })
      .catch(error => console.error('Error:', error)); // Log and handle errors
  }

  function removeCarFromDatabase(plate) {
      // Send an AJAX request to the server to remove the car from the database
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
          // Optionally handle success/failure response
      })
      .catch(error => console.error('Error:', error));
  }
});

  







/* Add debit/credit card */
document.addEventListener('DOMContentLoaded', function () {
  const cardForm = document.getElementById('CardForm');
  const cardList = document.getElementById('CardList');

  cardForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const DebitCreditCard = document.getElementById('DCC').value;
    const MMYY = document.getElementById('DCCDate').value;
    const CVV = document.getElementById('CVV').value;
    const ZipCode = document.getElementById('Zip').value;
    
    addCard(DebitCreditCard, MMYY, CVV, ZipCode);
    cardForm.reset();
  });

  function addCard(DebitCreditCard, MMYY, CVV, ZipCode) {
    const listItem = document.createElement('li');
    listItem.innerHTML = 
    "<b>Debit Card:</b> <span class='DCC'>" + DebitCreditCard + "</span>" + ", <b>Experation Date:</b> <span class='DCCDate'>" + MMYY +  "</span>, <b>CVV:</b> <span class='CVV'>" + CVV + "</span>" +
    ", <b>Zip Code:</b> <span class='Zip'>" + ZipCode + "</span>" +  " <button class='edit'>Edit</button>" +
    " <button class='remove'>Remove</button>";
    cardList.appendChild(listItem);

    listItem.querySelector('.edit').addEventListener('click', function () {
      const newDebitCreditCard = prompt('Enter new Debit/Credit Card number:', DebitCreditCard);
      const newMMYY = prompt('Enter new experation date:',MMYY);
      const newCVV = prompt('Enter new CVV', CVV);
      const newZip =prompt('Enter new zip code:', ZipCode);
      

      listItem.querySelector('.DCC').textContent=newDebitCreditCard;
      listItem.querySelector('.DCCDate').textContent=newMMYY;
      listItem.querySelector('.CVV').textContent=newCVV;
      listItem.querySelector('.Zip').textContent=newZip;

    });

    listItem.querySelector('.remove').addEventListener('click', function () {
      listItem.remove();
    });
  }
});
