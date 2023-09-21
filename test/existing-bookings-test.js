import chai from "chai";
const expect = chai.expect;

// sample data
import { bookingsData } from "../sample-data/bookings-sample";
import { customersData } from "../sample-data/customers-sample";
import { roomsData } from "../sample-data/rooms-sample";

// functions
import { getCustomerBookings, storeCustomerBookings, calculateTotalRoomCost} from "../src/existing-bookings";

describe("getCustomerBookings", () => {
  it('should be a function', () => {
    expect(getCustomerBookings).to.be.a('function');
  });

  it("should return bookings for a given customer", () => {
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


describe("storeCustomerBookings", () => {
  it('should be a function', () => {
    expect(storeCustomerBookings).to.be.a('function');
  });

  it("should return an array of room bookings for a given customer", () => {
    const room = roomsData[0]
    const allRooms = roomsData
    const allBookings = bookingsData
    const customer1 =  { id: 1, name: "Leatha Ullrich", };
    const customer1Bookings = storeCustomerBookings(customer1, allBookings, allRooms);
// create an array of customer bookings with a room property and date property
    const bookingsWithRooms = [
      {
        room: room, 
        date: "2022/02/05",
      },
    ];
    expect(customer1Bookings).to.deep.equal(bookingsWithRooms);
  });

  it("should return an empty array if the customer has no bookings", () => {
    const allRooms = roomsData
    const allBookings = bookingsData
    const customer3 = { id: 3 , name: "No Bookings Customer", };
    const customer3Bookings = storeCustomerBookings(customer3, allBookings, allRooms);

    expect(customer3Bookings).to.deep.equal([]);
  });
});

describe("calculateTotalRoomCost", () => {
  it('should be a function', () => {
    expect(calculateTotalRoomCost).to.be.a('function');
  });

  it("should calculate the total cost spent on rooms for a given customer", () => {
    const allRooms = roomsData
    const allBookings = bookingsData
    const customer1 =  { id: 1, name: "Leatha Ullrich", };
    const customer1Bookings =  storeCustomerBookings(customer1, allBookings, allRooms);
    const bookingTotal = calculateTotalRoomCost(customer1Bookings)
    const expectedCost = 358.4
    expect(bookingTotal).to.equal(expectedCost)
});
})