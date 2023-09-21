export const getRoomAvailability = (roomsData, bookingsData, searchDate) => {
  // console.log({roomsData})
  // console.log({bookingsData})
  // console.log({date})
  const bookingsOnSearchDate = bookingsData.filter((booking) => {
    console.log({booking})
    return booking.date === searchDate // if data matches, return is truthy 
  })
  const availableRooms = roomsData.filter((room) => {
    return !bookingsOnSearchDate.some((booking) => {
     return  booking.roomNumber === room.number
    })
  })
  return availableRooms
}


       // does this number equal the bookingsOnSearchDate
// split("/").join("") on the date to format it with dashes.


