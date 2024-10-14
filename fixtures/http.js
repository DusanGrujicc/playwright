export const STATUS = {
  SUCCESS: "Success",
  UNAUTHORIZED: "Unauthorized",
};
export const RESPONSE_MESSAGE = {
  INVALID_EMAIL: "The email field is required.",
  EMPTY_PASSWORD: "The password field is required.",
  UNAUTHENTICATED: "Unauthenticated",
  NO_CUSTOMER_FOUND: (id) => {
    return `No customer found with ID ${id} found`;
  },
};
