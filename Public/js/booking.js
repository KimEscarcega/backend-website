const database = require("../routes/db-config");
const express = require('express');
const router = express.Router(); 






function selected(spot) {
  document.getElementById("spot").value = spot;
  document.getElementById("parkinglot").submit();


}


/* for confirm.html */

function calculateParkingPrice(start, end) {
  const startMinutes = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
  const endMinutes = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);
  const duration = endMinutes - startMinutes;
  
  // adjust price per minutes here (ex. every minute = 5 cents)
  const pricePerMinute = 0.05;
  
  const totalPrice = duration * pricePerMinute;
  return totalPrice.toFixed(2); 
}

function finalPrice() {
  const params = new URLSearchParams(window.location.search);
  const startTime = params.get('startTime');
  const endTime = params.get('endTime');

  const price = calculateParkingPrice(startTime, endTime);
  const priceSpan = document.getElementById('price');

  if (priceSpan) {
      priceSpan.innerText = `$${price}`;
  }
}

window.onload = finalPrice;


function formatTime(times) {
  const time = new Date(`1970-01-01T${times}`);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const amPM = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  const formattedMinute = minute < 10 ? `0${minute}` : minute;
  return `${formattedHour}:${formattedMinute} ${amPM}`;}

  


  



    const params = new URLSearchParams(window.location.search);
    document.getElementById('date').innerText = (params.get('date'));
    document.getElementById('startTime').innerText = formatTime(params.get('startTime'));
    document.getElementById('endTime').innerText = formatTime(params.get('endTime'));
  
    const spot = params.get('spot');
    document.getElementById('spot').innerText = spot;
  
    function cancelRes(){
    window.location.href ='booking.html';
  }
  
   function confirmRes() {
     window.location.href = `confirmation.html?date=${params.get('date')}&startTime=${params.get('startTime')}&endTime=${params.get('endTime')}&spot=${spot}`;
   }



   


/* for confirmation */

         document.getElementById('date').innerText = formatDate(params.get('date'));
        document.getElementById('startTime').innerText = formatTime(params.get('startTime'));
        document.getElementById('endTime').innerText = formatTime(params.get('endTime'));
        document.getElementById('spot').innerText = params.get('spot');       




  