import React from 'react';
import Validator from './validator'

class RecoveryPasswordForm extends React.Component {

    private errors = {
        email: {},
    }
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
        };
    }
    myChangeHandler = (event: any) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
        let validator = new Validator(val);
        validator.required();
        validator.isEmailValid();
        this.errors.email = this.FieldValid(validator);
        this.isFormValid();



    }

    FieldValid(validator: Validator) {
        if (validator.isValid()) {
            return {};
        }
        return validator.getErrors();
    }

    dislayArray(array: any) {
        var str = '';
        for (let key in array) {
            str += array[key];
        }
        return str;
    }
    isFormValid() {
        var formValid = true;
        // for (var key in this.errors) {
        // if (Object.keys(this.errors[key]).length !== 0) {
        // formValid = false;
        // break;
        // }
        // }

        if (formValid) {
            (document.getElementById("submit") as HTMLButtonElement).disabled = false;

        } else {
            (document.getElementById("submit") as HTMLButtonElement).disabled = true;
        }
    }

    handleSubmit(event: any) {
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Enter your email:
                <input
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        onChange={this.myChangeHandler} />
                    {this.dislayArray(this.errors.email)}
                </label>
                <input id="submit" type="submit" value="Submit" disabled />
            </form>
        );
    }
}
export default RecoveryPasswordForm;