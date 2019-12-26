import axios from 'axios';
import { headersWithAuthorization } from './headers';

class ResearchService {

    private url_api: string;

    constructor() {
        if (process.env.REACT_APP_API_URI) {
            this.url_api = process.env.REACT_APP_API_URI + "research";
        } else {
            throw new ReferenceError("REACT_APP_API_URI not find");
        }
    }

    async getResearch(research: string) {
        try {
            return await axios.get(this.url_api, {
                params: {
                    research: research,
                }, headers: headersWithAuthorization
            })
        } catch (error) {
            return error;
        }
    }

}
export default ResearchService;