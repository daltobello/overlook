export const filterByRoomType = (roomsData, type) => {
  const roomsFilteredByType = roomsData.filter((room) => {
    return room.roomType === type
  })
  return roomsFilteredByType
}

export const findRoom = (roomsData, roomNumber) => {
  const foundRoom = roomsData.filter((room) => {
    return room.roomNumber === parseInt(roomNumber)
  })
  return foundRoom
}

// write test for this function!