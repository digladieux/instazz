import React from 'react';
import Validator from './validator'

class CreateUserForm extends React.Component {

    private errors = {
        username: {},
        password: {},
        check_password: {},
        email: {},
        phone_number: {},
    }
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            check_password: '',
            email: '',
            phone_number: '',
        };
    }
    myChangeHandler = (event: any) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
        let validator = new Validator(val);

        switch (nam) {
            case "password":
                validator.required();
                validator.length(8);
                validator.containLowercase();
                validator.containUppercase();
                validator.containNumeric();
                validator.containSpecialCharacter()
                this.errors.password = this.FieldValid(validator);
                break;
            case "check_password":
                validator.equalValue("");
                break;
            case "username":
                validator.required();
                validator.length(6);
                this.errors.username = this.FieldValid(validator);
                break;
            case "email":
                validator.required();
                validator.isEmailValid();
                this.errors.email = this.FieldValid(validator);
                break;
            case "phone_number":
                validator.required();
                validator.isPhoneValid();
                this.errors.phone_number = this.FieldValid(validator);
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
                <label>Enter your username
                <input
                        type='text'
                        name='username'
                        placeholder='Enter your username'
                        onChange={this.myChangeHandler} />
                    {this.dislayArray(this.errors.username)}
                </label>
                <label>Enter your password:
                <input
                        type='password'
                        name='password'
                        placeholder='Enter your password'
                        onChange={this.myChangeHandler} />
                    {this.dislayArray(this.errors.password)}
                </label>
                <label>Enter your password again:
                <input
                        type='password'
                        name='check_password'
                        placeholder='Enter again your password'
                        onChange={this.myChangeHandler} />
                    {this.dislayArray(this.errors.check_password)}
                </label>
                <label>Enter your email:
                <input
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        onChange={this.myChangeHandler} />
                    {this.dislayArray(this.errors.email)}
                </label>
                <label>Enter your phone number:
                <input
                        type='tel'
                        name='phone_number'
                        placeholder='Enter your phone_number'
                        onChange={this.myChangeHandler} />
                    {this.dislayArray(this.errors.phone_number)}
                </label>
                <input id="submit" type="submit" value="Submit" disabled />
            </form>
        );
    }
}
export default CreateUserForm;