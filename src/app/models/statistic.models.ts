import { IExpense } from "./expenses.models";

export interface StatisticDTO {
    totalDebt: number;
    totalLoans: number;
    categoriesContainer: CategoriesContainer;
  }
  
  export interface CategoriesContainer {
    categoryModels: CategoryModel[];
  }
  
  export interface CategoryModel {
    categoryName: string;
    totalCount: number;
    totalDebt: number;
    paidLoansCount: number;
    unPaidLoansCount: number;
    loans: LoanStatisticModel[];
  }
  
  export interface LoanStatisticModel {
    id: string;
    startDate: Date;
    endDate: Date | null;
    sumOfLoan: number;
    sumOfPaidLoan: number;
    percentsInYear: number;
    name: string;
    category: string;
    isPaid: boolean;
    percentagePaid: number;
  }
  