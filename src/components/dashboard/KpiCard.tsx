import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal } from "@radix-ui/react-hover-card";

type TKpiCardProps = {
    title: string;
    data: any;
    definition: string;
    formatTotal?: (value: number | string) => typeof value;
};

export const KpiCard = ({
    title,
    data,
    definition,
    formatTotal = (value) => value,
}: TKpiCardProps) => {
    const total = data?.data?.total;
    const trend = data?.data?.trend;
    const calc = Math.round((trend / total) * 100);
    const percent = total > trend ? `▴ ${calc}%` : `▾ ${calc}%`;
    const textColor = total > trend ? "seagreen" : "crimson";

    return (
        <div className="flex-auto w-full rounded-lg">
            <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger asChild>
                    <div className="text-sm text-zinc-700 underline underline-offset-2 decoration-dashed decoration-gray-400 font-medium">
                        {title}
                    </div>
                </HoverCardTrigger>
                <HoverCardPortal>
                    <HoverCardContent sideOffset={10} side="bottom" className="ml-16 w-80 bg-slate-50 shadow-lg rounded-lg p-2">
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
