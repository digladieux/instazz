import React from 'react';
import PostPostForm from '../form/postPostForm';
type state = { picture: any, error: string };
class PostPost extends React.Component<{}, state>  {

    constructor(props: any) {
        super(props);
        this.state = {
            picture: '',
            error: ''
        }
    }

    render() {
        return (
            <div>
                <PostPostForm {...this.props} />
            </div>

        );
    }
}


export default PostPost;