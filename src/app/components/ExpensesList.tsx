import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { Expense } from "../models/expenses.models";
import { getExpenses } from "../services/expenses";
import { useAppDispatch, useAppSelector } from "../store/store";
import ExpenseForm from "./ExpenseForm";
import Timer from "./Timer";

const ExpesnesList = () => {
    const dispatch = useAppDispatch();
    const expenses = useAppSelector(state => state.expenses.expenses);

    useEffect(() => {
        getExpenses(dispatch);
    }, []);

    return <>
        {expenses.map(e => {
            return <div key={e.id} style={{ marginBottom: "1rem" }}>
                <ListRow expense={e} />
            </div>
        })}
    </>
};

const ListRow = ({ expense }: { expense: Expense }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    console.log("EXPENSE DATE", expense.endDate);

    return isEditing ? <ExpenseForm expense={expense} setIsEditing={setIsEditing}></ExpenseForm> : <div>
        <Row>
            <Col>{expense.description}</Col>
            <Col>${expense.amount}</Col>
            <Col><Timer targetDate={expense.endDate}/></Col>
            <Button style={{ width: "auto" }} variant="warning" onClick={() => setIsEditing(!isEditing)}>Edit</Button>
        </Row>
        <hr></hr>
    </div>
};

export default ExpesnesList;