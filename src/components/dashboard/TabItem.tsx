import { KpiCard } from "./KpiCard";
import { TTab } from "../../interfaces";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { useState } from "react";
import { Button } from "../shadcn/ui/button";
import { DropdownIcon, DropdownItemChartIcon, DropdownItemInfoIcon } from "../icons/svg";

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
                    />
                </div>
                <div className="mt-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <p className={`${isActive ? "inline-flex" : "hidden"} group-hover:inline-flex hover:bg-neutral-400 rounded-md p-1`}>
                                <DropdownIcon width="16" height="16" />
                            </p>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=" ml-40 p-2 rounded-xl overflow-x-auto">
                            {tabs?.map((tab: TTab, index: number) => (
                                <DropdownMenuItem key={tab?.id} className="w-[200px] m-0.5" >
                                    <button className="flex flex-row w-full justify-start rounded-lg"
                                        onClick={() => changeMetric(index)}>
                                        <DropdownItemChartIcon width="10" height="10" />
                                        <span className="text-xs text-zinc-700 w-4/5 text-left ml-2">{tab?.label}</span>
                                        <DropdownItemInfoIcon width="10" height="11" />
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
