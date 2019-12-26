import { required, emailValid, REQUIRED, EMAIL_INVALID } from "./validators";
import Validation from "./validation";

class EmailValidation extends Validation {
    getErrors(value: string): string[] {
        this.errors = [];
        if (!required(value)) {
            this.errors.push(REQUIRED);
        }
        if (!emailValid(value)) {
            this.errors.push(EMAIL_INVALID);
        }
        return this.errors;
    }
}

export default EmailValidation;