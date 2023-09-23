// import datepicker from 'js-datepicker'
// const picker = datepicker(selector, options)

import { validateUserLogin } from "./login"

import { getAllData, currentCustomer, totalBookings, totalRooms } from "./scripts"

// loadDashboard function 
// - use params: current customer, bookings, and rooms
// if login successful, call a function that updates the user's bookings 

const customerLoginForm = document.querySelector("form")
const currentBookingContainer = document.querySelector(".current-bookings-container")

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

  export const displayBookingCards = (customerBookings) => {
    // currentBookingContainer.innerHTML = " "
    customerBookings.forEach((booking) => {
      console.log(booking.room)
      currentBookingContainer.innerHTML += `
      <article class="room-card">
              <ul class="room-card-container">
                <li class="booking-info" id="1">Room Number: ${booking.room.number}</li>
                <li class="booking-info">Cost: $${booking.room.costPerNight}</li>
                <li class="booking-info">Room Type: ${booking.room.roomType}</li>
                <li class="booking-info">Beds: ${booking.room.bedSize}</li>
                </ul>
            </article>
      `
    })
    console.log(customerBookings)
  }




      // 1. Get query selector for the container where I want to add the booking cards
// 2. Get the data for the booking cards
// 3. Populate the html with the booking data:
// — For each booking, create a booking card




  // addHiddenClass([]);
//   removeHiddenClass([])

// const handleLogin = () => {
//   validateUserLogin(username, password, customerData)
//   getAllData()
// }







// bookingContainer.innerHTML += `
// <section class="room-card">
//           <div class="room-card-container">
//             <p class="booking-info" id="1">Room Number:1</p>
//             <p class="booking-info">Cost: $350</p>
//             <p class="booking-info">Room Type: Suite</p>
//             <p class="booking-info">Beds: 1 King Size Bed</p>
//           </div>
//         </section>
// `




// cont addBooking = (currentCustomer) => {
//   // sequence of what happens when button is clicked
//   // avail rooms sitting on DOM, when you hit 
//   const currentCustomerBookings = getCustomerBookings()
//   const availRooms = getRoomAvailability()
//   currentCustomerBookings.push(availRooms)
//   // push into customer booking to add bookings
// }