// IMPORT
import './css/styles.css';
import { getCustomers, getBookings, getRooms } from "./apiCalls" // Import GET functions from apiCalls.js
import {} from "./domUpdates" // Import DOM functions that require the actual data when they are called inside of event listeners 
// i.e. load dashboard, render filter results, and book functions 


// QUERY SELECTORS
// add all query selectors here. EXPORT them, then IMPORT in domUpdates 
const customerLoginForm = document.querySelector("form")

// GLOBAL VARIABLES 
let currentCustomer
let totalBookings
let totalRooms
// declare global variables that will store the actual data and be passed into functions that update the DOM.


// START FUNCTION
const getAllData = () => { // call getAllData inside a function that runs when a user logs in...?
  Promise.all([getCustomers(), getBookings(), getRooms()])
  .then( data =>{
    console.log(data)
    currentCustomer = data[0].customers
    totalBookings = data[1].bookings
    totalRooms = data[2].rooms
  })
}


// EVENT LISTENERS

customerLoginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  validateUserLogin()
});
