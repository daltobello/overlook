export const getRoomAvailability = (roomsData, bookingsData, searchDate) => {
  // const formattedSearchDate = searchDate.split("/").join("-")
  // console.log({formattedSearchDate})
  const bookingsOnSearchDate = bookingsData.filter((booking) => { // bookingsOnSearchDate array only contains bookings with the searchDate
    return booking.date === searchDate
  })
  const availableRooms = roomsData.filter((room) => { 
    const isRoomBooked = bookingsOnSearchDate.some((booking) => { 
     return  booking.roomNumber === room.number 
    })
    return isRoomBooked 
  })
  return availableRooms 
}


      // check if at least one booking on the searchDate matches the room number
      // - if at least one room booking matches the searchDate, isRoomBooked will be true (meaning that room is NOT available) 
      // - isRoomBooked returns false if room available on the searchDate

// slice() out first 8 chars, check if valid 
// slice out 2 char, for id. 1- 50 valid
// password: 

// send through object 



// cont addBooking = (currentCustomer) => {
//   // sequence of what happens when button is clicked
//   // avail rooms sitting on DOM, when you hit 
//   const currentCustomerBookings = getCustomerBookings()
//   const availRooms = getRoomAvailability()
//   currentCustomerBookings.push(availRooms)
//   // push into customer booking to add bookings
// }

