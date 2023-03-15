import { Dispatch } from "@reduxjs/toolkit";
import { Expense } from "../models/expenses.models";
import { deleteExpense, editExpense, newExpense, setExpenses } from "../store/features/expensesSlice";

export const getExpenses = async (dispatch: Dispatch) => {
    try {
        // use async thunks

        // api call
        
        const expenses: Expense[] = [
            {id: "1", description: "Groceries", amount: 23.16, endDate: new Date(Date.now())},
            {id: "2", description: "Gasa", amount: 3.16, endDate: new Date(Date.now() + (10*24*60*60*1000))},
        ];

        dispatch(setExpenses(expenses)); 
    } catch {
        console.log("Error!");
    }
};

export const NewExpense = async (dispatch: Dispatch, expense: Expense) => {
    try{
        // api call
        dispatch(newExpense(expense));
    }catch{
        console.log("Error!");
    }
};

export const EditExpense = async (dispatch: Dispatch, expense: Expense) => {
    try{
        // api call
        dispatch(editExpense(expense));
    }catch{
        console.log("Error");
    }
};

export const DeleteExpense = async (dispatch: Dispatch, id: string) => {
    try{
        // api call
        dispatch(deleteExpense({id: id}));
    }catch{
        console.log("Error");
    }
};