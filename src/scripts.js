// IMPORT
import './css/styles.css';
// - API GET
import { getCustomers, getBookings, getRooms } from "./apiCalls"
// API POST
import { generatePostData, postNewBookedRoom } from "./apiCalls"
// - Functions
import {renderBookingCards, renderBookingsTotal, displayAvailableRooms, displayBookingsView, displayDashboardView, handleNewBooking} from "./domUpdates" 
import { storeCustomerBookings } from "./booked-rooms"
import { getRoomAvailability } from "./available-rooms"
import { filterByRoomType, findRoom } from "./filter-rooms"
// - querySelectors
import { searchDateBtn, selectedDate, dashboardBtn, bookingBtn, roomTypeDropdown, roomTypeSelection, availableRoomsContainer } from "./domUpdates"
import dayjs from "dayjs"


// declare global variables that will store the actual data and be passed into functions that update the DOM.
// GLOBAL VARIABLES 
let currentCustomer
export let totalBookings
let totalRooms



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
window.addEventListener("load", () => {
  selectedDate.min = dayjs().format('YYYY-MM-DD');
  loadDashboard()
})


bookingBtn.addEventListener("click", () => {
  displayBookingsView() 
})

dashboardBtn.addEventListener("click", () => {
  loadDashboard() // FIX: don't want to load the data again, just want to change view
  displayDashboardView()
})

searchDateBtn.addEventListener("click", () => {
  const searchDate = selectedDate.value.replaceAll("-", "/")
  // console.log({searchDate})
  const availableRooms = getRoomAvailability(totalRooms, totalBookings, searchDate)
  displayAvailableRooms(availableRooms)
})

roomTypeSelection.addEventListener("change", () => {
  const selectedRoomType = roomTypeSelection.value
  if (selectedRoomType === "all") {
    // const searchDate = selectedDate.value.replaceAll("-", "/")
    // console.log({searchDate})
    // const availableRooms = getRoomAvailability(totalRooms, totalBookings, searchDate)
    // displayAvailableRooms(availableRooms)
  } else {
    const filteredRooms = filterByRoomType(totalRooms, selectedRoomType)
    displayAvailableRooms(filteredRooms)
  }
})

availableRoomsContainer.addEventListener("click", (event) => {
  const inputDate = document.querySelector("#selected-date-input"); 
  const availableRooms = getRoomAvailability(totalRooms, totalBookings, inputDate)
  displayAvailableRooms(availableRooms)
  handleNewBooking(event, currentCustomer[1], totalRooms, inputDate)
})



// clicking on bookings should change the view from dashboard to the bookings view

