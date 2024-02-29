import { GetListResponse } from "@refinedev/core";
import React from "react";
import { IChartDatum } from "../../interfaces";

type TKpiCardProps = {
    title: string;
    data: any;
    formatTotal?: (value: number | string) => typeof value;
};

export const KpiCard = ({
    title,
    data,
    formatTotal = (value) => value,
}: TKpiCardProps) => {
    const total = data?.data?.total;
    const trend = data?.data?.trend;
    const calc = Math.round((trend / total) * 100);
    const percent = total > trend ? `▴ ${calc}%` : `▾ ${calc}%`;
    const textColor = total > trend ? "seagreen" : "crimson";

    return (
        <div
            className="stat flex-1 rounded-lg"
        >
            <div className="stat-title text-zinc-700 underline underline-offset-2 decoration-dashed decoration-gray-400 text-sm font-medium">{title}</div>
            <div>
                <span className="stat-value text-zinc-800 text-lg font-semibold">
                    {formatTotal(total ?? "...")}
                </span>
                <span className="stat-desc my-1 align-text-top">
                    <span
                        className="mx-2 text-xs font-bold"
                        style={{ color: textColor }}
                    >
                        {percent}
                    </span>
                </span>
            </div>
        </div>
    );
};
