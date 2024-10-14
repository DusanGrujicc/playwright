import { generateRandomString } from "./utils";

export const generateUserCredentials = (length) => {
  const baseString = generateRandomString(length);

  const username = baseString;
  const email = `${baseString}@email.com`;
  const password = `${baseString}123`;

  return { username, email, password };
};

export const VALID_LOGIN_PAYLOAD = {
  username: "dusan123",
  email: "filip@test.com",
  password: "test123",
};

export const INVALID_USER = {
  login: {
    nonExisting_USER: {
      email: `${generateRandomString(4)}@email.com`,
      password: generateRandomString(6),
    },
    emptyInputFields: {
      email: `${generateRandomString(0)} `,
      password: `${generateRandomString(0)} `,
    },
    invalidEmailFormat: {
      email: `${generateRandomString(5)}@email`,
      password: generateRandomString(6),
    },
    wrongEmailAndPassword: [
      `${generateRandomString(4)}@test.com`,
      generateRandomString(7),
    ],
  },
  register: {
    emptyInputFields: {
      username: generateRandomString(0),
      email: generateRandomString(0),
      password: generateRandomString(0),
    },
    invalidEmailFormat: {
      username: generateRandomString(6),
      email: `${generateRandomString(5)}@email`,
      password: generateRandomString(6),
    },
    shortPassword: {
      username: generateRandomString(6),
      email: `${generateRandomString(5)}@email.com`,
      password: generateRandomString(3),
    },
  },
};
