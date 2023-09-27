export const getCustomers = () => {
  return fetch("https://overlook-api-dun.vercel.app/api/v1/customers")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error"));
};

export const getBookings = () => {
  return fetch("https://overlook-api-dun.vercel.app/api/v1/bookings")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error"));
};

export const getRooms = () => {
  return fetch("https://overlook-api-dun.vercel.app/api/v1/rooms")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("error"));
};

export const generatePostData = (userID, bookingDate, roomNumber) => {
  return {
    "userID": userID,
    "date": bookingDate,
    "roomNumber": roomNumber,
  };
};

export const postNewBookedRoom = (data) => {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data => console.log(data)))
    .catch((error) => console.log(error));
};
