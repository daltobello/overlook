import { filterByRoomType } from "./filter-rooms"

export const getRoomAvailability = (roomsData, bookingsData, searchDate, roomType) => {
  const bookingsOnSearchDate = bookingsData.filter((booking) => {
    return booking.date === searchDate
  })
  const availableRooms = roomsData.filter((room) => { 
    const roomIsBooked  = bookingsOnSearchDate.some((booking) => { 
     return  booking.roomNumber === room.number 
    })
    return !roomIsBooked 
  })
  if (roomType === "all") {
    return availableRooms
  } else {
    const filteredByType = filterByRoomType(availableRooms, roomType)
    return filteredByType
  }
}


      // check if at least one booking on the searchDate matches the room number
      // - if at least one room booking matches the searchDate, isRoomBooked will be true (meaning that room is NOT available) 
      // - isRoomBooked returns false if room available on the searchDate
      
 // bookingsOnSearchDate array only contains bookings with the searchDate
// const formattedSearchDate = searchDate.split("/").join("-")






