import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthenticatedUserResponse, IGoogleRequest, ILoginRequest, IRegisterRequest, IRole } from "../../models/auth.models";
import axios from "axios";
import { googleUrl, loginUrl, registerUrl } from "../../utils/enpoints";
import authService from "../../services/auth-service";

export interface IUserInfo {
    roles: IRole[],
    email: string;
}

export interface IAuthSliceState {
    isLoggedIn: boolean;
    loading: boolean;
    user: IAuthenticatedUserResponse | null,
    error: string | undefined;
    userInfo: IUserInfo | null;
};

const user = JSON.parse(localStorage.getItem("user")!) as IAuthenticatedUserResponse;

const initialState: IAuthSliceState = user ? {
    isLoggedIn: true,
    user: user,
    error: undefined,
    loading: false,
    userInfo: null,
} : { isLoggedIn: false, user: null, error: undefined, loading: false, userInfo: null };


export const login = createAsyncThunk<IAuthenticatedUserResponse, ILoginRequest, { rejectValue: string }>(
    "auth/login",
    async (login, thunkAPI) => {
        try {
            const response = await axios.post(loginUrl, login);

            return response.data;
        } catch (error) {
           return thunkAPI.rejectWithValue("Failed login");
        }
    }
);

export const register = createAsyncThunk<unknown, IRegisterRequest, { rejectValue: string }>(
    "auth/register",
    async (register, thunkAPI) => {
        try {
            await axios.post(registerUrl, register);
        } catch (error) {
            return thunkAPI.rejectWithValue("Register failed");
        }
    }
);

export const google = createAsyncThunk<IAuthenticatedUserResponse, IGoogleRequest, { rejectValue: string }>(
    "auth/google",
    async (googleRequest, thunkAPI) => {
        try {
            const resposne = await axios.post(googleUrl, googleRequest);

            return resposne.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Google auth failed!");
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            authService.logout();
            state.isLoggedIn = false;
            state.user = null;
            state.userInfo = null;
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        handleAuth: (state) => {
            console.log("Handling token");
            // check tokens exists local storage
            const token = authService.getToken()
            const expiration = authService.getExpirtion();
            if (token && expiration) {

                // handle expiration
                const expired = authService.handleExpiration(token, expiration);

                // token expired
                if (expired) {
                    authService.logout();
                    state.isLoggedIn = false;
                    state.user = null;
                    state.userInfo = null;
                    return;
                }

                const response = authService.getInfoFromJwt(token);

                if (!state.isLoggedIn) {
                    state.isLoggedIn = true;
                }
                state.userInfo = response;
                console.log("Handling auth", state.isLoggedIn, state.userInfo);
            }
            else {
                if (state.isLoggedIn) {
                    // logout user is there is no token
                    authService.logout();
                    state.isLoggedIn = false;
                    state.user = null;
                    state.userInfo = null;
                    return;
                }
            }


        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
        }).addCase(login.fulfilled, (state, action) => {
            console.log("Success login! ", action.payload);
            if (action.payload.token) {
                state.loading = false;
                state.isLoggedIn = true;
                state.error = undefined;
                state.user = action.payload;
                authService.setToken(action.payload);
                state.userInfo = authService.getInfoFromJwt(action.payload.token);
            }
        }).addCase(login.rejected, (state, action) => {
            console.log("REJECTED");
            state.error = action.payload;
            state.loading = false;
        }).addCase(register.pending, (state, action) => {
            state.loading = true;
        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.error = undefined;
            
        }).addCase(register.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
            .addCase(google.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(google.fulfilled, (state, action) => {
                console.log("Success login! ", action.payload);
                state.isLoggedIn = true;
                state.error = undefined;
                state.loading = false;
                authService.setToken(action.payload);
                state.userInfo = authService.getInfoFromJwt(action.payload.token);
            })
            .addCase(google.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const { logout, setIsLoggedIn, handleAuth } = authSlice.actions;

export default authSlice.reducer;