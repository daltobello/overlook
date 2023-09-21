import chai from "chai";
const expect = chai.expect;

// sample data
import { bookingsData } from "../sample-data/bookings-sample";
import { customersData } from "../sample-data/customers-sample";
import { roomsData } from "../sample-data/rooms-sample";

// functions
import {getRoomAvailability } from "../src/new-bookings";

describe("getRoomAvailability", () => {

  it('should be a function', () => {
    expect(getRoomAvailability).to.be.a('function');
  });

  it('should return available rooms for a given date', () => {
    const allBookings = bookingsData
    const allRooms = roomsData
    const availableRooms = getRoomAvailability(allRooms, allBookings, "2023/01/09")
    expect(availableRooms).to.deep.equal([{ number: 1, roomType: "residential suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 358.4,
    }])
  });
});