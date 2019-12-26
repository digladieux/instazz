import Cookies from 'universal-cookie';

export function setCookie(key: string, value: string): void {
    const cookies = new Cookies();
    cookies.set(key, value, { path: '/' });
}

export function getCookie(key: string): string {
    const cookies = new Cookies();
    return cookies.get(key);
}

export function removeCookie(key: string): void {
    const cookies = new Cookies();
    cookies.remove(key);
}