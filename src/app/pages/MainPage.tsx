import ExpenseForm from "../components/ExpenseForm";
import ExpesnesList from "../components/ExpensesList";

const MainPage = () => {
    return <>
        <h3>New expense 3</h3>
        <ExpenseForm />
        <hr></hr>
        <h3>Your expenses</h3>
        <ExpesnesList />
    </>
};

export default MainPage;