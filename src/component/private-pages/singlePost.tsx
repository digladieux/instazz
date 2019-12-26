import React from 'react';
import { ShowLoader, ErrorAlert, CloseLoader } from '../alert';
import { redirection } from '../globalFunctions';
import PostService from '../services/postService';
type State = { post: any };
type Props = { id: string }
class SinglePost extends React.Component<Props, State> {

    private _post_service: PostService = new PostService()
    constructor(props: any) {
        super(props);
        this.state = { post: null }
        if (!props.id) {
            ErrorAlert("Id Required").then(() => {
                redirection(this.props, '/trackersFeed');
            })
        }
    }

    async componentDidMount() {

        ShowLoader();
        const result = await this._post_service.getPostById(this.props.id);
        if (result.status === 200) {
            ErrorAlert(result.response.data).then(() => {
                redirection(this.props, '/trackersFeed');
            })
        } else {
            CloseLoader();
            redirection(this.props, '/login');
        }
    }

    render() {

        return (
            <div>
            </div>
        );
    }
}

export default SinglePost;