export interface IStore  {
    user: string;
    type: string;
    load: boolean;
    check: boolean;
    token: string | null;
    error: null | string;
    userError: null | string;
    adminError: null | string;
}

export interface IData {
    user: string;
    access: string;
    type: string;
    message: string | null;
}

export interface IUserData {
    password: string;
    email: string;
}

export interface IAdminData {
    password: string;
    surname: string;
    name: string;
}