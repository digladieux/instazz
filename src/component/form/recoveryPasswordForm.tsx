import React from 'react';
import EmailValidation from '../validator/emailValidation';
import { ShowLoader, ErrorAlert, CloseLoader } from '../alert';
import LocalAuthenticationService from '../services/authentication/localAuthenticationService';
import { redirection, displayArray } from '../globalFunctions';
import Validation from '../validator/validation';
type State = {
    email: string,
};
class RecoveryPasswordForm extends React.Component<{}, State> {

    private localService: LocalAuthenticationService = new LocalAuthenticationService()
    private errors: string[] = []
    private emailValidation: Validation = new EmailValidation();

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    myChangeHandler = (event: any) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.errors = [];
        this.setState({ [nam]: val } as Pick<State, keyof State>);
        this.errors = this.emailValidation.getErrors(val);
        if (this.errors.length !== 0) {
            (document.getElementById("submit") as HTMLButtonElement).disabled = true;
        } else {
            (document.getElementById("submit") as HTMLButtonElement).disabled = false;
        }
    }

    async handleSubmit(event: any) {
        event.preventDefault();
        ShowLoader();
        const result = await this.localService.resetPassword(this.state.email);
        if (result.status !== 200) {
            ErrorAlert(result.response.data).then();
        } else {
            CloseLoader();
            redirection(this.props, '/login');


        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Enter your email:
                    <input
                        id='email'
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        onChange={this.myChangeHandler} />
                    {displayArray(this.errors)}
                </label><br></br>
                <input id="submit"
                    type="submit" value="Submit" disabled />
            </form>
        );
    }
}
export default RecoveryPasswordForm;