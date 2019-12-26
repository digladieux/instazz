import React from 'react';
import { redirection, displayArray } from '../globalFunctions';
import LocalAuthenticationService from '../services/authentication/localAuthenticationService';
import RequiredValidation from '../validator/requiredValidation';
import { ShowLoader, CloseLoader, ErrorAlert } from '../alert';
import { withRouter } from 'react-router-dom'
import { setCookie, getCookie, removeCookie } from '../cookies';
import Validation from '../validator/validation';
type State = { username: string, password: string };
class LoginForm extends React.Component<{}, State> {

    private errors: Map<string, string[]> = new Map();
    private requireValidation: Validation = new RequiredValidation();
    private localAuthenticationService: LocalAuthenticationService = new LocalAuthenticationService();
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const authorization = getCookie('authorization')
        if (authorization !== undefined) {
            const result = await this.localAuthenticationService.loginByToken(authorization);
            if (result.status === 200) {
                redirection(this.props, '/account')
            } else {
                removeCookie('authorization')
            }

        }
    }

    myChangeHandler = (event: any) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val } as Pick<State, keyof State>);
        this.errors.set(nam, this.requireValidation.getErrors(val));
        this.isFormValid();
    }


    isFormValid() {
        if (
            this.requireValidation.isValid(this.state.password) &&
            this.requireValidation.isValid(this.state.username)
        ) {
            (document.getElementById("submit") as HTMLButtonElement).disabled = false;

        } else {
            (document.getElementById("submit") as HTMLButtonElement).disabled = true;
        }

    }

    async handleSubmit(event: any) {
        event.preventDefault();
        ShowLoader();
        const result = await this.localAuthenticationService.loginByCredentials(this.state.username, this.state.password)
        if (result.status !== 200) {
            ErrorAlert(result.response.data).then();
        } else {
            setCookie('authorization', result.data)
            CloseLoader();
            redirection(this.props, '/account');
        }
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
                <input id="submit"
                    type="submit" value="Submit" disabled />
            </form>
        );
    }
}
export default withRouter(LoginForm);