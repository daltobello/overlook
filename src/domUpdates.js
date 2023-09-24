// import datepicker from 'js-datepicker'
// const picker = datepicker(selector, options)
import { validateUserLogin } from "./login"
import { calculateTotalRoomCost } from "./booked-rooms"
import { getAllData, currentCustomer, totalBookings, totalRooms } from "./scripts"


// QUERY SELECTORS
const customerLoginForm = document.querySelector("form")
const currentBookingContainer = document.querySelector(".current-bookings-container")
const availableRoomsContainer = document.querySelector(".available-rooms-container")
const bookingsTotal = document.querySelector(".total-spent")
export const bookingBtn = document.querySelector("#new-booking")
export const dashboardBtn = document.querySelector("#dashboard-btn")
const searchDate = document.querySelector("#search-dates")
const dashboardView = document.querySelector("#dashboard-view")
const newBookingView = document.querySelector("#new-bookings-view")

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
  searchDate.value = ""
}

export const displayDashboardView = () => {
  removeHiddenClass([dashboardView])
  addHiddenClass([newBookingView]);
}

export const displayAvailableRooms = (availableRooms) => {
  availableRoomsContainer.innerHTML = ""

}

// instead of rendering booking cards via innerHTML multiple times. 




// const renderSelectTagOptions = tagData => {
//   tagData.forEach(tag => {
//     dropDownMenu.innerHTML += `
//         <option value="${tag}">${tag}</option>
//         `;
//   });
// };


// const renderRecipeCardsByTag = (recipeList, tag) => {
//   const recipeByTagList = filterByTag(currentRecipeList, tag);
//   recipeContainer.innerHTML = '';
//   let defaultTag = '';
//   if (tag === 'all') {
//     renderRecipeCards(recipeList);
//   } else {
//     renderRecipeCards(recipeByTagList);
//     currentRecipeList = recipeByTagList;
//   }
// };