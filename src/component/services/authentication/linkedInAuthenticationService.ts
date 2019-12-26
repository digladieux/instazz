import axios from 'axios';
const LINKEDIN_SCOPE: string = 'r_liteprofile r_emailaddress';
const LINKEDIN_REDIRECT: string = 'http://127.0.0.1:3000/callback?origin=linkedin';
const LINKEDIN_CLIENT_ID: string = '86wk11jt27rgpb';
const LINKEDIN_STATE: string = 'random_string';
const LINKEDIN_CLIENT_SECRET: string = 'uFJm3EXqFDp0jur2';
const LINKEDIN_ACCESS_TOKEN: string = 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id='
    + LINKEDIN_CLIENT_ID + '&client_secret='
    + LINKEDIN_CLIENT_SECRET + '&redirect_uri='
    + LINKEDIN_REDIRECT + '&code=';

// const LINKEDIN_EMAIL_URL: String =
// 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))';
const LINKEDIN_PROFILE_URL: string = 'https://api.linkedin.com/v2/me';
const LINKEDIN_AUTHORIZATION_CODE = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' + LINKEDIN_CLIENT_ID
    + '&redirect_uri=' + LINKEDIN_REDIRECT + '&state=' + LINKEDIN_STATE + '&scope=' + LINKEDIN_SCOPE;


class LinkedInAuthenticationService {

    signInWithLinkedIn() {
        window.location.replace(LINKEDIN_AUTHORIZATION_CODE);
    }

    getTokenFromLinkedIn(params: any) {
        if (LINKEDIN_STATE !== params.state) {
            throw new Error("Linkedin Authentication Error");
        }
        console.log(LINKEDIN_ACCESS_TOKEN + params.code);
        axios.get(LINKEDIN_ACCESS_TOKEN + params.code).then((data: any) => {
            console.log(data);
            this.getProfileInformation(data.access_token);
        });
        // .catch((error) => console.log(error));
    }

    getProfileInformation(access_token: string) {
        axios.get(LINKEDIN_PROFILE_URL, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then((data: any) => {
            console.log(data);
        });
    }
}

export default LinkedInAuthenticationService;