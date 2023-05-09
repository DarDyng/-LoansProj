import { useForm } from "react-hook-form";
import { IExpenseCreateRequest } from "../../../models/expenses.models";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../../store/store";
import { createExpense } from "../../../store/features/expensesSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ICreateExpenseFormProps {
    show: boolean;
    handleClose: () => void;
}

const CreateLoanForm = ({ show, handleClose }: ICreateExpenseFormProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<IExpenseCreateRequest>({
        defaultValues: {
            sumOfLoan: 0
        }
    });

    const navigate = useNavigate();

    const [currentSumOfLoan, setCurrentSumOfLoan] = useState<number>(0);
    const [rangeValue, setRangeValue] = useState(0);

    const dispatch = useAppDispatch();

    const onSubmit = (values: IExpenseCreateRequest) => {
        console.log(values);
        dispatch(createExpense(values)).unwrap().then(
            res => {
                console.log("Success", res);
                window.location.reload();
            },
            err => {
                console.log("Error ", err);
            }
        )
    };

    const handleRangeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setValue("sumOfLoan", newValue);
        setCurrentSumOfLoan(newValue);
        setRangeValue(newValue);
    }

    return <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Loan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "1rem" }}>
                        <Form.Group controlId="expenseName">
                            <Form.Control placeholder='Name' type="text" {...register('name', { required: true })} />
                            {errors.name && <Form.Text className="text-danger">Name is required</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="expensePercentsInYear">
                            <Form.Control type="number" placeholder='% in Year' min={0} max={100} {...register('percentsInYear', { required: true })} />
                            {errors.percentsInYear && (
                                <Form.Text className="text-danger">Percents in Year is required</Form.Text>
                            )}
                        </Form.Group>
                    </div>
                    <Form.Group controlId="expenseDragSumOfLoan">
                        <Form.Label>Sum of loan: <Form.Control type="number" placeholder='Sum of Loan' {...register('sumOfLoan', { required: true })} /></Form.Label>
                        <Form.Control
                            type="range"
                            min="0"
                            max="100000"
                            step="100"
                            {...register('sumOfLoan', { required: true })}
                            onChange={(e) => {
                                const newValue = Number(e.target.value);
                                setValue("sumOfLoan", newValue);
                                setCurrentSumOfLoan(newValue);
                            }}
                        />
                        {errors.sumOfLoan && <Form.Text className="text-danger">Sum of Loan is required</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="expenseStartDate">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control type="date" placeholder='Start Date' {...register('startDate', { required: true })} />
                        {errors.startDate && <Form.Text className="text-danger">{errors.startDate?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="expenseEndDate">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control type="date" placeholder='End Date' {...register('endDate',
                            {
                                required: true,
                                validate:
                                    (v) => {
                                        const startDate = getValues("startDate");
                                        if (v && startDate && new Date(v) < new Date(startDate)) {
                                            return 'End Date must be after Start Date';
                                        }
                                    }
                            })} />
                        {errors.endDate && <Form.Text className="text-danger">{errors.endDate?.message}</Form.Text>}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Expense
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

    </>
};

export default CreateLoanForm;