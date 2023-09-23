// IMPORT
import './css/styles.css';
import { getCustomers, getBookings, getRooms } from "./apiCalls" // Import GET functions from apiCalls.js
import {displayBookingCards, displayBookingsTotal } from "./domUpdates" // Import DOM functions that require the actual data when they are called inside of event listeners 
// i.e. load dashboard, render filter results, and book functions 
import { storeCustomerBookings } from "./existing-bookings"



// GLOBAL VARIABLES 
export let currentCustomer
export let totalBookings
export let totalRooms
// declare global variables that will store the actual data and be passed into functions that update the DOM.


// START FUNCTION
export const getAllData = () => { // call getAllData inside a function that runs when a user logs in...?
  return Promise.all([getCustomers(), getBookings(), getRooms()])
  .then( data =>{
    console.log(data)
    currentCustomer = data[0].customers
    totalBookings = data[1].bookings
    totalRooms = data[2].rooms
  })
}

// EVENT LISTENERS
const loadDashboard = () => {
  getAllData().then( () => {
    const customerBookings = storeCustomerBookings(currentCustomer[1], totalBookings, totalRooms)
    displayBookingCards(customerBookings)
    displayBookingsTotal(customerBookings)
  })
}

window.addEventListener("load", loadDashboard)

// const totalRoomCosts = calculateTotalRoomCost(customerBookings)
