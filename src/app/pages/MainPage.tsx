import { useEffect, useState } from 'react';
import ExpensesList from '../components/ExpensesList';
import axios from 'axios';
import { getLoansUrl } from '../utils/endpoints';
import { IExpense, IExpenseCreateRequest } from '../models/expenses.models';
import Popup from '../components/ui/Popup/Popup';
import CreateLoanForm from '../components/forms/Loans/CreateLoanForm';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../store/store';
import { fetchCategories } from '../store/features/expensesSlice';

const MainPage = () => {
    const [expenseToEdit, setExpenseToEdit] = useState<IExpense | undefined>(undefined);

    const dispatch = useAppDispatch();

    const handleSubmit = async (data: IExpenseCreateRequest) => {
        // Handle create or update logic here
        console.log(data);
    };
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return (
        <>
            <div style={{textAlign: "center", margin: "1rem"}}>
                <Button onClick={() => setShowModal(!showModal)}>Add expense</Button>
            </div>
            <CreateLoanForm show={showModal} handleClose={() => setShowModal(false)} />
            <hr />
            <h3 style={{textAlign: "center"}}>Your loans</h3>
            <ExpensesList />
        </>
    );
};

export default MainPage;