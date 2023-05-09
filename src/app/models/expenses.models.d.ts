export interface IExpense{
    id?: string;
    name: string;
    sumOfLoan: number;
    percentsInYear: number;
    startDate: string;
    endDate: string;
    isPaid: boolean;
};

export interface IEditExpenseRequest{
    id?: string;
    name: string;
    sumOfLoan: number;
    percentsInYear: number;
    startDate: Date;
    endDate: Date;
    isPaid: boolean;
}

export interface IExpenseCreateRequest{
    id: string;
    startDate: Date;
    endDate: Date;
    percentsInYear: number;
    sumOfLoan: number;
    name: string;
    isPaid: boolean;
};

export interface IExpenseCreateResponse{
    id: string;
    startDate: Date;
    endDate: Date;
    percentsInYear: number;
    sumOfLoan: number;
    name: string;
    isPaid: boolean;
};