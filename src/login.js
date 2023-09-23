export const validateUserLogin = (username, password, customerData) => {
  let userID = parseInt(username.slice(8));
  if (userID >= 0 && userID <= 50) {
    const validUserCreds = customerData.find((customer) => {
      return customer.id === userID && password === "overlook2021";
    });
    if (validUserCreds) {
      return validUserCreds;
    }
  }
  return "Incorrect login credentials."
};
