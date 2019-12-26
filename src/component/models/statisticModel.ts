class StatisticModel {
    private _id: string;
    private _ids_globe_trotter: Array<string>;

    constructor(data: any) {
        this._id = data.id;
        this._ids_globe_trotter = data.ids_globe_trotter;
    }

    number_followers(): number {
        return this._ids_globe_trotter.length;
    }

    ids_globe_trotter(): Array<String> {
        return this._ids_globe_trotter;
    }

    id(): string {
        return this._id;
    }
}

export default StatisticModel;