export function displayMap(map: Map<any, any> | undefined) {

    let display: any;
    if (map) {
        for (let value of map.values()) {
            display += value;
        }
    }
    return display;

}

export function displayArray(array: any[] | undefined) {
    let display: any;
    if (array) {
        for (let value of array.values()) {
            display += value;
        }
    }
    return display;
}

export function redirection(props: any, route: string) {
    const test: any = props
    const { history } = test
    history.push(route);
}
