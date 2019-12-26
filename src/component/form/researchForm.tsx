import React from 'react';
import ResearchService from '../services/researchService';
import RequiredValidation from '../validator/requiredValidation';
import GlobeTrotterModel from '../models/globeTrotterModel';
import Validation from '../validator/validation';
type State = {
    research: string,
};
class ResearchForm extends React.Component<{}, State> {

    private researchService: ResearchService = new ResearchService();
    private results: { globe_trotter: GlobeTrotterModel[], trackers: string[] };
    private requireValidation: Validation = new RequiredValidation();
    private update: boolean = false;
    constructor(props: any) {
        super(props);
        this.state = {
            research: '',
        };
        this.results = { globe_trotter: [], trackers: [] };
    }

    myChangeHandler = (event: any) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val } as Pick<State, keyof State>);
    }

    async componentDidUpdate() {
        if (this.update) {
            this.update = false;
        } else if (!this.requireValidation.isValid(this.state.research)) {
            this.results = { globe_trotter: [], trackers: [] };
            this.update = true;
            this.forceUpdate()

        } else {
            const result = await this.researchService.getResearch(this.state.research);
            if (result.status === 200) {
                this.results = result.data
                this.update = true;
                this.forceUpdate()

            } else {
                this.results = { globe_trotter: [], trackers: [] };
            }
        }
    }

    SingleResearch(value: GlobeTrotterModel) {
        return <div>
            <li>Full Name : {value.first_name + " " + value.last_name}</li>
        </div>;
    }

    ResearchList() {
        const listGlobeTrotter = this.results?.globe_trotter?.map((result: GlobeTrotterModel) =>
            this.SingleResearch(result));
        // const listTrackers = this.results?.trackers.map((result) =>
        // this.SingleResearch(result));
        return (
            <ul>
                {listGlobeTrotter}
                {/* {listTrackers} */}
            </ul>
        );
    }


    render() {
        return (
            <div>
                <label>Enter your research:
                    <input
                        id='research'
                        type='text'
                        name='research'
                        placeholder='Enter your research'
                        value={this.state.research}
                        onChange={this.myChangeHandler} />
                    {this.ResearchList()}
                </label><br></br>
            </div>
        );
    }
}
export default ResearchForm;