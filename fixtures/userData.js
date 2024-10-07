import { generateRandomString } from "./utils";

export const generateUserCredentials = (length) => {
    const baseString = generateRandomString(length);

    const username = baseString;
    const email = `${baseString}@email.com`;
    const password = `${baseString}123`;

    return {username, email, password};
}

export const VALID_LOGIN_PAYLOAD = {
    username: "dusan123",
    email: 'filip@test.com',
    password: 'test123'
}