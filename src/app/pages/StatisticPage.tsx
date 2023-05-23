import { useEffect, useState } from "react";
import BarChart from "../components/charts/BarChart";
import { IUserData, UserData } from "../mockData/data";
import { ChartData, ChartOptions, TooltipItem, defaults } from "chart.js";
import LineChart from "../components/charts/LineChart";
import DisplayTotalDebt from "../components/statistics/DisplayDebt";
import classes from "./StatisticPage.module.css"
import DisplayTotalItems from "../components/statistics/DisplayTotalItems";
import axios from "axios";
import { getStatistic } from "../utils/endpoints";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchStatistic } from "../store/features/statisticSlice";
import PieChart from "../components/charts/PieChart";
import { CategoryModel } from "../models/statistic.models";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

const filterTypes = ["all", "unpaid", "paid"];
const showLoanTypes = ["price", "amount"];

type filterType = "all" | "unpaid" | "paid";
type showLoanType = "price" | "amount";

interface IFilterPieChartForm {
    filterType: filterType;
    showLoanType: showLoanType;
}

const StatisticPage = () => {
    const dispatch = useAppDispatch();
    const { statistic, loading } = useAppSelector(x => x.statistic);

    const initialState: IFilterPieChartForm = {
        filterType: "all",
        showLoanType: "price"
    }

    const { handleSubmit, register } = useForm<IFilterPieChartForm>({
        defaultValues: initialState
    });

    const handleFormSubmit = (data: IFilterPieChartForm) => {
        console.log("Submited data", data);
        // Update the chart based on the selected filter and show loan types
        filterData({ filter: data.filterType, show: data.showLoanType });

        setShowLoanType(data.showLoanType);
        // Perform any other actions or API requests if needed
    };

    const [filterLoanType, setFilterPaid] = useState<"all" | "unpaid" | "paid">("all");
    const [showLoanType, setShowLoanType] = useState<"price" | "amount">("price");

    useEffect(() => {
        dispatch(fetchStatistic())
    }, []);

    const [chartData, setChartData] = useState<ChartData<"pie">>({
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }],
    });


    const [filteredData, setFilteredData] = useState<CategoryModel[]>([]);

    useEffect(() => {
        if (statistic) {
            const categories: CategoryModel[] = statistic.categoriesContainer.categoryModels;

            setFilteredData(categories);

            const labels: string[] = categories.map((category) => category.categoryName);
            const data: number[] = categories.map((category) => category.totalDebt);
            const backgroundColors: string[] = categories.map(() => getRandomColor()); // Helper function to generate random colors

            setChartData({
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: backgroundColors,
                    },
                ],
            });
        }
    }, [statistic]);

    // Helper function to generate random color in hex format
    const getRandomColor = (): string => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const filterData = (filterType: { filter: filterType, show: showLoanType }) => {
        // here i need to perform filtering depends on selected options

        let filterdCategoryModel: CategoryModel[] = [];

        switch (filterType.filter) {
            case "all":
                filterdCategoryModel = statistic?.categoriesContainer.categoryModels || [];
                break;
            case "paid":
                filterdCategoryModel = statistic!.categoriesContainer.categoryModels.map(category => {
                    const updatedCategory = { ...category }; // Create a new object based on the existing category
                    updatedCategory.loans = updatedCategory.loans.filter(loan => loan.isPaid === true); // Update the loans array
                    updatedCategory.paidLoansCount = 0;
                    updatedCategory.totalCount = 0;
                    updatedCategory.totalDebt = 0;
                    updatedCategory.unPaidLoansCount = 0;
                    updatedCategory.loans.forEach(x => {
                        updatedCategory.totalDebt += x.sumOfLoan;
                        if (x.isPaid) {
                            updatedCategory.paidLoansCount++;
                        }
                        else {
                            updatedCategory.unPaidLoansCount++;
                        }
                        updatedCategory.totalCount++;
                    });

                    return updatedCategory;
                });
                console.log(`PAID filtered - ${filterdCategoryModel}`);
                break;
            case "unpaid":
                filterdCategoryModel = statistic!.categoriesContainer.categoryModels.map(category => {
                    const updatedCategory = { ...category }; // Create a new object based on the existing category
                    updatedCategory.loans = updatedCategory.loans.filter(loan => loan.isPaid === false); // Update the loans array
                    updatedCategory.paidLoansCount = 0;
                    updatedCategory.totalCount = 0;
                    updatedCategory.totalDebt = 0;
                    updatedCategory.unPaidLoansCount = 0;
                    updatedCategory.loans.forEach(x => {
                        updatedCategory.totalDebt += x.sumOfLoan;
                        if (x.isPaid) {
                            updatedCategory.paidLoansCount++;
                        }
                        else {
                            updatedCategory.unPaidLoansCount++;
                        }
                        updatedCategory.totalCount++;
                    });

                    return updatedCategory;
                });
                console.log(`UNPAID filtered - ${filterdCategoryModel}`);
                break;
            default:
                break;
        }

        console.log("Filtered", filterdCategoryModel);

        setFilteredData(filterdCategoryModel);
    };

    const options: ChartOptions<'pie'> = {
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context: TooltipItem<'pie'>) => {
                        const index = context.dataIndex;
                        const category = context.label;
                        const totalDebt = context.parsed;
                        const total = context.dataset?.data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = ((totalDebt / total!) * 100).toFixed(2);
                        const totalLoans = context.dataset.data.map(x => x)
                        const strToDisplay = showLoanType == "price" ? `${category}: $${totalDebt} (${percentage}%)` : `${category}: ${totalDebt} loans (${percentage}%)`;
                        return strToDisplay;
                    },
                    afterBody: (context: TooltipItem<"pie">[]) => {
                        // context.map(x => x.dataset?.data.map())
                    }
                },
            },
        },
    };


    return <>
        <div className={classes["statistic"]}>
            <div className={classes["statistic-cards"]}>
                <DisplayTotalDebt />
                <DisplayTotalItems />
            </div>
            <div className={classes["statistic-charts"]}>
                <div className={classes["chart-buttons"]}>
                    <Form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div style={{ display: "flex", gap: "2rem" }}>
                            <Form.Group controlId="filterLoanType">
                                <Form.Label>Filter Loan Type:</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register("filterType")}
                                >
                                    {filterTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="showLoanType">
                                <Form.Label>Show Loan Type:</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register("showLoanType")}
                                >
                                    {showLoanTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <div style={{
                                "display": "flex",
                                "justifyContent": "flex-start",
                                "alignItems": "flex-end"
                            }}>
                                <Button variant="primary" type="submit">
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className={classes["chart-item"]}>
                    <PieChart
                        data={{
                            labels: filteredData.map(category => category.categoryName),
                            datasets: [{
                                data: showLoanType == "price" ? filteredData.map(category => category.totalDebt) : filteredData.map(category => category.loans.length),
                                backgroundColor: filteredData.map(() => getRandomColor()),
                            }],
                        }}
                        options={options}
                    />
                </div>
            </div >
        </div >
    </>
};

export default StatisticPage;
