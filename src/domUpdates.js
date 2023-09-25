// import datepicker from 'js-datepicker'
// const picker = datepicker(selector, options)

import { validateUserLogin } from "./login"
import { generatePostData, postNewBookedRoom, getBookings } from "./apiCalls"
import { totalBookings } from "./scripts"
import { fetchAllData } from "./scripts"
import { getRoomAvailability } from "./available-rooms"
import { calculateTotalRoomCost } from "./booked-rooms"
// QUERY SELECTORS
const customerLoginForm = document.querySelector("form")
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

export const displayAvailableRooms = (availableRooms) => {
  availableRoomsContainer.innerHTML = ""
  // selectedDate.value = ""
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


export const handleNewBooking = (event, currentCustomer, allRooms, selectedDate) => {
  if (event.target.classList.contains("book-now")) {
    const roomNumber = parseInt(event.target.parentElement.id);
    const bookingDate = selectedDate.value.replaceAll("-", "/")
    const userID = currentCustomer.id;
    const dataToPost = generatePostData(userID, bookingDate, roomNumber);
    // make POST request
    postNewBookedRoom(dataToPost)
      .then(() => { 
          // fetch updated data to refresh available rooms
          getBookings()
          .then((bookings) => {
          console.log({bookings})
            totalBookings = bookings.bookings
          });
          // outside of .then use global variables to update 
          const searchDate = selectedDate.value
          const availRooms = getRoomAvailability(allRooms, totalBookings, searchDate);
          displayAvailableRooms(availRooms);
      })
      .catch((error) => console.log(error));
  }
}















// export const renderNewReservations = (event, bookedRooms) => {
//   currentBookingContainer.innerHTML = " "
//   bookedRooms.forEach((booking) => {
//       currentBookingContainer.innerHTML += `
//       <article class="room-card" id="${booking.room.number}>
//               <ul class="room-card-container">
//                 <li class="booking-info">Room Number: ${booking.room.number}</li>
//                 <li class="booking-info">Cost: $${booking.room.costPerNight.toFixed(2)}</li>
//                 <li class="booking-info">Room Type: ${booking.room.roomType}</li>
//                 <li class="booking-info">Beds: ${booking.room.bedSize}</li>
//                 </ul>
//             </article>
//       `
//     })
// }

// event.target.parentElement to get one layer back to get 
// classList.contains/includes
// 

// stringify function in POST, call addPostBooking function in event listener 

// add booking (implement POST and fetch again in same function )
// event.target get ID, this give you room number. can be assigned to variable
// booked room date assign to variable
// user
// with this data stored in variables, create and object that we can pass through into the POST.
// post successfully, re-fetch, finding the card that was just posted by the ID. and display this card on the DOM.

// inside event listener
// but outside of POST function, potentially call another function that gets the ID of the posted card and displays it.

// use event delegation:
// query select container
// if event.target.className === 

// const handleNoAvailability = (availableRooms) => {
//   console.log(availableRooms)
//   // if (availableRooms.length > 0) {
//   //   bookingMessage.innerText = 
//   // }
// }




// after i query select my input with a type=“date” attribute, i need to assign its “min” attribute to dayjs().format('YYYY-MM-DD’). i’m unclear on where to do this though. inside of a DOM function that will fire when my booking view is visible or is there a better place to do this? 
//  next step is to invoke my function that returns only available rooms with the using the query selected input.value. does that sound right to you?

