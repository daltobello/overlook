import chai from "chai";
const expect = chai.expect;

// sample data
import { bookingsData } from "../sample-data/bookings-sample";
import { customersData } from "../sample-data/customers-sample";
import { roomsData } from "../sample-data/rooms-sample";

// functions
import { getCustomerBookings, getCustomerRoomBookings, calculateTotalRoomCost} from "../src/bookings";


// figure out import issue to avoid using this globally scoped data again:
const sampleRooms = [
  {
    number: 1,
    roomType: "residential suite",
    bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 358.4,
  },
  {
    number: 2,
    roomType: "suite",
    bidet: false,
    bedSize: "full",
    numBeds: 2,
    costPerNight: 477.38,
  },
];

const sampleBookings = [
  {
    id: "5fwrgu4i7k55hl6t8",
    userID: 1,
    date: "2022/02/05",
    roomNumber: 1,
  },
  {
    id: "5fwrgu4i7k55hl6uf",
    userID: 2,
    date: "2023/01/09",
    roomNumber: 2,
  },
];


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


describe("getCustomerRoomBookings", () => {
  it('should be a function', () => {
    expect(getCustomerRoomBookings).to.be.a('function');
  });

  it("should return an array of room bookings for a given customer", () => {
    const customer1 =  { id: 1, name: "Leatha Ullrich", };
    const customer1Bookings = getCustomerRoomBookings(customer1, sampleBookings, sampleRooms);

    const expected = [
      {
        room: sampleRooms[0], 
        booking: "2022/02/05",
      },
    ];
    expect(customer1Bookings).to.deep.equal(expected);
  });

  it("should return an empty array if the customer has no bookings", () => {
    const customer3 = { id: 3 , name: "No Bookings Customer", };
    const customer3Bookings = getCustomerRoomBookings(customer3, sampleBookings, sampleRooms);

    expect(customer3Bookings).to.deep.equal([]);
  });
});

describe("calculateTotalRoomCost", () => {
  it("should calculate the total cost spent on rooms for a given customer", () => {
    const customer1 =  { id: 1, name: "Leatha Ullrich", };
    const customer1Bookings =  getCustomerRoomBookings(customer1, sampleBookings, sampleRooms);
    const bookingTotal = calculateTotalRoomCost(customer1Bookings)
    const expectedCost = 358.4
    expect(bookingTotal).to.equal(expectedCost)
});
})