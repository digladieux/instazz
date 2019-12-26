import { required, REQUIRED, lengthValid, LENGTH, containLowercase, LOWER_CASE, containNumeric, NUMERIC, containUppercase, UPPER_CASE, containSpecialCharacter, SPECIAL_CHARACTER } from "./validators";
import Validation from "./validation";

class PasswordValidator extends Validation {

    getErrors(value: string, length: any): string[] {
        this.errors = [];
        if (!required(value)) {
            this.errors.push(REQUIRED);
        }
        if (!lengthValid(value, length)) {
            this.errors.push(LENGTH(length));
        }
        if (!containLowercase(value)) {
            this.errors.push(LOWER_CASE);
        }
        if (!containNumeric(value)) {
            this.errors.push(NUMERIC);
        }
        if (!containUppercase(value)) {
            this.errors.push(UPPER_CASE);
        }
        if (!containSpecialCharacter(value)) {
            this.errors.push(SPECIAL_CHARACTER);
        }
        return this.errors;

    }
}

export default PasswordValidator;