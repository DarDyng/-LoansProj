export interface IExpense{
    id?: string;
    name: string;
    sumOfLoan: number;
    sumOfPaidLoan: number;
    percentsInYear: number;
    startDate: string;
    endDate: string;
    categoryId: string;
    isPaid: boolean;
};

export interface IEditExpenseRequest{
    id?: string;
    name: string;
    sumOfLoan: number;
    sumOfPaidLoan: number;
    percentsInYear: number;
    startDate: Date;
    endDate: Date;
    categoryId: string;
    isPaid: boolean;
}

export interface IExpenseCreateRequest{
    id: string;
    startDate: Date;
    endDate: Date;
    percentsInYear: number;
    sumOfLoan: number;
    sumOfPaidLoan: number;
    name: string;
    categoryId: string;
    isPaid: boolean;
};

export interface IExpenseCreateResponse{
    id: string;
    startDate: Date;
    endDate: Date;
    percentsInYear: number;
    sumOfLoan: number;
    sumOfPaidLoan: number;
    name: string;
    categoryId: string;
    isPaid: boolean;
};

export interface ICategory{
    id: string;
    name: string;
}