export const filterByRoomType = (roomsData, type) => {
  const roomsFilteredByType = roomsData.filter((room) => {
    return room.roomType === type
  })
  return roomsFilteredByType
}
