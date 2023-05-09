import { useForm } from "react-hook-form";
import { Col, Form, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { IEditExpenseRequest, IExpense } from "../../../models/expenses.models";
import { format, formatISO } from "date-fns";
import { useAppDispatch } from "../../../store/store";
import { editExpense, editExpenseAsync } from "../../../store/features/expensesSlice";
import { date } from "yup";

interface IEditExpenseFormProps {
  expense: IExpense;
  show: boolean;
  handleClose: () => void;
}

const EditExpenseForm = ({ expense, show, handleClose }: IEditExpenseFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IEditExpenseRequest>({
    defaultValues: {
      ...expense,
      startDate: dateToInputDate(new Date(expense.startDate)),
      endDate: dateToInputDate(new Date(expense.endDate))
    }
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: IEditExpenseRequest) => {
    
    dispatch(editExpenseAsync(data)).unwrap().then(
      res => {
        window.location.reload();
      }, 
      rej => {
        
      }
    );
    

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" {...register("name", { required: true })} />
                {errors.name && <Form.Text className="text-danger">Name is required</Form.Text>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" {...register("startDate")} />

                {errors.startDate && <Form.Text className="text-danger">Start Date is required</Form.Text>}
              </Form.Group>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" {...register("endDate")}/>

                {errors.endDate && <Form.Text className="text-danger">End Date is required</Form.Text>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Sum of Loan</Form.Label>
                <Form.Control type="number" step="0.01" {...register("sumOfLoan", { required: true })} />
                {errors.sumOfLoan && <Form.Text className="text-danger">Sum of Loan is required</Form.Text>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Percents in Year</Form.Label>
                <Form.Control type="number" step="0.01" {...register("percentsInYear", { required: true })} />
                {errors.percentsInYear && <Form.Text className="text-danger">Percents in Year is required</Form.Text>}
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">Save</Button>
          <Button variant="danger" onClick={handleClose} type="button">Cancel</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

function isValidDate(date: Date) {
  return !isNaN(date.getTime());
}

/**
 * Create a date YYYY-MM-DD date string that is typecasted as a `Date`.
 * Hack when using `defaultValues` in `react-hook-form`
 * This is because `react-hook-form` doesn't support `defaultValue` of type `Date` even if the types say so
 */
export function dateToInputDate(date?: Date) {
  if (!date || !isValidDate(date)) {
    return undefined;
  }
  return date.toJSON().slice(0, 10) as unknown as Date;
}

export default EditExpenseForm;

