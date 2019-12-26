import PostModel from "./postModel";
import Statistic from "./statisticModel";

class GlobeTrotterModel {
    private _id: string;
    private _username: string;
    private _email: string;
    private _first_name: string;
    private _last_name: string;
    private _birth_date: string;
    private _biography: string;
    private _trackers: Array<string>;
    private _country_localisation: string;
    private _posts: Array<PostModel>;
    private _statistic_followers: Statistic;
    private _statistic_followed: Statistic;

    constructor(data: any) {
        this._id = data?.id;
        this._username = data?.username;
        this._email = data?.email;
        this._first_name = data?.first_name;
        this._last_name = data?.last_name;
        this._birth_date = data?.age;
        this._biography = data?.biography;
        this._trackers = data?.trackers;
        this._country_localisation = data?.country_localisation;
        this._posts = data?.posts;
        this._statistic_followers = data?.statistic_followes;
        this._statistic_followed = data?.statistic_followed;
    }

    id(): string {
        return this._id;
    }

    username(): string {
        return this._username;
    }

    email(): string {
        return this._email;
    }

    first_name(): string {
        return this._first_name;
    }

    last_name(): string {
        return this._last_name;
    }

    birth_date(): string {
        return this._birth_date;
    }

    biography(): string {
        return this._biography;
    }


    trackers(): Array<string> {
        return this._trackers;
    }

    country_localisation(): string {
        return this._country_localisation;
    }

    posts(): Array<PostModel> {
        return this._posts;
    }

    statistic_followes(): Statistic {
        return this._statistic_followers;
    }

    statistic_followed(): Statistic {
        return this._statistic_followed;
    }
}

export default GlobeTrotterModel