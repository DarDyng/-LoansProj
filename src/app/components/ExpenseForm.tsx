import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Expense } from "../models/expenses.models";
import { DeleteExpense, EditExpense, NewExpense } from "../services/expenses";
import { useAppDispatch } from "../store/store";

const ExpenseForm = ({ expense, setIsEditing }: { expense?: Expense, setIsEditing?: (isEditing: boolean) => void }) => {
    const descriptions = ["Groceries", "Credit Card", "Student Loans", "Eating out", "Gas"];

    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [endDate, setEndDate] = useState<Date>(new Date(new Date().getTime() + (70 * 24 * 60 * 60 * 1000)));
    const [isNewExpense, setIsNewExpense] = useState(true);

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("Date changed");
        console.log(endDate);
    }, [endDate]);

    useEffect(() => {
        if (expense) {
            setIsNewExpense(false);
            setAmount(expense.amount);
        }
        else {
            console.log("EXPENSE", expense)
            setIsNewExpense(true);
        }
    }, [expense])

    return <Form onSubmit={e => {
        e.preventDefault();
        if (isNewExpense) {
            NewExpense(dispatch, { id: nanoid(), description: description, amount: amount, endDate: endDate });
        }
        else {
            setIsEditing!(false);
            EditExpense(dispatch, { id: expense?.id, description: description, amount: amount, endDate });
        }
    }}>
        <Row>
            <Col>
                <Form.Label>Description</Form.Label>
                <Form.Control as={'select'}
                    onChange={e => {
                        console.log(e.target.value);
                        setDescription(e.target.value)
                    }}>
                    {descriptions.map(d => <option value={d} key={d}>{d}</option>)}
                </Form.Control>
            </Col>
            <Col>
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" step={"0.01"}
                    placeholder={amount.toString()}
                    onChange={e => setAmount(+e.target.value)}></Form.Control>
            </Col>
            <Col>
                <Form.Label>End date</Form.Label>
                <Form.Control as={"input"} type={"date"} onChange={e => setEndDate(new Date(e.target.value))}/>
            </Col>
            <Col style={{ marginTop: "auto" }}>
                {isNewExpense
                    ?
                    <Button variant="primary" type="submit">Add</Button>
                    :
                    <div>
                        <Button onClick={() => DeleteExpense(dispatch, expense!.id!)}
                            style={{ marginRight: "2px" }} variant="danger" >Delete</Button>
                        <Button style={{ marginRight: "2px" }} variant="success" type="submit">Save</Button>

                        <Button variant="default" onClick={() => setIsEditing!(false)} >Cancel</Button>
                    </div>
                }
            </Col>
        </Row>
    </Form>
};

export default ExpenseForm;