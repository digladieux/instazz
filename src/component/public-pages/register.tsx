import CreateUserForm from '../form/postGlobeTrotterForm'
import React from 'react'

class Register extends React.Component {

    render() {

        return (
            <div>
                <CreateUserForm  {...this.props} />
            </div>

        );
    }
}

export default Register