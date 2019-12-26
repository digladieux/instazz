import React from 'react';
import PasswordValidator from '../validator/passwordValidation';
import EmailValidation from '../validator/emailValidation';
import EqualValueValidation from '../validator/equalValueValidation';
import LengthValidation from '../validator/lengthValidation';
import { displayArray, redirection } from '../globalFunctions';
import { ShowLoader, ErrorAlert, CloseLoader, RequestSuccess } from '../alert';
import LocalAuthenticationService from '../services/authentication/localAuthenticationService';
import ReactFlagsSelect from 'react-flags-select';
import "../../assets/styles/selectFlag.css";
import Validation from '../validator/validation';
import LetterValidation from '../validator/letterValidation';
type State = {
    username: string,
    password: string,
    check_password: string,
    email: string,
    first_name: string,
    last_name: string,
    birth_date: string,
    biography: string,
    country: string
};
class PostGlobeTrotterForm extends React.Component<{}, State> {

    private _localService: LocalAuthenticationService = new LocalAuthenticationService();;
    private errors: Map<string, string[]> = new Map();
    private validations: Validation[] = [new PasswordValidator(), new EqualValueValidation(), new LengthValidation(), new EmailValidation(), new LetterValidation()]
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            check_password: '',
            email: '',
            first_name: '',
            last_name: '',
            birth_date: '',
            biography: '',
            country: 'FR',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSelectCountry = this.onSelectCountry.bind(this);

    }

    myChangeHandler = (event: any) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val } as Pick<State, keyof State>);
        let index: number = -1;
        let second_value: any;
        switch (nam) {
            case "password":
                index = 0;
                break;
            case "check_password":
                index = 1;
                second_value = this.state.password;
                break;
            case "username":
                index = 2;
                second_value = 6;
                break;
            case "email":
                index = 3;
                break;
            case "first_name":
            case "last_name":
                index = 4;
                break;
        }
        this.errors.set(nam, this.validations[index].getErrors(val, second_value));
        this.isFormValid();


    }

    isFormValid() {

        (document.getElementById("submit") as HTMLButtonElement).disabled =
            !this.validations[0].isValid(this.state.password) ||
            !this.validations[1].isValid(this.state.password, this.state.check_password) ||
            !this.validations[2].isValid(this.state.username, 6) ||
            !this.validations[3].isValid(this.state.email) ||
            !this.validations[4].isValid(this.state.first_name) ||
            !this.validations[4].isValid(this.state.last_name);

    }

    async handleSubmit(event: any) {
        event.preventDefault();
        ShowLoader();
        const result = await this._localService.postGlobeTrotter(this.state);
        if (result.status !== 201) {
            ErrorAlert(result.response.data).then();
        } else {
            CloseLoader();
            RequestSuccess("Account created").then();
            redirection(this.props, '/login');
        }
    }

    onSelectCountry(country_code: string) {
        this.setState({ country: country_code } as Pick<State, keyof State>);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <label>Enter your username
                    <input
                        id='username'
                        type='text'
                        name='username'
                        placeholder='Enter your username'
                        onChange={this.myChangeHandler} />
                    {displayArray(this.errors.get('username'))}
                </label><br></br>
                <label>Enter your password:
                    <input
                        id='password'
                        type='password'
                        name='password'
                        placeholder='Enter your password'
                        onChange={this.myChangeHandler} />
                    {displayArray(this.errors.get('password'))}
                </label><br></br>
                <label>Enter your password again:
                    <input
                        id='check_password'
                        type='password'
                        name='check_password'
                        placeholder='Enter again your password'
                        onChange={this.myChangeHandler} />
                    {displayArray(this.errors.get('check_password'))}
                </label><br></br>
                <label>Enter your email:
                    <input
                        id='email'
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        onChange={this.myChangeHandler} />
                    {displayArray(this.errors.get('email'))}
                </label><br></br>
                <label>Enter your first name:
                    <input
                        id='first_name'
                        type='text'
                        name='first_name'
                        placeholder='Enter your first_name'
                        onChange={this.myChangeHandler} />
                    {displayArray(this.errors.get('first_name'))}
                </label><br></br>
                <label>Enter your last name:
                    <input
                        id='last_name'
                        type='text'
                        name='last_name'
                        placeholder='Enter your last_name'
                        onChange={this.myChangeHandler} />
                    {displayArray(this.errors.get('last_name'))}
                </label><br></br>
                <label>Enter your age:
                    <input
                        id='birth_date'
                        type='date'
                        name='birth_date'
                        onChange={this.myChangeHandler} />
                </label><br></br>
                <label>Enter your biography:
                    <input
                        type='text'
                        name='biography'
                        placeholder='Enter your biography'
                        onChange={this.myChangeHandler} />
                </label><br></br>
                <div style={{ width: 25 + '%' }}>
                    <ReactFlagsSelect
                        searchable={true}
                        defaultCountry="FR"
                        searchPlaceholder="Search for a country"
                        onSelect={this.onSelectCountry}
                        placeholder="Select your actual country"
                        className="flag-select" />
                </div>
                <input id="submit"
                    type="submit" value="Submit" disabled />
            </form>
        );
    }
}
export default PostGlobeTrotterForm;