import chai from "chai";
const expect = chai.expect;

// sample data
import { bookingsData } from "../sample-data/bookings-sample";
import { roomsData } from "../sample-data/rooms-sample";
// functions
import {getRoomAvailability} from "../src/available-rooms";

describe("getRoomAvailability", () => {

  it('should be a function', () => {
    expect(getRoomAvailability).to.be.a('function');
  });

  it('should return an array of available rooms on a given date', () => {
    const allBookings = bookingsData
    const allRooms = roomsData
    const availableRooms = getRoomAvailability(allRooms, allBookings, "2023/01/09")
    expect(availableRooms).to.deep.equal([ {
      number: 2,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38,
    }])
  });

      it('should return an empty array if there are no rooms available on a given date', () => {
      const allBookings = bookingsData
      const allRooms = roomsData
      const availableRooms = getRoomAvailability(allRooms, allBookings, "2022/02/16")
      expect(availableRooms.length).to.deep.equal(0) 
    });
});
