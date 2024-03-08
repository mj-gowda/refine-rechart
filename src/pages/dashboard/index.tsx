import React, { useMemo } from "react";
import { CrudFilter, GetListResponse, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveLineChart } from "../../components/dashboard/ResponsiveLineChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { TabView } from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab } from "../../interfaces";

const salesData = [
    { month: 'Jan', year: 2021, grossSales: 5000, avgOrderValue: 120, totalOrders: 42, returnRate: 0.05, netReturnValue: 250, onlineSessions: 1200, searchConversion: 0.08 },
    { month: 'Feb', year: 2021, grossSales: 6000, avgOrderValue: 115, totalOrders: 38, returnRate: 0.03, netReturnValue: 180, onlineSessions: 1100, searchConversion: 0.07 },
    { month: 'Mar', year: 2021, grossSales: 7500, avgOrderValue: 130, totalOrders: 45, returnRate: 0.06, netReturnValue: 300, onlineSessions: 1300, searchConversion: 0.09 },
    { month: 'Apr', year: 2021, grossSales: 9000, avgOrderValue: 110, totalOrders: 40, returnRate: 0.04, netReturnValue: 220, onlineSessions: 1400, searchConversion: 0.08 },
    { month: 'May', year: 2021, grossSales: 8000, avgOrderValue: 125, totalOrders: 48, returnRate: 0.07, netReturnValue: 280, onlineSessions: 1150, searchConversion: 0.07 },
    { month: 'Jun', year: 2021, grossSales: 9500, avgOrderValue: 120, totalOrders: 43, returnRate: 0.05, netReturnValue: 250, onlineSessions: 1200, searchConversion: 0.08 },
    { month: 'Jul', year: 2021, grossSales: 12000, avgOrderValue: 135, totalOrders: 55, returnRate: 0.08, netReturnValue: 400, onlineSessions: 1600, searchConversion: 0.1 },
    { month: 'Aug', year: 2021, grossSales: 11000, avgOrderValue: 128, totalOrders: 50, returnRate: 0.06, netReturnValue: 320, onlineSessions: 1500, searchConversion: 0.09 },
    { month: 'Sep', year: 2021, grossSales: 8500, avgOrderValue: 118, totalOrders: 36, returnRate: 0.02, netReturnValue: 150, onlineSessions: 1000, searchConversion: 0.06 },
    { month: 'Oct', year: 2021, grossSales: 9500, avgOrderValue: 121, totalOrders: 39, returnRate: 0.03, netReturnValue: 180, onlineSessions: 1100, searchConversion: 0.07 },
    { month: 'Nov', year: 2021, grossSales: 10500, avgOrderValue: 133, totalOrders: 47, returnRate: 0.05, netReturnValue: 250, onlineSessions: 1250, searchConversion: 0.08 },
    { month: 'Dec', year: 2021, grossSales: 13000, avgOrderValue: 138, totalOrders: 60, returnRate: 0.1, netReturnValue: 550, onlineSessions: 1800, searchConversion: 0.12 },
    { month: 'Jan', year: 2022, grossSales: 6000, avgOrderValue: 122, totalOrders: 44, returnRate: 0.04, netReturnValue: 200, onlineSessions: 1300, searchConversion: 0.07 },
    { month: 'Feb', year: 2022, grossSales: 7000, avgOrderValue: 117, totalOrders: 37, returnRate: 0.03, netReturnValue: 170, onlineSessions: 1150, searchConversion: 0.06 },
    { month: 'Mar', year: 2022, grossSales: 8500, avgOrderValue: 128, totalOrders: 42, returnRate: 0.05, netReturnValue: 220, onlineSessions: 1200, searchConversion: 0.08 },
    { month: 'Apr', year: 2022, grossSales: 10000, avgOrderValue: 115, totalOrders: 38, returnRate: 0.03, netReturnValue: 180, onlineSessions: 1100, searchConversion: 0.07 },
    { month: 'May', year: 2022, grossSales: 9000, avgOrderValue: 120, totalOrders: 46, returnRate: 0.07, netReturnValue: 250, onlineSessions: 1250, searchConversion: 0.08 },
    { month: 'Jun', year: 2022, grossSales: 10500, avgOrderValue: 125, totalOrders: 41, returnRate: 0.04, netReturnValue: 210, onlineSessions: 1300, searchConversion: 0.09 },
    { month: 'Jul', year: 2022, grossSales: 13000, avgOrderValue: 130, totalOrders: 55, returnRate: 0.08, netReturnValue: 400, onlineSessions: 1600, searchConversion: 0.1 },
    { month: 'Aug', year: 2022, grossSales: 12000, avgOrderValue: 135, totalOrders: 50, returnRate: 0.06, netReturnValue: 320, onlineSessions: 1500, searchConversion: 0.09 },
    { month: 'Sep', year: 2022, grossSales: 9500, avgOrderValue: 126, totalOrders: 35, returnRate: 0.02, netReturnValue: 150, onlineSessions: 1000, searchConversion: 0.06 },
    { month: 'Oct', year: 2022, grossSales: 10500, avgOrderValue: 128, totalOrders: 38, returnRate: 0.03, netReturnValue: 180, onlineSessions: 1100, searchConversion: 0.07 },
    { month: 'Nov', year: 2022, grossSales: 11500, avgOrderValue: 132, totalOrders: 48, returnRate: 0.05, netReturnValue: 250, onlineSessions: 1250, searchConversion: 0.08 },
    { month: 'Dec', year: 2022, grossSales: 14000, avgOrderValue: 138, totalOrders: 65, returnRate: 0.12, netReturnValue: 700, onlineSessions: 2000, searchConversion: 0.15 },
];

