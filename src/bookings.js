export const getCustomerBookings = (currentCustomer, allBookings) =>{
  const filteredBookings = allBookings.filter((booking) => {
    return booking.userID === currentCustomer.id
  })
  return  filteredBookings // array of booking objects that correspond with a given customer's userID
}

// compare the booking.roomNumber to the room.number to get the room a customer has booked.

export const getCustomerRoomBooking = (currentCustomer, allBookings, roomsData) => {
  const customerBookings = allBookings.filter((booking) => {
   return booking.userID === currentCustomer.id
  });
  const bookingsWithRooms = customerBookings.map((booking) => {
    const customerRoom = roomsData.find((room) => {
      return room.number === booking.roomNumber
    });
    return { room: customerRoom, booking: booking.date };
  });
  return bookingsWithRooms; // an array of the room object with a room property and a booking property
};