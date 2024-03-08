import { LegendLine, TrendLine } from "../icons/svg";
import { Card, CardContent } from "../shadcn/ui/card";

export const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const trend = payload[1].value >= payload[0].value;
        const percentTrend = trend ? Math.floor(((payload[1].value - payload[0].value) / payload[0].value) * 100)
            : Math.floor(((payload[0].value - payload[1].value) / payload[0].value) * 100);

        return (
            <div className="custom-tooltip h-fit">
                <Card>
                    <CardContent className="h-fit p-1 text-xs whitespace-break-spaces">
                        <p className="flex flex-row gap-2">
                            <LegendLine className="w-6 h-6 pb-2" fill={payload[0].color} />
                            <span>{`${payload[1].payload.month} ${payload[1].payload.year}     ${payload[1].value}`}</span>
                            <span className="inline-flex gap-1">
                                {trend ? (<TrendLine className="w-3 h-3 mt-1" fill="darkgreen" />)
                                    : (<TrendLine className="w-3 h-3 mt-1" transform="scale(1,-1)" fill="red" />)}
                                {`${percentTrend}%`}
                            </span>
                        </p>
                        <p className="flex flex-row gap-2 ">
                            <LegendLine className="w-6 h-6 pb-2" fill={payload[1].color} />
                            {`${payload[0].payload.month} ${payload[0].payload.year}     ${payload[0].value}`}
                        </p>

                    </CardContent>
                </Card>
            </div >
        );
    }

    return null;
};