import chai from "chai";
const expect = chai.expect;

// sample data
import { roomsData } from "../sample-data/rooms-sample";

// functions
import { filterByRoomType } from "../src/filter-rooms";


describe("filterByRoomType", () => {
  const allRooms = roomsData

  it('should be a function', () => {
    expect(filterByRoomType).to.be.a('function');
  });

  it("should filter rooms by type", () => {
    const residentialSuites = filterByRoomType(allRooms, "residential suite")
    expect(residentialSuites).to.deep.equal([  { number: 1, roomType: "residential suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 358.4,
    }])
  })

  it('should return an empty array if there are no rooms in the category of the type', () => {
    const noRoomType = filterByRoomType(allRooms, "executive suite")
    expect(noRoomType).to.deep.equal([])




  });



});