import chai from "chai";
const expect = chai.expect;

import { customersData } from "../sample-data/customers-sample";
import { validateUserLogin } from "../src/login";

describe("validateUserLogin", () => {
  it('should be a function', () => {
    expect(validateUserLogin).to.be.a('function');
  });

  const allCustomers = customersData;

  it("should check if a customer's login credentials are valid and return the customer", () => {
    const validatedCustomer = validateUserLogin("customer1", "overlook2021", allCustomers);
    expect(validatedCustomer).to.deep.equal({
      id: 1,
      name: "Leatha Ullrich",
    });
  });

  it("should return error message if password is invalid", () => {
    const incorrectPassword = validateUserLogin("customer50", "toast2025", allCustomers);
    expect(incorrectPassword).to.equal("Incorrect login credentials.");
  });

  it("should return error message if user does not exist", () => {
    const incorrectUserID = validateUserLogin("customer999", "overlook2026", allCustomers);
    expect(incorrectUserID).to.equal("Incorrect login credentials.");
  });
});