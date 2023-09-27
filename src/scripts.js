// IMPORT
import './css/styles.css';
// - API GET
import { getCustomers, getBookings, getRooms } from "./apiCalls"
// API POST
import { generatePostData, postNewBookedRoom } from "./apiCalls"
// - Functions
import {renderBookingCards, renderBookingsTotal, displayAvailableRooms, displayBookingsView, displayDashboardView, updateAvailableRooms, displayLoginView, handleLogin,  removeHiddenClass, addHiddenClass} from "./domUpdates" 
import { storeCustomerBookings } from "./booked-rooms"
import { getRoomAvailability } from "./available-rooms"
import { validateUserLogin } from "./login";
// - querySelectors
import { searchDateBtn, selectedDate, dashboardBtn, bookingBtn, roomTypeDropdown, roomTypeSelection, availableRoomsContainer, loginSubmitBtn, usernameInput, passwordInput, errorMessage} from "./domUpdates"
import dayjs from "dayjs"

// GLOBAL VARIABLES 
let currentCustomer
let totalRooms
export let totalBookings


// START FUNCTION
export const fetchAllData = () => { 
  return Promise.all([getCustomers(), getBookings(), getRooms()])
  .then( data =>{
    currentCustomer = data[0].customers // could have allCustomers
    totalBookings = data[1].bookings
    totalRooms = data[2].rooms
  })
}

// EVENT LISTENERS
const loadLogin = () => {
  fetchAllData()

  .then( () => {
  const username = usernameInput.value;
  const password = passwordInput.value;
  const validatedCustomer = validateUserLogin(username, password, currentCustomer)
  if (validatedCustomer !== "Incorrect login credentials.") {
    addHiddenClass([errorMessage]);
    currentCustomer = validatedCustomer
    const customerBookings = storeCustomerBookings(currentCustomer, totalBookings, totalRooms)
    renderBookingCards(customerBookings)
    renderBookingsTotal(customerBookings)
    selectedDate.min = dayjs().format('YYYY-MM-DD');
    displayLoginView()
    handleLogin(currentCustomer)
  } else {
    removeHiddenClass([errorMessage]);
  return
  }
})
}

    // call DOM updates function that displays invalid login
    // or display hidden with p tag.

// login then FETCH.
// login occurs. validated, fetch all data, assign it based on the login ID
// fetch data, then currentCustomer would get assigned based on login ID


loginSubmitBtn.addEventListener("click", (event) => {
  loadLogin()
  event.preventDefault()
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

const handleNewBooking = (event, currentCustomer, allRooms, selectedDate) => {
  if (event.target.classList.contains("book-now")) {
    const roomNumber = parseInt(event.target.parentElement.id);
    const bookingDate = selectedDate.value.replaceAll("-", "/");
    const userID = currentCustomer.id;
    const dataToPost = generatePostData(userID, bookingDate, roomNumber);
    postNewBookedRoom(dataToPost)
      .then(() => {
        return getBookings();
      })
      .then((bookings) => {
        totalBookings = bookings.bookings;
        const updatedCustomerBookings = storeCustomerBookings(currentCustomer, totalBookings, allRooms);
        renderBookingsTotal(updatedCustomerBookings);
        const searchDate = selectedDate.value.replaceAll("-", "/");
        updateAvailableRooms(totalRooms, totalBookings, searchDate, roomTypeSelection.value);
      })
      .catch((error) => console.log(error));
  }
};

availableRoomsContainer.addEventListener("click", (event) => {
  const inputDate = document.querySelector("#selected-date-input");
  handleNewBooking(event, currentCustomer, totalRooms, inputDate, totalBookings);
});

