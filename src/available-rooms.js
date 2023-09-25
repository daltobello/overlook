import { filterByRoomType } from "./filter-rooms"

export const getRoomAvailability = (roomsData, bookingsData, searchDate, roomType) => {

  console.log("ROOMS DATA:", roomsData)
  console.log("BOOKINGS DATA:", bookingsData)
  console.log("SEARCH:", searchDate)
  const bookingsOnSearchDate = bookingsData.filter((booking) => {

    
    return booking.date === searchDate
  })
  const availableRooms = roomsData.filter((room) => { 
    const isRoomBooked = bookingsOnSearchDate.some((booking) => { 
     return  booking.roomNumber === room.number 
    })
    console.log("isRoomBooked", isRoomBooked)
    return !isRoomBooked 
  })
  console.log({availableRooms})
  console.log({roomType})
  const filteredByType = filterByRoomType(availableRooms, roomType)
  console.log("AFTER INVOCATION", filteredByType)
  return filteredByType
}


      // check if at least one booking on the searchDate matches the room number
      // - if at least one room booking matches the searchDate, isRoomBooked will be true (meaning that room is NOT available) 
      // - isRoomBooked returns false if room available on the searchDate
      
 // bookingsOnSearchDate array only contains bookings with the searchDate
        // const formattedSearchDate = searchDate.split("/").join("-")





// cont addBooking = (currentCustomer) => {
//   // sequence of what happens when button is clicked
//   // avail rooms sitting on DOM, when you hit 
//   const currentCustomerBookings = getCustomerBookings()
//   const availRooms = getRoomAvailability()
//   currentCustomerBookings.push(availRooms)
//   // push into customer booking to add bookings
// }

