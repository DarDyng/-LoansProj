import { string } from "yup";

export interface ILoan {
    Id: string;
    StartDate: Date;
    EndDate?: Date;
    SumOfLoan:number;
    PercentsInYear:number;
    Name:string;
};