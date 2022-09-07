export interface IStore  {
    check: boolean;
    load: boolean;
    user: string;
    type: string;
    error: null | string;
    token: string | null;
}

export interface IData {

    user: string;
    access: string;
    type: string;

}