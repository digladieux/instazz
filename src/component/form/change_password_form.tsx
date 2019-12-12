import React from 'react';
import Validator from './validator'

class ChangePasswordForm extends React.Component {

    private errors = {
        old_password: {},
        new_password: {},
        check_new_password: {},
    }
    constructor(props: any) {
        super(props);
        this.state = {
            old_password: '',
            new_password: '',
            check_new_password: '',
        };
    }
    myChangeHandler = (event: any) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
        let validator = new Validator(val);

        switch (nam) {
            case "new_password":
                validator.required();
                validator.length(8);
                validator.containLowercase();
                validator.containUppercase();
                validator.containNumeric();
                validator.containSpecialCharacter()
                this.errors.new_password = this.FieldValid(validator);
                break;
            case "old_password":
                validator.required();
                this.errors.old_password = this.FieldValid(validator);
                break;
            case "check_new_password":
                validator.required();
                validator.equalValue("");
                this.errors.check_new_password = this.FieldValid(validator);
                break;
        }
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
                <label>Enter your old password
                <input
                        type='password'
                        name='old_password'
                        placeholder='Enter your old password'
                        onChange={this.myChangeHandler} />
                    {this.dislayArray(this.errors.old_password)}
                </label>
                <label>Enter your new password:
                <input
                        type='password'
                        name='new_password'
                        placeholder='Enter your new password'
                        onChange={this.myChangeHandler} />
                    {this.dislayArray(this.errors.new_password)}
                </label>
                <label>Enter your new password again:
                <input
                        type='password'
                        name='check_new_password'
                        placeholder='Enter your new password again'
                        onChange={this.myChangeHandler} />
                    {this.dislayArray(this.errors.check_new_password)}
                </label>
                <input id="submit" type="submit" value="Submit" disabled />
            </form>
        );
    }
}
export default ChangePasswordForm;