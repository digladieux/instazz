import Validation from "./validation";
import { required, REQUIRED } from "./validators";

class RequiredValidation extends Validation {

    getErrors(value: string): string[] {
        this.errors = [];
        if (!required(value)) {
            this.errors.push(REQUIRED);
        }
        return this.errors;
    }
}

export default RequiredValidation;