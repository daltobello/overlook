// IMPORT
import './css/styles.css';
// - API calls
import { getCustomers, getBookings, getRooms } from "./apiCalls"
// - Functions
import {renderBookingCards, renderBookingsTotal, displayAvailableRooms, displayBookingsView, displayDashboardView, } from "./domUpdates" 
import { storeCustomerBookings } from "./booked-rooms"
import { getRoomAvailability } from "./available-rooms"
import { filterByRoomType } from "./filter-rooms"
// - querySelectors
import { searchDateBtn, selectedDate, dashboardBtn, bookingBtn, roomTypeDropdown, roomTypeSelection } from "./domUpdates"

// declare global variables that will store the actual data and be passed into functions that update the DOM.
// GLOBAL VARIABLES 
let currentCustomer
let totalBookings
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
    // selectedDate[0].min = dayjs().format('YYYY-MM-DD');
  })
}
window.addEventListener("load", loadDashboard)


bookingBtn.addEventListener("click", () => {
  displayBookingsView() 
})

dashboardBtn.addEventListener("click", () => {
  loadDashboard() // FIX: don't want to load the data again, just want to change view
  displayDashboardView()
})

searchDateBtn.addEventListener("click", () => {
  const searchDate = selectedDate.value.replaceAll("-", "/")
  const availableRooms = getRoomAvailability(totalRooms, totalBookings, searchDate)
  displayAvailableRooms(availableRooms)
})

roomTypeSelection.addEventListener("change", () => {
  const selectedRoomType = roomTypeSelection.value
  console.log({selectedRoomType})
  const filteredRooms = filterByRoomType(totalRooms, selectedRoomType)
  displayAvailableRooms(filteredRooms)
})


// clicking on bookings should change the view from dashboard to the bookings view


