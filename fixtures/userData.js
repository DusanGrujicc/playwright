import { generateRandomString } from "./utils";

export const generateUserCredentials = (length) => {
    const baseString = generateRandomString(length);

    const username = baseString;
    const email = `${baseString}@email.com`;
    const password = `${baseString}123`;

    return {username, email, password};
}

const VALID_USER_DATA = {
    username: 'test',
    email: 'test@mail.com',
    password: 'test123'
}