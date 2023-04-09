export interface IRegisterRequest{
    Username: string;
    Email:string;
    Password:string;
};

export interface ILoginRequest{
    Email:string;
    Password:string;
};

export interface IGoogleRequest{
    IdToken: string;
};

export interface IAuthenticatedUserResponse{
    token: string;
    expiration: Date;
};

export interface IUser{
    roles: IRole[];
    email: string;
    userName: string;
};

export interface IClaim{
    name: string;
    value: string;
}

export interface IRole{
    role: "Admin" | "User" | "Artist";
};