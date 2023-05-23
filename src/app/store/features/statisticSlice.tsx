import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEditExpenseRequest, IExpense, IExpenseCreateRequest, IExpenseCreateResponse } from "../../models/expenses.models";
import axios, { AxiosError } from "axios";
import { createLoansUrl, getLoansUrl, getStatistic, updateLoansUrl } from "../../utils/endpoints";
import { Thunk } from "yup";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { StatisticDTO } from "../../models/statistic.models";

export interface StatisticSliceState {
    statistic: StatisticDTO | null;
    loading: boolean;
};

const initialState: StatisticSliceState = {
    statistic: null,
    loading: false
};


export const fetchStatistic = createAsyncThunk<StatisticDTO, undefined, {rejectValue: string}>(
    "statistic/fetchStatistic",
    async (_,thunkApi) => {
        try {
            return (await axios.get(getStatistic)).data;
        } catch (error) {
            return thunkApi.rejectWithValue("Error occured while fetching your expenses");
        }
    }
);

const statisticFlice = createSlice({
    name: "statistic",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStatistic.fulfilled, (state, action) => {
            console.log("Fetched statistic");
            console.log(action.payload);
            state.statistic = action.payload;
            state.loading = false;
        })
        .addCase(fetchStatistic.rejected, (state, action) => {
            console.log("Expenses rejected");
            console.log(`Error occured - message: ${action.error.message}`);
            state.loading = false;
        }).addCase(fetchStatistic.pending, (state, action) => {
            console.log("Expenses loading");
            state.loading = true;
        });
    }
});

export const {} = statisticFlice.actions;

export default statisticFlice.reducer;


