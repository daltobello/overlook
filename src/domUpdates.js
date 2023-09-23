// import datepicker from 'js-datepicker'
// const picker = datepicker(selector, options)

import { validateUserLogin } from "./login"
import { getAllData } from "./scripts"

// loadDashboard function 
// - use params: current customer, bookings, and rooms
// if login successful, call a function that updates the user's bookings 

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

  // addHiddenClass([]);
//   removeHiddenClass([])

const handleLogin = () => {
  validateUserLogin(username, password, customerData)
  getAllData()
}











// cont addBooking = (currentCustomer) => {
//   // sequence of what happens when button is clicked
//   // avail rooms sitting on DOM, when you hit 
//   const currentCustomerBookings = getCustomerBookings()
//   const availRooms = getRoomAvailability()
//   currentCustomerBookings.push(availRooms)
//   // push into customer booking to add bookings
// }