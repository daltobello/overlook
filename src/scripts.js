// IMPORT
import './css/styles.css';
// - API GET
import { getCustomers, getBookings, getRooms } from "./apiCalls"
// API POST
import { generatePostData, postNewBookedRoom } from "./apiCalls"
// - Functions
import {renderBookingCards, renderBookingsTotal, displayAvailableRooms, displayBookingsView, displayDashboardView, addHiddenClass, removeHiddenClass} from "./domUpdates" 
import { storeCustomerBookings } from "./booked-rooms"
import { getRoomAvailability } from "./available-rooms"
import { filterByRoomType, findRoom } from "./filter-rooms"
// - querySelectors
import { searchDateBtn, selectedDate, dashboardBtn, bookingBtn, roomTypeDropdown, roomTypeSelection, availableRoomsContainer } from "./domUpdates"
import dayjs from "dayjs"

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
  displayDashboardView()
})

searchDateBtn.addEventListener("click", () => {
  const searchDate = selectedDate.value.replaceAll("-", "/")
  const availableRooms = getRoomAvailability(totalRooms, totalBookings, searchDate)
  displayAvailableRooms(availableRooms)
})

roomTypeSelection.addEventListener("change", () => {
  const selectedRoomType = roomTypeSelection.value
  if (selectedRoomType === "all") {
    const searchDate = selectedDate.value.replaceAll("-", "/")
    const availableRooms = getRoomAvailability(totalRooms, totalBookings, searchDate)
    displayAvailableRooms(availableRooms)
  } else {
    const filteredRooms = filterByRoomType(totalRooms, selectedRoomType)
    displayAvailableRooms(filteredRooms)
  }
})


const handleNewBooking = (event, currentCustomer, allRooms, selectedDate, totalBookings) => {
  if (event.target.classList.contains("book-now")) {
    const roomNumber = parseInt(event.target.parentElement.id);
    const bookingDate = selectedDate.value.replaceAll("-", "/");
    const userID = currentCustomer.id;
    const dataToPost = generatePostData(userID, bookingDate, roomNumber);
    // make POST request
    postNewBookedRoom(dataToPost)
      .then(() => {
        // fetch updated data to refresh available rooms
        getBookings()
          .then((bookings) => {
            totalBookings = bookings.bookings;
            // outside of .then, use global variables to update
            const searchDate = selectedDate.value;
            console.log({searchDate})
            const availRooms = getRoomAvailability(allRooms, totalBookings, searchDate);
            displayAvailableRooms(availRooms);
          })
          .catch((error) => console.log(error));
      });
  }
};

availableRoomsContainer.addEventListener("click", (event) => {
  const inputDate = document.querySelector("#selected-date-input");
  handleNewBooking(event, currentCustomer[1], totalRooms, inputDate, totalBookings);
});