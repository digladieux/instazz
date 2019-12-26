import React from 'react';
import { withRouter } from 'react-router-dom'
import Validation from '../validator/validation';
type State = { field: string };
type Props = {
    id: string,
    value: string,
    placeholder: string,
    type: string,
    name: string,
    validation: Validation,
    isValid: (valid: Boolean) => void,
    getErrors: (input: {}) => void
}
class InputComponent extends React.Component<Props, State> {

    private errors: string[] = [];
    constructor(props: any) {
        super(props);
        this.state = {
            field: '',
        };
    }

    myChangeHandler = (event: any) => {
        let val = event.target.value;
        this.errors = [];
        this.setState({ field: val } as Pick<State, keyof State>);
        this.errors = this.props.validation.getErrors(val);
        return this.props.getErrors({ "errors": this.errors, "name": this.props.name });
    }

    isValid = () => {
        return this.props.isValid(this.props.validation.isValid(this.state.field));
    }

    render() {
        return (
            <input
                id={this.props.id}
                type={this.props.type}
                name={this.props.name}
                placeholder={this.props.placeholder}
                onChange={this.myChangeHandler} />
        );
    }
}
export default withRouter(InputComponent);