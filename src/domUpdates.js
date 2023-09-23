// import datepicker from 'js-datepicker'
// const picker = datepicker(selector, options)
import { validateUserLogin } from "./login"
import { calculateTotalRoomCost } from "./existing-bookings"
import { getAllData, currentCustomer, totalBookings, totalRooms } from "./scripts"


// QUERY SELECTORS
const customerLoginForm = document.querySelector("form")
const currentBookingContainer = document.querySelector(".current-bookings-container")
const bookingsTotal = document.querySelector(".total-spent")

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
  export const displayBookingCards = (customerBookings) => {
      addHiddenClass([]);
    currentBookingContainer.innerHTML = " "
    customerBookings.forEach((booking) => {
      console.log(booking.room)
      currentBookingContainer.innerHTML += `
      <article class="room-card" id="${booking.room.number}>
              <ul class="room-card-container">
                <li class="booking-info">Room Number: ${booking.room.number}</li>
                <li class="booking-info">Cost: $${booking.room.costPerNight.toFixed(2)}</li>
                <li class="booking-info">Room Type: ${booking.room.roomType}</li>
                <li class="booking-info">Beds: ${booking.room.bedSize}</li>
                </ul>
                <button class="book-now">Book Now</button>
            </article>
      `
    })
  }

  export const displayBookingsTotal = (customerBookings) => {
    bookingsTotal.innerHTML = `Total Spent: $${calculateTotalRoomCost(customerBookings).toFixed(2)}`;
  }






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