import StatisticModel from "./statisticModel";

class CommentModel {
    private _id: string;
    private _description: string;
    private _statistic: StatisticModel;
    private _id_globe_trotter: string;
    private _publication_date: Date;
    private _id_post: string;


    constructor(data: any) {
        this._id = data.id;
        this._description = data.description;
        this._statistic = data.statistic;
        this._id_globe_trotter = data.id_globe_trotter;
        this._publication_date = data.publication_date;
        this._id_post = data.id_post;
    }

    id(): string {
        return this._id;
    }

    id_post(): string {
        return this._id_post;
    }

    description(): string {
        return this._description;
    }

    id_globe_trotter(): string {
        return this._id_globe_trotter;
    }

    publication_date(): Date {
        return this._publication_date;
    }

    statistic(): StatisticModel {
        return this._statistic;
    }
}

export default CommentModel;