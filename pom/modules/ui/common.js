import { ERROR_MESSAGES } from "../../../fixtures";

export class Common {
  constructor(page) {
    this.page = page;
    this.locatorPrefix = {
      FormInputLocatorClass: ".mb-3 .text-center p:has-text",
    };
    this.formInputLocators = {
      missingUsername: `${this.locatorPrefix["FormInputLocatorClass"]}("${ERROR_MESSAGES["REGISTER"]["MISSING_USERNAME"]}")`,
      missingEmail: `${this.locatorPrefix["FormInputLocatorClass"]}("${ERROR_MESSAGES["REGISTER"]["MISSING_EMAIL"]}")`,
      missingPassword: `${this.locatorPrefix["FormInputLocatorClass"]}("${ERROR_MESSAGES["REGISTER"]["MISSING_PASSWORD"]}")`,
      shortPassword: `${this.locatorPrefix["FormInputLocatorClass"]}("${ERROR_MESSAGES["REGISTER"]["SHORT_PASSWORD"]}")`,
      invalidEmailFormat: `${this.locatorPrefix["FormInputLocatorClass"]}("${ERROR_MESSAGES["REGISTER"]["INVALID_EMAIL_FORMAT"]}")`,
      takenEmail: `${this.locatorPrefix["FormInputLocatorClass"]}("${ERROR_MESSAGES["REGISTER"]["TAKEN_EMAIL"]}")`,
      takenUsername: `${this.locatorPrefix["FormInputLocatorClass"]}("${ERROR_MESSAGES["REGISTER"]["TAKEN_USERNAME"]}")`,
    };
  }
}
