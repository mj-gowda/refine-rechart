import { KpiCard } from "./KpiCard";
import { TTab } from "../../interfaces";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { useState } from "react";
import { DropdownIcon, DropdownItemChartIcon, DropdownItemInfoIcon } from "../icons/svg";
import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal } from "@radix-ui/react-hover-card";

type TTabItem = {
    currentTab: number;
    tabs: TTab[];
    isActive: Boolean;
    clickHandler: (num?: number) => void;
    chart: (num: number) => void;
};
export const TabItem = ({ currentTab, tabs, isActive, clickHandler, chart }: TTabItem) => {
    const [currentIndex, setCurrentIndex] = useState(currentTab);

    const changeMetric = (num: number) => {
        setCurrentIndex(num);
        chart(num);
        clickHandler(num);
    }

    return (
        <>
            <div className={` flex place-content-between w-full px-3 py-1 rounded-xl group hover:bg-neutral-200 hover:delay-150 hover:translate-x-px 
            ${isActive ? " bg-neutral-200" : ""}`}>
                <div onClick={() => changeMetric(currentIndex)} className="w-full">
                    <KpiCard
                        title={tabs[currentIndex]?.label}
                        data={tabs[currentIndex]?.data}
                        definition={tabs[currentIndex]?.definition}
                    />
                </div>
                <div className="mt-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <p className={`${isActive ? "inline-flex" : "hidden"} group-hover:inline-flex hover:bg-neutral-400 rounded-md p-1`}>
                                <DropdownIcon width="16" height="16" />
                            </p>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="m-auto py-2 rounded-xl">
                            {tabs?.map((tab: TTab, index: number) => (
                                <DropdownMenuItem key={tab?.id} className="w-[220px] h-6 m-0.5 rounded-md" >
                                    <button className="flex flex-row w-full m-0.5 justify-start group hover:cursor-default"
                                        onClick={() => changeMetric(index)}>
                                        <span>
                                            <DropdownItemChartIcon width="14" height="14" viewBox="0 0 12 12" />
                                        </span>
                                        <span className="text-xs text-zinc-700 w-4/5 text-left ml-2">
                                            {tab?.label}
                                        </span>
                                        <HoverCard openDelay={0} closeDelay={0}>
                                            <HoverCardTrigger>
                                                <span>
                                                    <DropdownItemInfoIcon className="hidden group-hover:inline-flex" width="13" height="13" viewBox="0 0 12 12" />
                                                </span>
                                            </HoverCardTrigger>
                                            <HoverCardPortal>
                                                <HoverCardContent align="start" side="right" sideOffset={25} className="w-45 inline-block bg-slate-50 shadow-lg rounded-lg p-2">
                                                    <div className="flex justify-between space-x-4">
                                                        <div className="space-y-1">
                                                            <h4 className="text-sm font-semibold">{tab.label}</h4>
                                                            <p className="text-sm text-neutral-600">
                                                                {tab.definition}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCardPortal>
                                        </HoverCard>
                                    </button>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    );
};
