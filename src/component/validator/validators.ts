export const REQUIRED: string = "Field is required";
export function LENGTH(length: number) { return "Field must contains " + length + " characters" };
export const EQUAL_VALUE: string = "Fields are different";
export const DIFFERENT_FIELDS: string = "Fields are different";
export const LOWER_CASE: string = 'Field must contain 1 lowercase alphabetical character';
export const UPPER_CASE: string = 'Field must contain 1 uppercase alphabetical character';
export const NUMERIC: string = 'Field must contain 1 numeric character';
export const SPECIAL_CHARACTER: string = 'Field must contain 1 special character like !@#$%^&';
export const ONLY_LETTER: string = 'Field must contain only letter';
export const EMAIL_INVALID: string = 'Email is invalid';

export function lengthValid(value: string, length: number): Boolean {
    if (value.length < length) {
        return false;
    }
    return true;
}

export function required(value: string): Boolean {
    if (value.trim() === "" || value.trim().length === 0) {
        return false;
    }
    return true
}

export function equalValue(value: string, equalValue: String): Boolean {
    if (value !== equalValue) {
        return false;
    }
    return true;
}
export function containLowercase(value: string): Boolean {
    var lowercase_regex = new RegExp("[a-z]");
    if (!value.match(lowercase_regex)) {
        return false;
    }
    return true;
}

export function containUppercase(value: string): Boolean {
    var uppercase_regex = new RegExp("[a-z]");
    if (!value.match(uppercase_regex)) {
        return false;
    }
    return true;
}

export function containNumeric(value: string): Boolean {
    var numeric_regex = new RegExp("[0-9]");
    if (!value.match(numeric_regex)) {
        return false;
    }
    return true;
}

export function containSpecialCharacter(value: string): Boolean {
    var special_regex = new RegExp("[!@#$%^&*(),.?_:{}|<>]");
    if (!value.match(special_regex)) {
        return false;
    }
    return true;
}

export function emailValid(value: string): Boolean {
    var email_regex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$');
    if (!value.match(email_regex)) {
        return false;
    }
    return true;
}

export function onlyLetter(value: string): Boolean {
    var special_regex = new RegExp("^[a-zA-Z]+$");
    if (!value.match(special_regex)) {
        return false;
    }
    return true;
}


// var strongRegex = new RegExp( "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})" );
