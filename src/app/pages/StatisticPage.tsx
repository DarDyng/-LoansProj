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

const filterTypes = ["All", "Unpaid", "Paid"];
const showLoanTypes = ["Price", "Amount"];

type filterType = "All" | "Unpaid" | "Paid";
type showLoanType = "Price" | "Amount";

interface IFilterPieChartForm {
    filterType: filterType;
    showLoanType: showLoanType;
}

const StatisticPage = () => {
    const dispatch = useAppDispatch();
    const { statistic, loading } = useAppSelector(x => x.statistic);

    const initialState: IFilterPieChartForm = {
        filterType: "All",
        showLoanType: "Price"
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

    const [filterLoanType, setFilterPaid] = useState<"All" | "Unpaid" | "Paid">("All");
    const [showLoanType, setShowLoanType] = useState<"Price" | "Amount">("Price");

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
    const getRandomColor = (() => {
        const pastelColors = [
            "#c5e6b8", "#aadfa4", "#c8e0af", "#f4d29f", "#f0c292", "#f6d4a2",
            "#f5de8d", "#d0dd94", "#b5e2b9", "#93d6c5", "#bad3e6", "#c9b2d7",
            "#e9a1a8", "#f7b8a4", "#f0d092", "#c2d89e", "#a9ceb7", "#81b0a4",
            "#97d6c0", "#b1a4c5", "#f1a1a4", "#f5b190", "#f4c294", "#e5cd9f",
            "#e0cfa4", "#b8e1b6", "#87bcb2", "#90d7d4", "#b2a8d2", "#ec93a3",
            "#f6a3a4", "#efb194", "#e8cba4", "#f7db9d", "#d5e0aa", "#b8ddc4",
            "#b4d8df", "#c5b5db", "#f497a0", "#f8a1a0", "#f8ae98", "#f9c194",
            "#f8d598", "#dce5a5", "#a8e1c3", "#9ddde0", "#c9acd6", "#f49890",
            "#f69e99", "#f7a69e", "#f7b5a0", "#f6c6a0", "#f5d79e", "#cde1aa",
            "#a4d6b0", "#95d5c6", "#e0cfa4", "#b8e1b6", "#87bcb2", "#90d7d4",
            "#b2a8d2", "#ec93a3", "#f6a3a4", "#efb194", "#e8cba4", "#f7db9d",
            "#d5e0aa", "#b8ddc4", "#b4d8df", "#c5b5db", "#f497a0", "#f8a1a0",
            "#f8ae98", "#f9c194", "#f8d598", "#dce5a5", "#a8e1c3", "#9ddde0",
            "#c9acd6", "#f49890", "#f69e99", "#f7a69e", "#f7b5a0", "#f6c6a0",
            "#f5d79e", "#cde1aa", "#a4d6b0", "#95d5c6"
        ];

        let lastColorIndex = -1;
        let firstColorIndex = -1;
        let isFirstColorSelected = false;

        return (): string => {
            if (!isFirstColorSelected) {
                firstColorIndex = Math.floor(Math.random() * pastelColors.length);
                isFirstColorSelected = true;
                lastColorIndex = firstColorIndex;
                return pastelColors[firstColorIndex];
            }

            let currentIndex = Math.floor(Math.random() * pastelColors.length);
            while (currentIndex === lastColorIndex || currentIndex === firstColorIndex) {
                currentIndex = Math.floor(Math.random() * pastelColors.length);
            }

            lastColorIndex = currentIndex;
            return pastelColors[currentIndex];
        };
    })();

    const filterData = (filterType: { filter: filterType, show: showLoanType }) => {
        // here i need to perform filtering depends on selected options

        let filterdCategoryModel: CategoryModel[] = [];

        switch (filterType.filter) {
            case "All":
                filterdCategoryModel = statistic?.categoriesContainer.categoryModels || [];
                break;
            case "Paid":
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
            case "Unpaid":
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
                        const strToDisplay = showLoanType == "Price" ? `${category}: $${totalDebt} (${percentage}%)` : `${category}: ${totalDebt} loans (${percentage}%)`;
                        return strToDisplay;
                    },
                    afterBody: (context: TooltipItem<"pie">[]) => {
                        // context.map(x => x.dataset?.data.map())
                    }
                },
            },
        },
    };

    const [isPressed, setIsPressed] = useState(false);

    const buttonStyle = {
        backgroundColor: isPressed ? '#4682B4' : '#FFFFFF',
        color: isPressed ? '#FFFFFF' : '#000000',
        boxShadow: isPressed ? '0 0 5px rgba(0, 0, 0, 0.5)' : 'none',
    };

    const handleMouseDown = () => {
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
    };

    return <>

        <div className={classes["statistic1"]}>
            <div className={classes["wrapper"]}>
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
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            style={buttonStyle}
                                            onMouseDown={handleMouseDown}
                                            onMouseUp={handleMouseUp}
                                        >
                                            Apply Filters
                                        </Button>

                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>

                </div>
                <div className={classes["chart"]}>

                    <div className={classes["statistic-charts"]}>

                        <div className={classes["chart-item"]}>
                            <PieChart
                                data={{
                                    labels: filteredData.map(category => category.categoryName),
                                    datasets: [{
                                        data: showLoanType == "Price" ? filteredData.map(category => category.totalDebt) : filteredData.map(category => category.loans.length),
                                        backgroundColor: filteredData.map(() => getRandomColor()),
                                    }],
                                }}
                                options={options}
                            />
                        </div>
                    </div >


                </div>
            </div>

        </div >
    </>
};

export default StatisticPage;


