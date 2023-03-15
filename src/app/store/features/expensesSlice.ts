import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ExpenseForm from "../../components/ExpenseForm";
import { Expense } from "../../models/expenses.models";

export interface ExpensesState {
    expenses: Expense[];
};

const initialState: ExpensesState = {
    expenses: []
};

const expensesSlice = createSlice({
    name: "expenses",
    initialState: initialState,
    reducers: {
        setExpenses: (state: ExpensesState, action: PayloadAction<Expense[]>) => {
            state.expenses = action.payload;
        },
        newExpense: (state: ExpensesState, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload);
        },
        editExpense: (state: ExpensesState, action: PayloadAction<Expense>) => {
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
    }
});

export const { setExpenses, newExpense, editExpense, deleteExpense } = expensesSlice.actions;

export default expensesSlice.reducer;


