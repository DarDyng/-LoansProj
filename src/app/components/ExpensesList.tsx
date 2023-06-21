import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { IExpense } from "../models/expenses.models";
import { useAppDispatch, useAppSelector } from "../store/store";
import Timer from "./Timer";
import { fetchExpenses } from "../store/features/expensesSlice";
import Popup from "./ui/Popup/Popup";
import EditExpenseForm from "./forms/Loans/EditExpenseForm";
import LoadingSpinner from "./ui/LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router-dom";
import DeleteLoanForm from "./forms/Loans/DeleteLoanForm";

const ExpensesList = () => {
    const dispatch = useAppDispatch();
    const { expenses, loading } = useAppSelector(state => state.expenses);
    const { isLoggedIn } = useAppSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchExpenses());
    }, []);

    return <>
        {isLoggedIn ? <>
            {loading == true && expenses.length < 1 && <>
                <div style={{ paddingTop: "20%" }}>
                    <LoadingSpinner />
                </div>
            </>}
            {loading == false && expenses.length < 1 && <>
                <h2 style={{ margin: "2rem", textAlign: "center" }}>There is no expenses yet.</h2>
            </>}
            {expenses.map(e => {
                return <div key={e.id} style={{ marginBottom: "1rem" }}>
                    <ListRow expense={e} />
                </div>
            })}
        </> : <></>}
    </>
};


const ListRow = ({ expense }: { expense: IExpense }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    console.log("Expense object for now - ", expense);
  
    const handleClose = () => {
        setIsEditing(false);
    };

    const handleCloseDelete = () => {
        setIsDeleting(false);
    };
  
    return (
      <div>
        <Row>
          <div
            style={{
                backgroundColor: isEditing || isDeleting ? "" : "",
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem",
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
                borderTopRightRadius: "15px",
                borderBottomRightRadius: "15px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#708090";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "";

            }}
          >
            <div
              style={{
                backgroundColor: isEditing || isDeleting ? "" : "#DCDCDC",
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <Col>{expense.name}</Col>
              <Col>${expense.sumOfLoan}</Col>
              <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button style={{ width: "auto" }} variant="warning" onClick={() => setIsEditing(!isEditing)}>Edit</Button>
                    <Button style={{ width: "auto" }} variant="danger" onClick={() => setIsDeleting(!isDeleting)}>Delete</Button>
              </div>
            </div>
          </div>
          <DeleteLoanForm expense={expense} show={isDeleting} handleClose={handleCloseDelete}/>
          <EditExpenseForm expense={expense} show={isEditing} handleClose={handleClose} />
        </Row>
        <hr></hr>
      </div>
    );
  };
  

export default ExpensesList;