import ReactFlagsSelect from 'react-flags-select';
import React from 'react';
import PostService from '../services/postService';
import { ShowLoader, ErrorAlert, CloseLoader } from '../alert';
import { redirection, displayArray } from '../globalFunctions';
import RequiredValidation from '../validator/requiredValidation';
import "../../assets/styles/selectFlag.css";
import Validation from '../validator/validation';
type State = {
    title: string,
    description: string,
    shooting_date: string,
    country: string,
    location: string,
    hashtag: string,
    hashtags: string[]
};
class PostPostForm extends React.Component<{}, State> {

    private postService: PostService = new PostService();
    private errors: Map<string, string[]> = new Map();
    private validation: Validation = new RequiredValidation();
    constructor(props: any) {

        super(props);
        this.state = {
            title: '',
            description: '',
            shooting_date: '',
            country: 'FR',
            location: '',
            hashtag: '',
            hashtags: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onSelectCountry = this.onSelectCountry.bind(this);
    }

    myChangeHandler = (event: any) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val } as Pick<State, keyof State>);
        switch (nam) {
            case "title":
            case "country":
                this.errors.set(nam, this.validation.getErrors(val));
                this.isFormValid();
        }


    }

    isFormValid() {
        (document.getElementById("submit") as HTMLButtonElement).disabled =
            !this.validation.isValid(this.state.title) ||
            !this.validation.isValid(this.state.country) ||
            (document.getElementById("picture") as HTMLInputElement).files?.length === 0;
    }

    async componentWillUnmount() {
        window.removeEventListener('keypress', this.handleKeyPress);

    }

    async componentDidMount() {
        window.addEventListener('keypress', this.handleKeyPress)
    }

    handleKeyPress(event: any) {

        if (event.key === 'Enter') {
            event.preventDefault();
            const hashtags = this.state.hashtags;
            hashtags.push(this.state.hashtag)
            this.setState({
                hashtags: hashtags,
                hashtag: ''
            } as Pick<State, keyof State>);
        }
    }

    async handleSubmit(event: any) {
        event.preventDefault();
        ShowLoader();
        const val = (document.getElementById("picture") as HTMLInputElement)
        const result = await this.postService.postPost(this.state, val?.files);
        if (result.status !== 201) {
            ErrorAlert(result?.response?.data).then();
        } else {
            CloseLoader();
            redirection(this.props, '/trackersFeed');

        }
    }

    onSelectCountry(country_code: string) {
        this.setState({ country: country_code } as Pick<State, keyof State>);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Enter your title
                    <input
                        id='title'
                        type='text'
                        name='title'
                        placeholder='Enter your title'
                        onChange={this.myChangeHandler} />
                    {displayArray(this.errors.get('title'))}
                </label><br></br>
                <label>Enter your description
                    <input
                        id='description'
                        type='text'
                        name='description'
                        placeholder='Enter your description'
                        onChange={this.myChangeHandler} />
                    {displayArray(this.errors.get('description'))}
                </label><br></br>
                <label>Enter the shooting date:
                    <input
                        id='shooting_date'
                        type='date'
                        name='shooting_date'
                        onChange={this.myChangeHandler} />
                </label><br></br>
                <label>Enter the location:
                    <input
                        id='location'
                        type='text'
                        name='location'
                        placeholder='Enter your location'
                        onChange={this.myChangeHandler} />
                </label><br></br>
                <label>Enter the hashtag:
                    <input
                        id='hashtag'
                        type='text'
                        name='hashtag'
                        placeholder='Enter your hashtag'
                        value={this.state.hashtag}
                        onKeyDown={this.myChangeHandler}
                        onChange={this.myChangeHandler} />
                </label><br></br>
                {displayArray(this.state.hashtags)}
                <div style={{ width: 25 + '%' }}>
                    <ReactFlagsSelect
                        searchable={true}
                        defaultCountry="FR"
                        searchPlaceholder="Search for a country"
                        onSelect={this.onSelectCountry}
                        placeholder="Select your actual country"
                        className="flag-select" />
                </div>
                <input type="file" id="picture" name="picture" onChange={this.myChangeHandler} />
                <input id="submit"
                    type="submit" value="Submit" />
            </form>
        );
    }
}
export default PostPostForm;
