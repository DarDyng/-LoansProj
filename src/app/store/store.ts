import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import expensesSlice from "./features/expensesSlice";
import authSlice from "./features/authSlice";
import statisticSlice from "./features/statisticSlice";

const store = configureStore({
    reducer: {
        expenses: expensesSlice,
        auth: authSlice,
        statistic: statisticSlice,
    }
});

export default store;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;