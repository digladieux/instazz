import CommentModel from "./commentModel";
import Statistic from "./statisticModel";

class PostModel {
    private _id: string;
    private _title: string;
    private _description: string;
    private _publication_date: Date;
    private _shooting_date: Date;
    private _pictures: Array<string>;
    private _country: string;
    private _location: string;
    private _hashtags: Array<string>;
    private _comments: Array<CommentModel>;
    private _statistic: Statistic;

    constructor(data: any) {
        this._id = data._id;
        this._title = data.title;
        this._description = data.description;
        this._publication_date = data.publication_date;
        this._shooting_date = data.shooting_date;
        this._pictures = data.pictures;
        this._country = data.country;
        this._location = data.location;
        this._hashtags = data.hashtags;
        this._comments = data.comments;
        this._statistic = data.statistic;
    }

    id(): string {
        return this._id;
    }

    title(): string {
        return this._title;
    }

    comments(): Array<CommentModel> {
        return this._comments;
    }

    country(): string {
        return this._country;
    }

    description(): string {
        return this._description;
    }

    hashtags(): Array<string> {
        return this._hashtags;
    }

    location(): string {
        return this._location;
    }

    pictures(): Array<string> {
        return this._pictures;
    }

    publication_date(): Date {
        return this._publication_date;
    }

    shooting_date(): Date {
        return this._shooting_date;
    }

    statistic(): Statistic {
        return this._statistic;
    }
}
export default PostModel;