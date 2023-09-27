export const getCustomerBookings = (currentCustomer, allBookings) =>{
  const filteredBookings = allBookings.filter((booking) => {
    return booking.userID === currentCustomer.id
  })
  return  filteredBookings
}

export const storeCustomerBookings = (currentCustomer, allBookings, roomsData) => {
  const customerBookings = getCustomerBookings(currentCustomer, allBookings)
  const bookingsWithRooms = customerBookings.map((booking) => {
    const customerRoom = roomsData.find((room) => {
      return room.number === booking.roomNumber
    });
    return { room: customerRoom, date: booking.date };
  });
  return bookingsWithRooms; 
};

export const calculateTotalRoomCost = (customerBookings) => {
  const bookingCost = customerBookings.reduce((total, booking) => {
    total += booking.room.costPerNight
    return total
  }, 0)
  return bookingCost 
}



