import { validateUserLogin } from "./login"

import { getRoomAvailability } from "./available-rooms"
import { calculateTotalRoomCost } from "./booked-rooms"
// import { filterByRoomType } from "./filter-rooms"
// QUERY SELECTORS
const loginView = document.querySelector("#login-view")
const customerLoginForm = document.querySelector("form")
const usernameInput = document.querySelector("#username-input")
const passwordInput = document.querySelector("#password-input")
export const loginSubmitBtn = document.querySelector("#login-submit-btn")
const usernameDisplay = document.querySelector("#username-display")

const currentBookingContainer = document.querySelector(".current-bookings-container")
export const availableRoomsContainer = document.querySelector(".available-rooms-container")
const bookingsTotal = document.querySelector(".total-spent")
export const bookingBtn = document.querySelector("#new-booking")
export const dashboardBtn = document.querySelector("#dashboard-btn")
export const searchDateBtn = document.querySelector("#search-btn")
export const selectedDate = document.querySelector("#selected-date-input")
const dashboardView = document.querySelector("#dashboard-view")
const newBookingView = document.querySelector("#new-bookings-view")
export const roomTypeDropdown = document.querySelector("#room-type-dropdown")
export const roomTypeSelection = document.querySelector("#room-type")
// export const bookingMessage = document.querySelector("#booking-message")


  //Helper Functions👇
  export const removeHiddenClass = (elements) => {
    elements.forEach(element => {
      element.classList.remove('hidden');
    });
    return elements;
  };

  export const addHiddenClass = (elements) => {
    elements.forEach(element => {
      element.classList.add('hidden');
    });
    return elements;
  };


// DASHBOARD
  export const renderBookingCards = (customerBookings) => {
      addHiddenClass([]);
    currentBookingContainer.innerHTML = " "
    customerBookings.forEach((booking) => {
      currentBookingContainer.innerHTML += `
      <article class="room-card" id="${booking.room.number}>
              <ul class="room-card-container">
                <li class="booking-info">Room Number: ${booking.room.number}</li>
                <li class="booking-info">Cost: $${booking.room.costPerNight.toFixed(2)}</li>
                <li class="booking-info">Room Type: ${booking.room.roomType}</li>
                <li class="booking-info">Beds: ${booking.room.bedSize}</li>
                <li class="booking-info">Date: ${booking.date}</li>
                </ul>
            </article>
      `
    })
  }

  export const renderBookingsTotal = (customerBookings) => {
    bookingsTotal.innerHTML = `Total Spent: $${calculateTotalRoomCost(customerBookings).toFixed(2)}`;
  }

// AVAILABLE BOOKINGS

export const displayBookingsView = () => {
  addHiddenClass([dashboardView]);
  removeHiddenClass([newBookingView])
}

export const displayDashboardView = () => {
  removeHiddenClass([dashboardView])
  addHiddenClass([newBookingView]);
}

export const displayLoginView = () => {
  removeHiddenClass([dashboardView]);
  addHiddenClass([loginView, newBookingView]);

}

export const displayAvailableRooms = (availableRooms) => {
  console.log({availableRooms})
  availableRoomsContainer.innerHTML = ""
  availableRooms.forEach((room) => {
    availableRoomsContainer.innerHTML += `
    <article class="room-card" id="${room.number}">
            <ul class="room-card-container">
              <li class="booking-info">Room Number: ${room.number}</li>
              <li class="booking-info">Cost: $${room.costPerNight.toFixed(2)}</li>
              <li class="booking-info">Room Type: ${room.roomType}</li>
              <li class="booking-info">Beds: ${room.bedSize}</li>
              </ul>
              <button id="book-now-btn" class="book-now">Book Now</button>
          </article>
    `
  })
}

export const updateAvailableRooms = (roomsData, bookingsData, searchDate, selectedRoomType) => {
  const availableRooms = getRoomAvailability(roomsData, bookingsData, searchDate, selectedRoomType);
  displayAvailableRooms(availableRooms)
};


export const handleLogin = (currentCustomer) => {
const username = usernameInput.value
const password = passwordInput.value 
const validatedCustomer = validateUserLogin(username, password, currentCustomer)
usernameDisplay.innerText = validatedCustomer.name
}















