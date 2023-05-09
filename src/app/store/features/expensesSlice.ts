import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEditExpenseRequest, IExpense, IExpenseCreateRequest, IExpenseCreateResponse } from "../../models/expenses.models";
import axios, { AxiosError } from "axios";
import { createLoansUrl, getLoansUrl, updateLoansUrl } from "../../utils/endpoints";
import { Thunk } from "yup";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

export interface ExpensesState {
    expenses: IExpense[];
    loading: boolean;
};

const initialState: ExpensesState = {
    expenses: [],
    loading: false
};


export const fetchExpenses = createAsyncThunk<IExpense[], undefined, {rejectValue: string}>(
    "expenses/fetchExpenses",
    async (_,thunkApi) => {
        try {
            return (await axios.get(getLoansUrl)).data;
        } catch (error) {
            return thunkApi.rejectWithValue("Error occured while fetching your expenses");
        }
    }
);

export const createExpense = createAsyncThunk<IExpenseCreateResponse, IExpenseCreateRequest, {rejectValue: string}>(
    "expenses/createExpense",
    async (expense, thunkApi) => {
        try {
            const res = await axios.post(createLoansUrl, expense);
            return res.data;
        } catch (error: any | AxiosError) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                return thunkApi.rejectWithValue(error.response?.data);
            }
            return thunkApi.rejectWithValue("Something went wrong");
        }
    }
)

export const editExpenseAsync = createAsyncThunk<IExpense, IEditExpenseRequest, {rejectValue: string}>(
    "expenses/editExpenseAsync",
    async (expense, thunkApi) => {
        try {
            const res = await axios.put(updateLoansUrl+expense.id, expense);
            return res.data;
        } catch (error: any | AxiosError) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                return thunkApi.rejectWithValue(error.response?.data);
            }
            return thunkApi.rejectWithValue("Something went wrong");
            
        }
    }
)

export const deleteExepnseAsync = createAsyncThunk<IExpense, {expenseId: string}, {rejectValue: string}>(
    "expenses/deleteExepnseAsync",
    async (expenseId,  thunkApi) => {
        try {
            const res = await axios.delete(updateLoansUrl+expenseId.expenseId);
            return res.data;
        } catch (error: any | AxiosError) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                return thunkApi.rejectWithValue(error.response?.data);
            }
            return thunkApi.rejectWithValue("Something went wrong");
        }
    }    
)

const expensesSlice = createSlice({
    name: "expenses",
    initialState: initialState,
    reducers: {
        setExpenses: (state: ExpensesState, action: PayloadAction<IExpense[]>) => {
            state.expenses = action.payload;
        },
        newExpense: (state: ExpensesState, action: PayloadAction<IExpense>) => {
            state.expenses.push(action.payload);
        },
        editExpense: (state: ExpensesState, action: PayloadAction<IExpense>) => {
            const updatedExpenses = state.expenses.map(expense => {
                if (expense.id === action.payload.id) {
                  return action.payload;
                }
                return expense;
              });
            
              return {
                ...state,
                expenses: updatedExpenses
              };
        },
        deleteExpense: (state: ExpensesState, action: PayloadAction<{id: string}>) => {
            state.expenses = state.expenses.filter(x => x.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExpenses.fulfilled, (state, action) => {
            console.log("Fetched expenses");
            console.log(action.payload);
            state.expenses = action.payload;
            state.loading = false;
        })
        .addCase(fetchExpenses.rejected, (state, action) => {
            console.log("Expenses rejected");
            console.log(`Error occured - message: ${action.error.message}`);
            state.loading = false;
        }).addCase(fetchExpenses.pending, (state, action) => {
            console.log("Expenses loading");
            state.loading = true;
        }).addCase(editExpenseAsync.fulfilled, (state, action) => {
            let index = state.expenses.findIndex(x => x.id == action.payload.id);
            if (index > -1) {
                state.expenses[index] = action.payload;
            }
            state.loading = false;
        }).addCase(editExpenseAsync.rejected, (state, action) => {
            state.loading = false;
        }).addCase(editExpenseAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(deleteExepnseAsync.fulfilled, (state, action) => {
            let itemToDeleteIndex = state.expenses.findIndex(x => x.id == action.payload.id);
            if (itemToDeleteIndex > -1) {
                state.expenses[itemToDeleteIndex] = action.payload;
            }
            state.loading = false;
        }).addCase(deleteExepnseAsync.pending,  (state, action) => {
            state.loading = false;
        })
        .addCase(deleteExepnseAsync.rejected, (state, action) => {
            state.loading = false;
        });
    }
});

export const { setExpenses, newExpense, editExpense, deleteExpense } = expensesSlice.actions;

export default expensesSlice.reducer;


