import chai from "chai";
const expect = chai.expect;

// sample data
import bookingsData from "../sample-data/bookings-sample";
import customersData from "../sample-data/customers-sample"
// import roomsData from "../sample-data/rooms-sample";

// functions
import { getCustomerBookings } from "../src/bookings";

describe('getCustomerBookings', () => {
  it('should return bookings for a specific customer', () => {
    const customer1 = customersData[0];
    const customer2 = customersData[1];

    const customer1Bookings = getCustomerBookings(customer1, bookingsData);
    expect(customer1Bookings).to.deep.equal([bookingsData[0]]);
    
    const customer2Bookings = getCustomerBookings(customer2, bookingsData);
    expect(customer2Bookings).to.deep.equal([bookingsData[1]]);
  });

  it('should return an empty array if the customer has no bookings', () => {
    const noBookingsCustomer = { id: 3, name: "No Bookings Customer" };
    const noBookings = getCustomerBookings(noBookingsCustomer, bookingsData);
    expect(noBookings).to.deep.equal([]);
  });
});




