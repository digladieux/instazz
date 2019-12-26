import axios from 'axios';
import { headersWithAuthorization } from './headers';

class PostService {

    private url_api: string;

    constructor() {
        if (process.env.REACT_APP_API_URI) {
            this.url_api = process.env.REACT_APP_API_URI + "post";
        } else {
            throw new ReferenceError("REACT_APP_API_URI not find");
        }
    }

    async getPostById(id: string) {
        try {
            return await axios.get(this.url_api, {
                params: {
                    id: id,
                }, headers: headersWithAuthorization
            })
        } catch (error) {
            return error;
        }
    }

    async getPostsBySize(page_number: number, page_size: number) {
        try {
            return await axios.get(this.url_api + "/history", {
                params: {
                    page_number: page_number.toString(),
                    page_size: page_size.toString()
                },
                headers: headersWithAuthorization
            })
        } catch (error) {
            return error;
        }
    }

    async postPost(data: any, pictures: FileList | null) {
        if (pictures !== null && pictures.length > 0) {
            const formData = new FormData();
            formData.append("picture", pictures[0], pictures[0]?.name);
            formData.append("title", data.title)
            formData.append("country", data.country)
            formData.append("description", data.description)
            formData.append("country", data.country)
            formData.append("shooting_date", data.shooting_date)
            formData.append("hashtags", data.hashtags)
            formData.append("location", data.location)
            try {
                return await axios.post(this.url_api, formData, {
                    headers: headersWithAuthorization
                })
            } catch (error) {
                return error;
            }
        }

    }

    async postLike(data: any) {
        try {
            return await axios.post(this.url_api + "/postLike", {
                id_post: data.id_post,
            }, {
                headers: headersWithAuthorization
            })
        } catch (error) {
            return error;
        }
    }

    async deletePost(id_post: string) {
        try {
            await axios.delete(this.url_api, {
                params: {
                    id: id_post
                }, headers: headersWithAuthorization
            })
        } catch (error) {
            return error;
        }

    }
}

export default PostService;