import React from 'react';
import PostModel from '../models/postModel';
import PostService from '../services/postService';
import { ShowLoader, CloseLoader } from '../alert';
type state = {
    page_number: number,
    page_size: number,
    posts: PostModel[]
};
class TrackersFeed extends React.Component<{}, state>  {

    private _post_service: PostService = new PostService();
    constructor(props: any) {
        super(props);
        this.state = {
            page_number: 0,
            page_size: 5,
            posts: []
        }
        this.incrementPageNumber = this.incrementPageNumber.bind(this);
        this.handleScroll = this.handleScroll.bind(this);


    }

    async componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);

    }

    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        await this.getPosts();
    }


    async handleScroll() {
        if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.scrollHeight) {
            this.incrementPageNumber();
        }
    }

    async getPosts() {
        ShowLoader();
        const result = await this._post_service.getPostsBySize(this.state.page_number, this.state.page_size);
        if (result.status === 200) {
            const posts = this.state.posts;
            result.data.forEach(post => {
                posts.push(post);
            });
            this.setState({ posts: posts });

        }
        CloseLoader();
    }


    displayPostTrackersFeed(post: PostModel) {
        return <div>
            <li>Title : {post.title}</li>
            <li>Country : {post.country}</li>
            <li>Id : {post.id}</li>
            <li>Date de Publication : {post.publication_date}</li><br />
        </div>;
    }

    PostList() {
        const listPost = this.state.posts.map((post) =>
            this.displayPostTrackersFeed(post));
        return (
            <ul>
                {listPost}
            </ul>
        );
    }

    incrementPageNumber() {
        this.setState({ page_number: this.state.page_number + 1 });
        this.getPosts();
    }

    render() {
        return (
            <div>
                {this.PostList()}
                <button type="button" onClick={this.incrementPageNumber}>See More post</button>

            </div>

        );
    }
}


export default TrackersFeed;