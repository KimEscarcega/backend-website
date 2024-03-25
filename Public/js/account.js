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
    const licensePlate = document.getElementById('licensePlate').value;
    const carMake = document.getElementById('carMake').value;
    const carModel = document.getElementById('carModel').value;
    const carColor = document.getElementById('carColor').value;
    
    addCar(licensePlate, carMake, carModel, carColor);
    carForm.reset();
  });

  function addCar(licensePlate, carMake, carModel, carColor) {
    const listItem = document.createElement('li');
    listItem.innerHTML = 
    "<b>License Plate:</b> <span class='plate'>" + licensePlate + "</span>" + ", <b>Car Make:</b> <span class='make'>" + carMake +  "</span>, <b>Car Model:</b> <span class='model'>" + carModel + "</span>" +
    ", <b>Car Color:</b> <span class='color'>" + carColor + "</span>" +  " <button class='edit'>Edit</button>" +
    " <button class='remove'>Remove</button>";
    carList.appendChild(listItem);

    listItem.querySelector('.edit').addEventListener('click', function () {
      const newLicensePlate = prompt('Enter new license plate:', licensePlate);
      const newCarMake=prompt('Enter new car make:',carMake);
      const newCarModel = prompt('Enter new car model:', carModel);
      const newCarColor=prompt('Enter new car color:', carColor);
      

      listItem.querySelector('.plate').textContent=newLicensePlate;
      listItem.querySelector('.make').textContent=newCarMake;
      listItem.querySelector('.model').textContent=newCarModel;
      listItem.querySelector('.color').textContent=newCarColor;

    });

    listItem.querySelector('.remove').addEventListener('click', function () {
      listItem.remove();
    });
  }
});

  







/* Add debit/credit card */
document.addEventListener('DOMContentLoaded', function () {
  const cardForm = document.getElementById('CardForm');
  const CardList = document.getElementById('CardListt');

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
    listItem.innerHTML = `
      <h4>Your Cards:</h4>
      <b>Debit/Credit Card #: </b>${DebitCreditCard}, <b>Date: </b>${MMYY}, <b>CVV: </b> ${CVV}, <b>Zip Code: </b>${ZipCode}
      <button class="edit">Edit</button>
      <button class="remove">Remove</button>
    `;
    CardList.appendChild(listItem);

    listItem.querySelector('.edit').addEventListener('click', function () {
      const newDCC = prompt('Enter new Debit/Credit Card Number:', DebitCreditCard);
      const newMMYY = prompt('Enter new expiration date:', MMYY);
      const newCVV = prompt('Enter a new CVV number:', CVV);
      const newZipCode = prompt('Enter a new zip code:', ZipCode);
      if (newDCC && newMMYY && newCVV && newZipCode) {
        listItem.innerHTML = `
          <b>Debit/Credit Card: </b>${newDCC}, <b>Date: </b>${newMMYY}, <b>CVV: </b>${newCVV}, <b>Zip Code: </b>${newZipCode}
          <button class="edit">Edit</button>
          <button class="remove">Remove</button>
        `;
      }
    });

    listItem.querySelector('.remove').addEventListener('click', function () {
      listItem.remove();
    });
  }
});

