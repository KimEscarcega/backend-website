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

  carForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const plate = document.querySelector('input[name="plate"]').value;
    const make = document.querySelector('input[name="make"]').value;
    const model = document.querySelector('input[name="model"]').value;
    const color = document.querySelector('input[name="color"]').value;

    addCar(plate,make,model,color);
    addCarToDatabase(plate, make, model, color);
    carForm.reset();
  });

  function addCarToDatabase(plate, make, model, color) {
    fetch('/addCar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ plate, make, model, color })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        addCar(plate, make, model, color);
      } else {
        console.error('Error adding car:', data.error);
      }
    })
    .catch(error => console.error('Error adding car:', error));
  }

  function addCar(plate, make, model, color) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <b>License Plate:</b> <span class='plate'>${plate}</span>,
      <b>Car Make:</b> <span class='make'>${make}</span>,
      <b>Car Model:</b> <span class='model'>${model}</span>,
      <b>Car Color:</b> <span class='color'>${color}</span>
      <button class='edit'>Edit</button>
      <button class='remove'>Remove</button>`;
    
    carList.appendChild(listItem);

    listItem.querySelector('.edit').addEventListener('click', function () {
      const newPlate = prompt('Enter new license plate:', plate);
      const newMake = prompt('Enter new car make:', make);
      const newModel = prompt('Enter new car model:', model);
      const newColor = prompt('Enter new car color:', color);

      listItem.querySelector('.plate').textContent = newPlate;
      listItem.querySelector('.make').textContent = newMake;
      listItem.querySelector('.model').textContent = newModel;
      listItem.querySelector('.color').textContent = newColor;
    });

    listItem.querySelector('.remove').addEventListener('click', function () {
      listItem.remove();
    });
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
