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