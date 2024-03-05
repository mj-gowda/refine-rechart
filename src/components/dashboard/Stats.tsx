import React from "react";
import { KpiCard } from "./KpiCard";
import { IChartDatum } from "../../interfaces";
import {
    CurrencyDollarIcon,
    ShoppingCartIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import { GetListResponse } from "@refinedev/core";

type TStats = {
    dailyRevenue?: GetListResponse<IChartDatum>;
    dailyOrders?: GetListResponse<IChartDatum>;
    newCustomers?: GetListResponse<IChartDatum>;
};

const Stats = ({ dailyRevenue, dailyOrders, newCustomers }: TStats) => {
    return (
        <div className="w-full mx-auto mb-4 flex flex-col justify-center items-stretch md:flex-row md:justify-between drop-shadow-md">
            <div className="w-full mx-auto md:flex-1 md:mr-2">
                <KpiCard
                    title="Weekly Revenue"
                    data={dailyRevenue}
                    formatTotal={(value: number | string) => `$ ${value}`}
                />
            </div>
            <div className="w-full mx-auto md:flex-1">
                <KpiCard
                    title="Weekly Orders"
                    data={dailyOrders}
                />
            </div>
            <div className="w-full mx-auto md:flex-1 md:ml-2">
                <KpiCard
                    title="New Customers"
                    data={newCustomers}
                />
            </div>
        </div>
    );
};

export default Stats;
