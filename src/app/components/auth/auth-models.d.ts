export interface claim{
    name: string;
    value: string;
};

export interface userCredentionals{
    email:string;
    password: string;
};

export interface authenticationResponse{
    token: string;
    expiration: Date;
}

export interface userDTO{
    id: string;
    email:string;
};