import * as dotenv from "dotenv";

dotenv.config();
let path: string;
switch (process.env.NODE_ENV) {
    case "test":
        path = `${__dirname}/../../.env.test`;
        break;
    case "production":
        path = `${__dirname}/../../.env.production`;
        break;
    default:
        path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: path });

export const REACT_APP_API_URI = process.env.REACT_APP_API_URI;
