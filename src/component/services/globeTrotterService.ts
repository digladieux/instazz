import axios from 'axios';
import { headersWithAuthorization } from './headers';
class GlobeTrotterService {

    private url_api: string;

    constructor() {
        if (process.env.REACT_APP_API_URI) {
            this.url_api = process.env.REACT_APP_API_URI + "globeTrotter";
        } else {
            throw new ReferenceError("REACT_APP_API_URI not find");
        }
    }

    async getGlobeTrotterById(id: string) {
        try {
            return await axios.get(this.url_api + '/:id', {
                headers: headersWithAuthorization,
                params: {
                    id: id
                }
            });
        } catch (error) {
            return error;
        }
    }

    async getMe() {
        try {
            return await axios.get(this.url_api + '/me', {
                headers: headersWithAuthorization,
            });
        } catch (error) {
            return error;
        }
    }

    async postLike(data: any) {
        try {
            return await axios.post(this.url_api + "/postLike", {
                id_globe_trotter: data.id_globe_trotter,
            }, {
                headers: headersWithAuthorization
            })
        } catch (error) {
            return error;
        }
    }


    async deleteGlobeTrotter() {
        try {
            await axios.delete(this.url_api, {
                params: {
                    id: 'id'
                }, headers: headersWithAuthorization
            })
        } catch (error) {
            return error;
        }
    }
}

export default GlobeTrotterService;