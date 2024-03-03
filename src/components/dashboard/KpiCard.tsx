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
        <div className="flex-1 w-full rounded-lg">
            <div className="text-sm text-zinc-700 underline underline-offset-2 decoration-dashed decoration-gray-400 font-medium">
                {title}
            </div>
            <div className="pt-1">
                <span className="text-zinc-700 text-lg font-semibold">
                    {formatTotal(total ?? "...")}
                </span>
                <span className="mx-2 align-top">
                    <span
                        className="text-xs font-bold"
                        style={{ color: textColor }}
                    >
                        {percent}
                    </span>
                </span>
            </div>
        </div>
    );
};
