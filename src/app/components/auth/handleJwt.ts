import { authenticationResponse, claim } from "./auth-models";

const tokenKey = "token";
const expirationKey = "token-expiration";

export function saveToken(authData: authenticationResponse){
    localStorage.setItem(tokenKey, authData.token);
    localStorage.setItem(expirationKey, authData.expiration.toString());
};

export function logout(){
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(expirationKey);
};

export function getToken(){
    return localStorage.getItem(tokenKey);
}