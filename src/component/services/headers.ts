import { getCookie } from "../cookies";

export var headersWithoutAuthorization = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
}

export var headersWithAuthorization = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': getCookie('authorization')
}