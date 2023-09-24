// IMPORT
import './css/styles.css';
import { getCustomers, getBookings, getRooms } from "./apiCalls" // Import GET functions from apiCalls.js
import {renderBookingCards, renderBookingsTotal, displayAvailableRooms, displayBookingsView, displayDashboardView, searchDate, dashboardBtn, bookingBtn } from "./domUpdates" // Import DOM functions that require the actual data when they are called inside of event listeners 
// i.e. load dashboard, render filter results, and book functions 
import { storeCustomerBookings } from "./booked-rooms"
import { getRoomAvailability } from "./available-rooms"



// GLOBAL VARIABLES 
export let currentCustomer
export let totalBookings
export let totalRooms
// declare global variables that will store the actual data and be passed into functions that update the DOM.


// START FUNCTION
export const fetchAllData = () => { 
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
  fetchAllData()
  .then( () => {
    const customerBookings = storeCustomerBookings(currentCustomer[1], totalBookings, totalRooms)
    renderBookingCards(customerBookings)
    renderBookingsTotal(customerBookings)
  })
}
window.addEventListener("load", loadDashboard)


bookingBtn.addEventListener("click", () => {
  displayBookingsView()
})

dashboardBtn.addEventListener("click", () => {
  console.log("Heeeey")
  loadDashboard()
  displayDashboardView()
})


//   const availableRooms = getRoomAvailability(totalRooms, totalBookings, searchDate.value)
//   displayAvailableRooms(availableRooms)

// clicking on bookings should change the view from dashboard to the bookings view

// different event listener for searching a date and 

// searchDateInput[0].min = dayjs().format('YYYY-MM-DD');

