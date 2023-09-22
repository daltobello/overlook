export const getRoomAvailability = (roomsData, bookingsData, searchDate) => {

  const bookingsOnSearchDate = bookingsData.filter((booking) => {
    return booking.date === searchDate 
  })
  const availableRooms = roomsData.filter((room) => { 
    const isRoomBooked = bookingsOnSearchDate.some((booking) => { 
      // console.log("START") 
      // console.log({bookingsOnSearchDate})
      // console.log(booking.roomNumber)
      // console.log(room.number)

     return  booking.roomNumber === room.number 
    })
    console.log({isRoomBooked})
    return !isRoomBooked 
  })
  // console.log({availableRooms})
  return availableRooms 
}




