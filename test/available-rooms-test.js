import chai from "chai";
const expect = chai.expect;

import { bookingsData } from "../sample-data/bookings-sample";
import { roomsData } from "../sample-data/rooms-sample";
import {getRoomAvailability} from "../src/available-rooms";

describe("getRoomAvailability", () => {
  let allBookings, allRooms

  beforeEach(()=> {
  allBookings = bookingsData
  allRooms = roomsData

  it('should be a function', () => {
    expect(getRoomAvailability).to.be.a('function');
  });

  it('should return an array of available rooms on a given date', () => {
    const filteredRooms = getRoomAvailability(allRooms, allBookings, "2022/02/05", "suite")
    expect(filteredRooms).to.deep.equal([{
      number: 2,
      roomType: 'suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 2,
      costPerNight: 477.38,
    },
    {
      number: 7,
      roomType: 'suite',
      bidet: false,
      bedSize: 'twin',
      numBeds: 1,
      costPerNight: 497.64,
    }])
  });

  it("should return all rooms on a given date when the roomType is all", () => {
    const filteredRooms = getRoomAvailability(allRooms, allBookings, "2022/02/16", "all")
    expect(filteredRooms).to.deep.equal([{
      number: 1,
      roomType: 'residential suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 358.4,
    },
    {
      number: 2,
      roomType: 'suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 2,
      costPerNight: 477.38,
    }])
  })

      it('should return an empty array if there are no rooms available on a given date that match the roomType', () => {
      const availableRooms = getRoomAvailability(allRooms, allBookings, "2022/02/16", "king")
      expect(availableRooms.length).to.deep.equal(0) 
    });
  });
});
