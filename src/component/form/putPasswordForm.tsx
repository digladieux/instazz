import React from 'react';
import PasswordValidator from '../validator/passwordValidation';
import EqualValueValidation from '../validator/equalValueValidation';
import RequiredValidation from '../validator/requiredValidation';
import LocalAuthenticationService from '../services/authentication/localAuthenticationService';
import { ShowLoader, ErrorAlert, CloseLoader } from '../alert';
import { displayArray, redirection } from '../globalFunctions';
import Validation from '../validator/validation';
type State = {
    old_password: string,
    new_password: string,
    check_password: string,
};
class PutPasswordForm extends React.Component<{}, State> {

    private errors: Map<string, string[]> = new Map();
    private localService: LocalAuthenticationService = new LocalAuthenticationService();
    private validations: Validation[] = [new RequiredValidation(), new EqualValueValidation(), new PasswordValidator()];
    constructor(props: any) {
        super(props);
        this.state = {
            old_password: '',
            new_password: '',
            check_password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    myChangeHandler = (event: any) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val } as Pick<State, keyof State>);
        let index: number;
        switch (nam) {
            case "old_password":
                index = 0;
                break;
            case "check_password":
                index = 1
                break;
            case "new_password":
                index = 2
                break;
            default:
                index = -1
        }

        this.errors.set(nam, this.validations[index].getErrors(val, 8));
        this.isFormValid();
    }

    isFormValid() {

        if (
            this.validations[0].isValid(this.state.old_password) &&
            this.validations[1].isValid(this.state.new_password) &&
            this.validations[2].isValid(this.state.new_password, this.state.check_password)
        ) {
            (document.getElementById("submit") as HTMLButtonElement).disabled = false;

        } else {
            (document.getElementById("submit") as HTMLButtonElement).disabled = true;
        }

    }

    async handleSubmit(event: any) {
        event.preventDefault();
        ShowLoader();
        const result = await this.localService.putPassword(this.state.old_password, this.state.new_password);
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
                <label>Enter your old_password:
                    <input
                        id='old_password'
                        type='password'
                        name='old_password'
                        placeholder='Enter your old_password'
                        onChange={this.myChangeHandler} />
                    {displayArray(this.errors.get('old_password'))}
                </label><br></br>
                <label>Enter your new_password:
                    <input
                        id='new_password'
                        type='password'
                        name='new_password'
                        placeholder='Enter your new_password'
                        onChange={this.myChangeHandler} />
                    {displayArray(this.errors.get('new_password'))}
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
                <input id="submit"
                    type="submit" value="Submit" disabled />
            </form>
        );
    }
}
export default PutPasswordForm;