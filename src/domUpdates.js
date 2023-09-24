// import datepicker from 'js-datepicker'
// const picker = datepicker(selector, options)
// import { totalBookings, totalRooms } from "./scripts"
// import { getAllData, currentCustomer, totalBookings, totalRooms } from "./scripts"
import { validateUserLogin } from "./login"
import { calculateTotalRoomCost } from "./booked-rooms"


// QUERY SELECTORS
const customerLoginForm = document.querySelector("form")
const currentBookingContainer = document.querySelector(".current-bookings-container")
const availableRoomsContainer = document.querySelector(".available-rooms-container")
const bookingsTotal = document.querySelector(".total-spent")
export const bookingBtn = document.querySelector("#new-booking")
export const dashboardBtn = document.querySelector("#dashboard-btn")
export const searchDateBtn = document.querySelector("#search-btn")
export const selectedDate = document.querySelector("#selected-date-input")
const dashboardView = document.querySelector("#dashboard-view")
const newBookingView = document.querySelector("#new-bookings-view")
export const roomTypeDropdown = document.querySelector("#room-type-dropdown")
export const roomTypeSelection = document.querySelector("#room-type")


  //Helper Functions👇
  const removeHiddenClass = (elements) => {
    elements.forEach(element => {
      element.classList.remove('hidden');
    });
    return elements;
  };

  const addHiddenClass = (elements) => {
    elements.forEach(element => {
      element.classList.add('hidden');
    });
    return elements;
  };

  // DOM Functions

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

export const displayAvailableRooms = (availableRooms) => {
  availableRoomsContainer.innerHTML = ""
  selectedDate.value = ""
  availableRooms.forEach((room) => {
    availableRoomsContainer.innerHTML += `
    <article class="room-card" id="${room.number}>
            <ul class="room-card-container">
              <li class="booking-info">Room Number: ${room.number}</li>
              <li class="booking-info">Cost: $${room.costPerNight.toFixed(2)}</li>
              <li class="booking-info">Room Type: ${room.roomType}</li>
              <li class="booking-info">Beds: ${room.bedSize}</li>
              </ul>
              <button id="book-now-btn">Book Now</button>
          </article>
    `
  })
}

// after i query select my input with a type=“date” attribute, i need to assign its “min” attribute to dayjs().format('YYYY-MM-DD’). i’m unclear on where to do this though. inside of a DOM function that will fire when my booking view is visible or is there a better place to do this? 
//  next step is to invoke my function that returns only available rooms with the using the query selected input.value. does that sound right to you?

