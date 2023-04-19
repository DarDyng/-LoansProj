import { useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpesnesList from "../components/ExpensesList";
import axios from "axios";
import { getLoansUrl } from "../utils/endpoints";

const MainPage = () => {
    return <>
        <h3>New expense 3</h3>
        <ExpenseForm />
        <button onClick={async () => {
            await axios.get(getLoansUrl);
        }}>Get loans</button>
        <hr></hr>
        <h3>Your expenses</h3>
        <ExpesnesList />
    </>
};

export default MainPage;