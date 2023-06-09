const baseUrl: string = "https://api-loan-proj.azurewebsites.net";
// const baseUrl: string = "https://localhost:7242";

export const loginUrl = `${baseUrl}/api/account/login`;
export const registerUrl = `${baseUrl}/api/account/register`;
export const googleUrl = `${baseUrl}/api/account/google`;

export const getLoansUrl = `${baseUrl}/api/loans`;

export const createLoansUrl = `${baseUrl}/api/loans`;

export const updateLoansUrl = `${baseUrl}/api/loans/`;

export const getCategories = `${baseUrl}/api/categories`;

export const getStatistic = `${baseUrl}/api/loans/getLoanStatistic`;