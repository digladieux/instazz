import React from 'react';
import Validator from './validator'

class Login extends React.Component {

    private errors = {
        username: {},
        password: {},
    }
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
                this.errors.password = this.FieldValid(validator);
                break;
            case "username":
                validator.required();
                this.errors.username = this.FieldValid(validator);
                break;
        }

        if (this.FormValid()) {
            (document.getElementById("submit") as HTMLButtonElement).disabled = false;

        } else {
            (document.getElementById("submit") as HTMLButtonElement).disabled = true;
        }
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
    FormValid() {
        // for (var key in this.errors) {
        // if (Object.keys(this.errors[key]).length !== 0) {
        // return false;
        // }
        // }
        return true;
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
                <input id="submit" type="submit" value="Submit" disabled />
            </form>
        );
    }
}
export default Login;