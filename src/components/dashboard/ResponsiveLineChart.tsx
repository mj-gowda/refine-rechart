import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { IChartDatum } from "../../interfaces";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format, getMonth } from "date-fns";
import { Button } from "../shadcn/ui/button";
import { Calendar } from "../shadcn/ui/calendar";
import { LegendLine } from "../icons/svg";
import { Legendcalendar } from "./LegendCalendar";
type ChartData = {
    month: string;
    value: string;
    year: number;
}

interface GroupedData {
    [year: number]: ChartData[]; // Adjust ChartData based on your actual data structure
}


type TResponsiveLineChartProps = {
    kpi: string;
    data: ChartData[];
    colors: {
        stroke: string;
        fill: string;
    };
};
const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const ResponsiveLineChart = ({
    kpi,
    data,
    colors,
}: TResponsiveLineChartProps) => {
    const [openDate, setOpenDate] = React.useState<Date | undefined>()
    const [closeDate, setCloseDate] = React.useState<Date | undefined>()


    // Group data by year
    const groupedData: Record<number, ChartData[]> = data.reduce((d: GroupedData, entry) => {
        const year: number = entry.year;
        if (!d[year]) {
            d[year] = [];
        }
        d[year].push(entry);
        return d;
    }, {});

    const lineColors = ['rgba(111, 194, 243, 0.5)', 'rgba(72, 154, 210, 1.2)'];
    const years = Object.keys(groupedData);

    const Customizedlegend = () => {
        return (
            <div className="flex flex-row justify-around">
                <div>
                    <Legendcalendar years={years} date={openDate} setDate={setOpenDate} navigation={true} defaultMonth={0} />
                    <Legendcalendar years={years} date={closeDate} setDate={setCloseDate} navigation={false} defaultMonth={11} />
                </div>
                <div className=" ">
                    <span className="flex flex-row m-2 gap-3">
                        {years.map((year, index) => (
                            <span className="flex flex-row gap-1 text-sm items-center text-zinc-500">
                                <LegendLine fill={lineColors[index]} className="w-6 h-6" />
                                {year}
                            </span>
                        ))}
                    </span>
                </div>
            </div>
        )
    }

    const range = closeDate?.getMonth() ? closeDate?.getMonth() + 1 : 12;


    return (
        <ResponsiveContainer height={200}>
            <LineChart
                data={data}
                margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid vertical={false} opacity={0.3} />

                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="month"
                    allowDuplicatedCategory={false}
                    tickCount={months.length}
                    tick={{ stroke: "grey", strokeWidth: 0.1, fontSize: "13px" }}
                    domain={months.slice(0, range)} // Use months array as the domain
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickCount={3}
                    tick={{
                        stroke: "grey",
                        strokeWidth: 0.1,
                        fontSize: "13px",
                    }}
                    interval="preserveStartEnd"
                    domain={["dataMin - (dataMin*5)", "dataMax + (dataMin*5)"]}
                />
                <Tooltip
                    content={<ChartTooltip kpi={kpi} colors={colors} />}
                    wrapperStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        border: "0 solid #000",
                        borderRadius: "10px",
                    }}
                />
                <Legend content={Customizedlegend} />

                {years.map((year, index) => (
                    <Line
                        key={year}
                        type="monotone"
                        dataKey="value"
                        stroke={lineColors[index]}
                        strokeWidth={2}
                        dot={false}
                        activeDot={false}
                        strokeDasharray={index < 1 ? "5 5" : ""}
                        data={groupedData[Number(year)]}
                        name={year}
                    />
                ))}

            </LineChart>
        </ResponsiveContainer>
    );
};
