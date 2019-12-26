import Validation from "./validation";
import { required, lengthValid, REQUIRED, LENGTH } from "./validators";

class LengthValidation extends Validation {
    getErrors(value: string, length: any): string[] {
        this.errors = [];
        if (!required(value)) {
            this.errors.push(REQUIRED);
        }
        if (!lengthValid(value, length)) {
            this.errors.push(LENGTH(length));
        }
        return this.errors;

    }
}

export default LengthValidation;