export const Dashboard: React.FC = () => {

    const transformDataForLineChart = (data: any[], metric: string) => {
        const transformedData = data.map((entry: { [x: string]: any; month: any; year: any }) => ({
            month: entry.month,
            value: entry[metric], // Access the property dynamically
            year: entry.year, // Add the year to the transformed data
        }));

        return transformedData;
    };

    const memoizedGrossSalesData = useMemo(() => transformDataForLineChart(salesData, 'grossSales'), [salesData]);
    const memoizedAvgOrderValueData = useMemo(() => transformDataForLineChart(salesData, 'avgOrderValue'), [salesData]);
    const memoizedTotalOrdersData = useMemo(() => transformDataForLineChart(salesData, 'totalOrders'), [salesData]);
    const memoizedReturnRateData = useMemo(() => transformDataForLineChart(salesData, 'returnRate'), [salesData]);
    const memoizedNetReturnValueData = useMemo(() => transformDataForLineChart(salesData, 'netReturnValue'), [salesData]);
    const memoizedOnlineSessionsData = useMemo(() => transformDataForLineChart(salesData, 'onlineSessions'), [salesData]);
    const memoizedSearchConversionData = useMemo(() => transformDataForLineChart(salesData, 'searchConversion'), [salesData]);

    const tabs: TTab[] = [
        {
            id: 1,
            label: "Gross Sales",
            definition: "The combined revenue of all sales for the particular day.",
            data: salesData,
            content: (
                <ResponsiveLineChart
                    kpi="Gross Sales"
                    data={memoizedGrossSalesData}
                    colors={{
                        stroke: "rgb(76, 175, 80)",
                        fill: "rgba(54, 162, 235, 0.2)",
                    }}
                />
            ),
        },
        {
            id: 2,
            label: "Average Order Value",
            definition: "The average value of each order for the particular day.",
            data: salesData,
            content: (
                <ResponsiveLineChart
                    kpi="Average Order Value"
                    data={memoizedAvgOrderValueData}
                    colors={{
                        stroke: "rgb(255, 159, 64)",
                        fill: "rgba(255, 159, 64, 0.7)",
                    }}
                />
            ),
        },
        {
            id: 3,
            label: "Total Orders",
            definition: "The total number of orders for the particular day.",
            data: salesData,
            content: (
                <ResponsiveLineChart
                    kpi="Total Orders"
                    data={memoizedTotalOrdersData}
                    colors={{
                        stroke: "rgb(54, 162, 235)",
                        fill: "rgba(54, 162, 235, 0.2)",
                    }}
                />
            ),
        },
        {
            id: 4,
            label: "Return Rate",
            definition: "The rate of return for the particular day.",
            data: salesData,
            content: (
                <ResponsiveLineChart
                    kpi="Return Rate"
                    data={memoizedReturnRateData}
                    colors={{
                        stroke: "rgb(255, 99, 132)",
                        fill: "rgba(255, 99, 132, 0.2)",
                    }}
                />
            ),
        },
        {
            id: 5,
            label: "Net Return Value",
            definition: "The net return value for the particular day.",
            data: salesData,
            content: (
                <ResponsiveLineChart
                    kpi="Net Return Value"
                    data={memoizedNetReturnValueData}
                    colors={{
                        stroke: "rgb(153, 102, 255)",
                        fill: "rgba(153, 102, 255, 0.2)",
                    }}
                />
            ),
        },
        {
            id: 6,
            label: "Online Store Sessions",
            definition: "The number of online store sessions for the particular day.",
            data: salesData,
            content: (
                <ResponsiveLineChart
                    kpi="Online Store Sessions"
                    data={memoizedOnlineSessionsData}
                    colors={{
                        stroke: "rgb(255, 206, 86)",
                        fill: "rgba(255, 206, 86, 0.2)",
                    }}
                />
            ),
        },
        {
            id: 7,
            label: "Store Search Conversion",
            definition: "The conversion rate from store searches for the particular day.",
            data: salesData,
            content: (
                <ResponsiveLineChart
                    kpi="Store Search Conversion"
                    data={memoizedSearchConversionData}
                    colors={{
                        stroke: "rgb(255, 159, 64)",
                        fill: "rgba(255, 159, 64, 0.7)",
                    }}
                />
            ),
        },
    ];

    return (
        <div className="h-screen bg-zinc-100">
            <TabView tabs={tabs} />
        </div>
    );
}