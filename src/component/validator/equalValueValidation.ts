import Validation from "./validation";
import { equalValue, EQUAL_VALUE } from "./validators";

class EqualValueValidation extends Validation {
    getErrors(value: string, equal_value: any): string[] {
        this.errors = [];
        if (!equalValue(value, equal_value)) {
            this.errors.push(EQUAL_VALUE);
        }
        return this.errors;
    }
}

export default EqualValueValidation;