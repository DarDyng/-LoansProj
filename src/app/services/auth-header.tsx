import axios from "axios";
import { IAuthenticatedUserResponse } from "../models/auth.models";
import authService from "./auth-service";

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user")!) as IAuthenticatedUserResponse;

    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    else {
        return {};
    }

}

export function configureAuthHeaders() {
    axios.interceptors.request.use(
        async function (config) {
            const token = authService.getToken();
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },

        function (error) {
            return Promise.reject(error);
        }
    )
};
