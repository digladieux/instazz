import React from 'react';
import GlobeTrotterModel from '../models/globeTrotterModel';
import GlobeTrotterService from '../services/globeTrotterService';
import { ShowLoader, ErrorAlert, CloseLoader } from '../alert';
import { redirection } from '../globalFunctions';
type State = { globe_trotter: GlobeTrotterModel };
type Props = { id: string }
class Account extends React.Component<Props, State>  {

    private _globe_trotter_provider: GlobeTrotterService = new GlobeTrotterService();

    constructor(props: any) {
        super(props);
        this.state = {
            globe_trotter: new GlobeTrotterModel(null),
        }
    }
    async componentDidMount() {

        ShowLoader();
        const result = await this._globe_trotter_provider.getMe();
        if (result.status === 200) {
            this.setState({ globe_trotter: result.data } as Pick<State, keyof State>);
            CloseLoader();
        } else {
            ErrorAlert(result.response.data).then();
            redirection(this.props, '/login');
        }
    }

    render() {

        return (
            <div>
                FORM POUR MODIFIER VALUE
                username: {this.state.globe_trotter?.username}<br></br>
                biography: {this.state.globe_trotter?.biography}<br></br>
                last_name: {this.state.globe_trotter?.last_name}<br></br>
                first_name: {this.state.globe_trotter?.first_name}<br></br>
                age : {this.state.globe_trotter?.birth_date}<br></br>
            </div>

        );
    }
}

export default Account;