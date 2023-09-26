// IMPORT
import './css/styles.css';
// - API GET
import { getCustomers, getBookings, getRooms } from "./apiCalls"
// API POST
import { generatePostData, postNewBookedRoom } from "./apiCalls"
// - Functions
import {renderBookingCards, renderBookingsTotal, displayAvailableRooms, displayBookingsView, displayDashboardView, updateAvailableRooms, displayLoginView, handleLogin,  removeHiddenClass} from "./domUpdates" 
import { storeCustomerBookings } from "./booked-rooms"
import { getRoomAvailability } from "./available-rooms"
import { validateUserLogin } from "./login";
// - querySelectors
import { searchDateBtn, selectedDate, dashboardBtn, bookingBtn, roomTypeDropdown, roomTypeSelection, availableRoomsContainer, loginSubmitBtn, usernameInput, passwordInput } from "./domUpdates"
import dayjs from "dayjs"

// GLOBAL VARIABLES 
let currentCustomer
let totalRooms
export let totalBookings


// START FUNCTION
export const fetchAllData = () => { 
  return Promise.all([getCustomers(), getBookings(), getRooms()])
  .then( data =>{
    // console.log(data)
    currentCustomer = data[0].customers
    totalBookings = data[1].bookings
    totalRooms = data[2].rooms
  })
}

// EVENT LISTENERS


const loadDashboard = () => {
  fetchAllData()
  .then( () => {
  })
}

window.addEventListener("load", () => {
  selectedDate.min = dayjs().format('YYYY-MM-DD');
  loadDashboard()
})

loginSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const validatedCustomer = validateUserLogin(username, password, currentCustomer);
    currentCustomer = validatedCustomer
    displayLoginView()
     handleLogin(currentCustomer)
    const customerBookings = storeCustomerBookings(currentCustomer, totalBookings, totalRooms)
    renderBookingCards(customerBookings)
    renderBookingsTotal(customerBookings)
})


bookingBtn.addEventListener("click", () => {
  displayBookingsView() 
})

dashboardBtn.addEventListener("click", () => {
  displayDashboardView()
})

selectedDate.addEventListener("change", () => {
  document.querySelector('#search-btn').disabled = false
})

searchDateBtn.addEventListener("click", () => {
  const searchDate = selectedDate.value.replaceAll("-", "/")
  const selectedRoomType = roomTypeSelection.value = "all"; 
  const availableRooms = getRoomAvailability(totalRooms, totalBookings, searchDate, selectedRoomType)
  displayAvailableRooms(availableRooms)
})

roomTypeSelection.addEventListener("change", () => {
  const selectedRoomType = roomTypeSelection.value;
  const searchDate = selectedDate.value.replaceAll("-", "/");
  updateAvailableRooms(totalRooms, totalBookings, searchDate, selectedRoomType);
});

const handleNewBooking = (event, currentCustomer, allRooms, selectedDate, totalBookings) => {
  if (event.target.classList.contains("book-now")) {
    const roomNumber = parseInt(event.target.parentElement.id);
    const bookingDate = selectedDate.value.replaceAll("-", "/");
    const userID = currentCustomer.id;
    console.log("USER ID", userID)
    const dataToPost = generatePostData(userID, bookingDate, roomNumber);

    // make POST request
    postNewBookedRoom(dataToPost)
      .then(() => {
        // fetch updated data to refresh available rooms
        getBookings()
          .then((bookings) => {
            totalBookings = bookings.bookings;
            // console.log("TOTAL BOOKINGS AFTER POST", totalBookings)
            // removeBookingFromAvailable(roomNumber);

            // update available rooms with the latest data
            const searchDate = selectedDate.value.replaceAll("-", "/");
            console.log("search after post:", searchDate)
            updateAvailableRooms(totalRooms, totalBookings, searchDate, roomTypeSelection.value);
          })
          .catch((error) => console.log(error));
      });
  }
};

// iterate through totalBookings, use find, find ID of room.
// pass found room.
// invoke displayAvailableRooms which would display 

// OR: new message: your room was booked, timeout message. 
// message above 
// set time out.

// disable book now button and search button until the dates have been selected
// default is disabled. when date selected querySelected button.prop("disabled", false) to set disable to false 


availableRoomsContainer.addEventListener("click", (event) => {
  const inputDate = document.querySelector("#selected-date-input");
  handleNewBooking(event, currentCustomer, totalRooms, inputDate, totalBookings);
});

