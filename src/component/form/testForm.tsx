import InputComponent from './input';
import React from 'react';
import { redirection, displayArray } from '../globalFunctions';
import LocalAuthenticationService from '../services/authentication/localAuthenticationService';
import RequiredValidation from '../validator/requiredValidation';
import { ShowLoader, CloseLoader, ErrorAlert } from '../alert';
import { withRouter } from 'react-router-dom'
import { setCookie, getCookie, removeCookie } from '../cookies';
type State = { username: string, password: string };
class TestForm extends React.Component<{}, State> {

    // TODO : A enlever avec input
    private errors: Map<string, string[]> = new Map();
    private localAuthenticationService: LocalAuthenticationService = new LocalAuthenticationService();
    constructor(props: any) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getErrors = this.getErrors.bind(this);
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


    getErrors(input: { "errors": string[], "name": string }) {
        if (input.errors.length === 0) {
            this.errors.set(input.name, []);
            (document.getElementById("submit") as HTMLButtonElement).disabled = false;
        }
        else {
            this.errors.set(input.name, input.errors);
            (document.getElementById("submit") as HTMLButtonElement).disabled = true;
        }
        this.forceUpdate();
    }

    async handleSubmit(event: any) {
        event.preventDefault();
        ShowLoader();
        const result = await this.localAuthenticationService.loginByCredentials("", "")
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
                <InputComponent id="username"
                        value="username"
                        placeholder="enter a username"
                        type="text"
                        name="username"
                        validation={new RequiredValidation()}
                        getErrors={this.getErrors}
                    />
                    {displayArray(this.errors.get('username'))}
                </label><br></br>
                <label>Enter your password:
                <InputComponent id="password"
                        value="password"
                        placeholder="enter a password"
                        type="password"
                        name="password"
                        validation={new RequiredValidation()}
                        getErrors={this.getErrors}
                    />
                    {displayArray(this.errors.get('password'))}
                </label><br></br>
                <input id="submit"
                    type="submit" value="Submit" disabled />
            </form>
        );
    }
}
export default withRouter(TestForm);