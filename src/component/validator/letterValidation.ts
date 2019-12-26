import { required, REQUIRED, onlyLetter, ONLY_LETTER } from "./validators";
import Validation from "./validation";

class LetterValidation extends Validation {

    getErrors(value: string): string[] {
        this.errors = [];
        if (!required(value)) {
            this.errors.push(REQUIRED);
        }
        if (!onlyLetter(value)) {
            this.errors.push(ONLY_LETTER);
        }
        return this.errors;
    }
}

export default LetterValidation;