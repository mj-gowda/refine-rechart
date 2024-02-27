import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area,
    Line,
    LineChart,
    Legend,
} from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";

type TResponsiveAreaChartProps = {
    kpi: string;
    data: IChartDatum[];
    colors: {
        stroke: string;
        fill: string;
    };
};

export const ResponsiveAreaChart = ({
    kpi,
    data,
    colors,
}: TResponsiveAreaChartProps) => {
    return (
        <ResponsiveContainer height={280}>
            <LineChart
                data={data}
                height={400}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid vertical={false} opacity={0.3} />

                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickCount={data?.length ?? 0}
                    tick={{
                        stroke: "grey",
                        strokeWidth: 0.1,
                        fontSize: "13px",
                    }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickCount={6}
                    tick={{
                        stroke: "grey",
                        strokeWidth: 0.1,
                        fontSize: "13px",
                    }}
                    interval="preserveStartEnd"
                    domain={["dataMin -5", "dataMax + 5"]}
                />
                <Tooltip
                    content={<ChartTooltip kpi={kpi} colors={colors} />}
                    wrapperStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        border: "0 solid #000",
                        borderRadius: "10px",
                    }}
                />
                <Legend
                    height={20}
                    wrapperStyle={{
                        margin: "0 0 10px 0",
                    }}
                />
                <Line

                    type="monotone"
                    dataKey="value"
                    stroke={colors?.stroke}
                    strokeWidth={3}
                    dot={{
                        stroke: colors?.stroke,
                        strokeWidth: 3,
                    }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
