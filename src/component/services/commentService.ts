import axios from 'axios';
import { headersWithAuthorization } from './headers';

class CommentService {

    private url_api: string;

    constructor() {
        if (process.env.API_URL) {
            this.url_api = process.env.API_URL;
        } else {
            throw "API_URL not find";
        }
    }
    async getComments(comment: any) {
        try {
            return await axios.get(this.url_api, {
                params: {
                    id_post: comment.id_post,
                    page_number: comment.page_number,
                    page_size: comment.page_size
                }, headers: headersWithAuthorization
            })
        } catch (error) {
            return error;
        }
    }

    async postComment(data: any) {
        try {
            return await axios.post(this.url_api, {
                id_globe_trotter: data.id_globe_trotter,
                id_post: data.id_post,
                description: data.description,
            }, {
                headers: headersWithAuthorization
            })
        } catch (error) {
            return error;
        }
    }

    async postLike(data: any) {
        try {
            return await axios.post(this.url_api + "/postLike", {
                id_comment: data.id_comment,
                id_post: data.id_post,
            }, {
                headers: headersWithAuthorization
            })
        } catch (error) {
            return error;
        }
    }

    async deleteComment(id_comment: string) {

        try {
            await axios.delete(this.url_api, {
                params: {
                    id: id_comment
                }, headers: headersWithAuthorization
            })
        } catch (error) {
            return error;
        }

    }
}

export default CommentService;