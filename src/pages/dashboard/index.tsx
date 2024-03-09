import React, { useMemo } from "react";
import { ResponsiveLineChart } from "../../components/dashboard/ResponsiveLineChart";
import { TabView } from "../../components/dashboard/TabView";
import { TTab } from "../../interfaces";
import { salesData } from "@/mockData";


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
            data: memoizedGrossSalesData,
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
            data: memoizedAvgOrderValueData,
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
            data: memoizedTotalOrdersData,
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
            data: memoizedReturnRateData,
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
            data: memoizedNetReturnValueData,
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
            data: memoizedOnlineSessionsData,
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
            data: memoizedSearchConversionData,
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