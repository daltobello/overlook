export const validateUserLogin = (username, password, customerData) => {
  let userID = parseInt(username.slice(8));
  if (userID >= 0 && userID <= 50 && password === "overlook2021") {
    const validUserCreds = customerData.find((customer) => {
      return customer.id === userID && password === "overlook2021";
    });
    if (validUserCreds) {
      return validUserCreds;
    }
  }
  return "Incorrect login credentials."
};

// do slice before login
// now customer ID
// return true or false 
// on DOM, 