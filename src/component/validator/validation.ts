abstract class Validation {

    protected errors: string[] = []

    abstract getErrors(value: string, other_value?: any): string[];

    isValid(value: string, other_value?: any): Boolean {
        return this.getErrors(value, other_value).length === 0;
    }
}

export default Validation