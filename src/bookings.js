export const getCustomerBookings = (currentCustomer, allBookings) =>{
  const filteredBookings = allBookings.filter((booking) => {
    return booking.userID === currentCustomer.id
  })
  return  filteredBookings
}