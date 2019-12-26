import axios from 'axios';
import { headersWithoutAuthorization, headersWithAuthorization } from '../headers';

class LocalAuthenticationService {

    private url_api: string;

    constructor() {
        if (process.env.REACT_APP_API_URI) {
            this.url_api = process.env.REACT_APP_API_URI + "authentication/";
        } else {
            throw new ReferenceError("REACT_APP_API_URI not find");
        }
    }

    async postGlobeTrotter(data: any) {
        try {
            return await axios.post(this.url_api + "globeTrotter", {
                username: data.username,
                password: data.password,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                birth_date: data.birth_date,
                biography: data.biography,
                country: data.country
            })
        } catch (error) {
            return error;
        }
    }

    async loginByCredentials(username: string, password: string) {
        try {
            return await axios.get(this.url_api + "/loginByCredentials", {
                headers: headersWithoutAuthorization,
                params: {
                    username: username,
                    password: password
                }
            });
        } catch (error) {
            return error;
        }
    }

    async loginByToken(token: string) {
        try {
            return await axios.get(this.url_api + "/loginByToken", {
                headers: headersWithoutAuthorization,
                params: {
                    token: token,
                }
            });
        } catch (error) {
            return error;
        }
    }

    async resetPassword(email: string) {
        try {
            return await axios.get(this.url_api + "/resetPassword", {
                headers: headersWithAuthorization,
                params: {
                    email: email,
                }
            });
        } catch (error) {
            return error;
        }
    }

    async putPassword(old_password: string, new_password: string) {
        try {
            return await axios.get(this.url_api + "/putPassword", {
                headers: headersWithAuthorization,
                params: {
                    old_password: old_password,
                    new_password: new_password,
                }
            });
        } catch (error) {
            return error;
        }
    }

    async confirmationEmail(token: string) {
        try {
            return await axios.post(this.url_api,
                {
                    token: token,
                }, {
                headers: headersWithoutAuthorization,
            });
        } catch (error) {
            return error;
        }
    }
}

export default LocalAuthenticationService;