import { getRoomAvailability } from "./available-rooms";
import { calculateTotalRoomCost } from "./booked-rooms";

// QUERY SELECTORS
export const usernameInput = document.querySelector("#username-input");
export const passwordInput = document.querySelector("#password-input");
export const loginSubmitBtn = document.querySelector("#login-submit-btn");
const loginView = document.querySelector("#login-view");
const usernameDisplay = document.querySelector("#username-display");
const currentBookingContainer = document.querySelector(".current-bookings-container");
export const availableRoomsContainer = document.querySelector(".available-rooms-container");
const bookingsTotal = document.querySelector(".total-spent");
export const bookingBtn = document.querySelector("#new-booking");
export const dashboardBtn = document.querySelector("#dashboard-btn");
export const searchDateBtn = document.querySelector("#search-btn");
export const selectedDate = document.querySelector("#selected-date-input");
const dashboardView = document.querySelector("#dashboard-view");
const newBookingView = document.querySelector("#new-bookings-view");
export const roomTypeDropdown = document.querySelector("#room-type-dropdown");
export const roomTypeSelection = document.querySelector("#room-type");
export const bookingErrorMessage = document.querySelector("#booking-message")
export const errorMessage = document.querySelector(".error-message")

//HELPER FUNCTIONS👇
export const removeHiddenClass = (elements) => {
  elements.forEach((element) => {
    element.classList.remove("hidden");
  });
  return elements;
};

export const addHiddenClass = (elements) => {
  elements.forEach((element) => {
    element.classList.add("hidden");
  });
  return elements;
};

// CHANGE VIEWS
export const displayLoginView = () => {
  removeHiddenClass([dashboardView, bookingBtn, dashboardBtn]);
  addHiddenClass([loginView, newBookingView]);
};

export const displayDashboardView = () => {
  removeHiddenClass([dashboardView]);
  addHiddenClass([newBookingView]);
};

export const displayBookingsView = () => {
  addHiddenClass([dashboardView]);
  removeHiddenClass([newBookingView]);
};

// LOGIN
export const handleLogin = (validatedCustomer) => {
  usernameDisplay.innerText = validatedCustomer.name;
};

// DASHBOARD
export const renderBookingCards = (customerBookings) => {
  currentBookingContainer.innerHTML = " ";
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
      `;
  });
};

export const renderBookingsTotal = (customerBookings) => {
  console.log("Bookings coming into renderBookingsTotal", customerBookings)
  bookingsTotal.innerHTML = `Total Spent: $${calculateTotalRoomCost(customerBookings).toFixed(2)}`;
};

// AVAILABLE BOOKINGS
export const displayAvailableRooms = (availableRooms) => {
  if (availableRooms.length === 0) {
    availableRoomsContainer.innerHTML = "";
    displayErrorMessage("We're sorry, there are no rooms available for the selected criteria.")
  } else {
    bookingErrorMessage.innerText = ""
    availableRoomsContainer.innerHTML = "";
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
      `;
    });
  }
}

export const updateAvailableRooms = (roomsData, bookingsData, searchDate, selectedRoomType) => {
  const availableRooms = getRoomAvailability(roomsData, bookingsData, searchDate, selectedRoomType);
  displayAvailableRooms(availableRooms);
  
};

export const displayErrorMessage = (message) => {
  bookingErrorMessage.innerText = message 
}