export const getCustomerBookings = (currentCustomer, allBookings) =>{
  const filteredBookings = allBookings.filter((booking) => {
    return booking.userID === currentCustomer.id
  })
  return  filteredBookings // array of booking objects that correspond with a given customer's userID
}

export const storeCustomerBookings = (currentCustomer, allBookings, roomsData) => {
  const customerBookings = getCustomerBookings(currentCustomer, allBookings)
  const bookingsWithRooms = customerBookings.map((booking) => {
    const customerRoom = roomsData.find((room) => {
      return room.number === booking.roomNumber
    });
    return { room: customerRoom, date: booking.date };
  });
  return bookingsWithRooms; // array of the booking objects with a room property, containing entire room object and a booking property containing the date
};


export const calculateTotalRoomCost = (customerBookings) => {
  const bookingCost = customerBookings.reduce((total, booking) => {
    total += booking.room.costPerNight
    return total
  }, 0)
  return bookingCost // the sum of all bookings for a given customer
}
// customerBookings is the returned value from getCustomerRoomBookings


