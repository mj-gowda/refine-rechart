import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal } from "@radix-ui/react-hover-card";
import { useDateStore } from "@/store/store";
import { ChartData } from "@/interfaces";

type TKpiCardProps = {
    title: string;
    data: ChartData[];
    definition: string;
    formatTotal?: (value: number | string) => typeof value;
};


interface GroupedData {
    [year: number]: ChartData[]; // Adjust ChartData based on your actual data structure
}

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const decimalMetrics = ["Return Rate", "Store Search Conversion"]

export const KpiCard = ({
    title,
    data,
    definition,
    formatTotal = (value) => value,
}: TKpiCardProps) => {
    const closeDate: Date = useDateStore((state) => state.dateRange)

    // Group data by year
    const groupedData: Record<number, ChartData[]> = data.reduce((d: GroupedData, entry) => {
        const year: number = entry.year;
        if (!d[year]) {
            d[year] = [];
        }
        d[year].push(entry);
        return d;
    }, {});
    const years = Object.keys(groupedData).map(Number);

    const totals: Record<number, number> = {};
    years.sort();
    years.forEach((year, index) => {
        const yearData = groupedData[year] || [];
        const LastMonth = closeDate.getMonth() + 1;
        const totalUpToCloseDate = yearData.reduce((acc, entry) => {
            const entryMonth = months.indexOf(entry.month);
            if (entryMonth < LastMonth) {
                acc += Number(entry.value);
            }
            return acc;
        }, 0);

        if (decimalMetrics.includes(title)) {
            totals[year] = Number(((totalUpToCloseDate / LastMonth).toFixed(3)))
        } else {
            totals[year] = totalUpToCloseDate;
        }
    });


    const trend = Number((((totals[years[years.length - 1]] - totals[years[years.length - 2]]) / totals[years[years.length - 2]]) * 100).toFixed(1));
    const percent = trend >= 0 ? `▴ ${trend}%` : `▾ ${trend}%`;
    const textColor = trend >= 0 ? "seagreen" : "crimson";


    return (
        <div className="flex-auto w-full rounded-lg">
            <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger asChild>
                    <span className="text-sm text-zinc-700 underline underline-offset-4 decoration-dashed decoration-gray-400 hover:cursor-default font-medium">
                        {title}
                    </span>
                </HoverCardTrigger>
                <HoverCardPortal>
                    <HoverCardContent align="start" sideOffset={10} side="bottom" className="w-100 bg-slate-50 shadow-lg rounded-lg p-2">
                        <div className="flex justify-between space-x-4">
                            <div className="space-y-1">
                                <h4 className="text-base font-semibold">{title}</h4>
                                <p className="text-sm text-neutral-600">
                                    {definition}
                                </p>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCardPortal>
            </HoverCard>
            <div className="pt-1">
                <span className="text-zinc-700 text-lg font-semibold">
                    {decimalMetrics.includes(title) ? formatTotal(`${(totals[years[years.length - 1]] * 100).toFixed(2)}%`) : formatTotal(totals[years[years.length - 1]])}
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
