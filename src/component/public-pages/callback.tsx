import React from 'react';
import queryString from 'query-string';
import LinkedInAuthenticationService from "../services/authentication/linkedInAuthenticationService";
import LocalAuthenticationService from '../services/authentication/localAuthenticationService';

enum Context {
    linkedin = "linkedin",
    confirmedEmail = "confirmedEmail"
}



class Callback extends React.Component {

    private linkedinAuthenticationService: LinkedInAuthenticationService = new LinkedInAuthenticationService();
    private localAuthenticationService: LocalAuthenticationService = new LocalAuthenticationService();
    constructor(props: any) {
        super(props);
        const url: string = props.location?.search;
        const params: any = queryString.parse(url);
        if (!params.context) {
            this.redirectionWithMessage("/", "CONTEXT Parameter missing")
        }

        else {

            switch (params.context) {
                case Context.confirmedEmail:
                    if (!params.token) {
                        this.redirectionWithMessage("/", "CONTEXT Parameter missing")
                    }
                    this.localAuthenticationService.confirmationEmail(params.token)
                    break;
                default:
                    this.redirectionWithMessage("/", "CONTEXT Parameter invalid")
            }
        }
    }

    private redirectionWithMessage(path: string, message: string) {
        window.location.replace(path);
        console.error(message);
    }

    // getTokenFromLinkedIn(params: any) {
    //     this.linkedinAuthenticationService.getTokenFromLinkedIn(params);
    // }

    render() {

        return (
            <div>
            </div>
        );
    }
}

export default Callback;