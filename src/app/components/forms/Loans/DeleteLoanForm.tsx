import { Button, Form, Modal, ModalBody } from "react-bootstrap";
import { IExpense } from "../../../models/expenses.models";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { deleteExepnseAsync } from "../../../store/features/expensesSlice";

interface IDeleteExpenseFormProps {
    show: boolean;
    handleClose: () => void;
    expense: IExpense;
}

const DeleteLoanForm = ({ show, handleClose, expense }: IDeleteExpenseFormProps) => {
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector(state => state.expenses);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(deleteExepnseAsync({expenseId: expense.id!})).unwrap().then(
            res => {
                window.location.reload();
            }
        );
    };


    return <>
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want delete this loan?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        You are going to delete - {expense.name}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{
                        margin: "0.3rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%"
                    }}>
                        <Button type={"submit"} disabled={loading} variant="primary">Delete</Button>
                        <Button type={"button"} onClick={handleClose} variant="danger">Cancel</Button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
};

export default DeleteLoanForm;