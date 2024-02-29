import React from "react";
import { KpiCard } from "./KpiCard";
import { GetListResponse } from "@refinedev/core";
import { IChartDatum } from "../../interfaces";

type TTabItem = {
    label: string;
    data?: GetListResponse<IChartDatum>;
    isActive: Boolean;
    clickHandler: () => void;
};
export const TabItem = ({ label, data, isActive, clickHandler }: TTabItem) => {

    return (
        <a
            className={`m-2 rounded-lg w-full hover:bg-gray-200 hover:delay-150 hover:translate-x-px ${isActive ? " tab-active bg-gray-200" : ""}`}
            onClick={clickHandler}
        ><KpiCard
                title={label}
                data={data}
            />

        </a>
    );
};
