class Validator {

    private StringToValidate: any;
    private ErrorsMessage: any;

    constructor(StringToValidate: String) {
        this.StringToValidate = StringToValidate;
        this.ErrorsMessage = {};
    }

    length(value: Number) {
        if (this.StringToValidate.length < value) {
            this.ErrorsMessage.length = "String must contain " + value + "characters";
        }
    }

    required() {
        if (this.StringToValidate.trim() === "" || this.StringToValidate.trim().length === 0) {
            this.ErrorsMessage.required = "String is required";
        }
    }

    equalValue(value: String) {
        if (this.StringToValidate !== value) {
            this.ErrorsMessage.equal = "Fields are different";
        }
    }
    containLowercase() {
        var lowercase_regex = new RegExp("[a-z]");
        if (!this.StringToValidate.match(lowercase_regex)) {
            this.ErrorsMessage.lowercase = 'String must contain 1 lowercase alphabetical character'
        }
    }

    containUppercase() {
        var uppercase_regex = new RegExp("[a-z]");
        if (!this.StringToValidate.match(uppercase_regex)) {
            this.ErrorsMessage.uppercase = 'String must contain 1 uppercase alphabetical character'
        }
    }

    containNumeric() {
        var numeric_regex = new RegExp("[0-9]");
        if (!this.StringToValidate.match(numeric_regex)) {
            this.ErrorsMessage.numeric = 'String must contain 1 numeric character'
        }
    }

    containSpecialCharacter() {
        var special_regex = new RegExp("[0-9]");
        if (!this.StringToValidate.match(special_regex)) {
            this.ErrorsMessage.special = 'String must contain 1 special character like !@#$%^&'
        }
    }

    isEmailValid() {

    }

    isPhoneValid() {

    }
    getErrors() {
        return this.ErrorsMessage;
    }

    isValid() {
        return this.ErrorsMessage.length === 0;
    }
    // var strongRegex = new RegExp( "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})" );
}

export default Validator;