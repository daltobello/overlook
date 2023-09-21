import chai from "chai";
const expect = chai.expect;

// sample data
import { bookingsData } from "../sample-data/bookings-sample";
import { customersData } from "../sample-data/customers-sample";
import { roomsData } from "../sample-data/rooms-sample";

// functions
import { getCustomerBookings, getCustomerRoomBooking} from "../src/bookings";


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





describe('getCustomerBookings', () => {
  it('should return bookings for a given customer', () => {
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

describe("getCustomerRoomBooking", () => {
  it("should return an array of room bookings for a given customer", () => {
    const currentCustomer =  { id: 1, name: "Leatha Ullrich", };
    const result1 = getCustomerRoomBooking(currentCustomer, sampleBookings, sampleRooms);

    const expected = [
      {
        room: sampleRooms[0], 
        booking: "2022/02/05",
      },
    ];
    expect(result1).to.deep.equal(expected);
  });

  it("should return an empty array if the customer has no bookings", () => {
    const currentCustomer = { id: 3 , name: "No Bookings Customer", };
    const result2 = getCustomerRoomBooking(currentCustomer, sampleBookings, sampleRooms);

    expect(result2).to.deep.equal([]);
  });
});


