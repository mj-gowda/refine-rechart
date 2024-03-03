import { KpiCard } from "./KpiCard";
import { GetListResponse } from "@refinedev/core";
import { IChartDatum, TTab } from "../../interfaces";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { Button } from "../shadcn/ui/button";
import { useState } from "react";

type TTabItem = {
    label: string;
    index: number;
    tabs: TTab[];
    data?: GetListResponse<IChartDatum>;
    isActive: Boolean;
    clickHandler: () => void;
};
export const TabItem = ({ label, index, tabs, data, isActive, clickHandler }: TTabItem) => {
    const [currentIndex, setCurrentIndex] = useState(index);
    const changeTab = (index: number) => {
        setCurrentIndex(index);
        index = currentIndex;
        clickHandler;
    }

    return (
        <div onClick={clickHandler} className={`flex flex-row place-content-between w-full px-3 py-1 rounded-xl group hover:bg-neutral-200 hover:delay-150 hover:translate-x-px 
            ${isActive ? " bg-neutral-200" : ""}`}>
            <a >
                <KpiCard
                    title={tabs[currentIndex]?.label}
                    data={tabs[currentIndex]?.data}
                />
            </a>
            <div className="m-1">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button className={`${isActive ? "inline-flex" : "hidden"} group-hover:inline-flex`}>
                            <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6895 6.23633L5.77344 12.1523L4.91016 11.2891L5.01172 11.1875H3.84375C3.61523 11.1875 3.4375 11.0098 3.4375 10.7812V9.61328L3.33594 9.71484C3.20898 9.8418 3.13281 9.96875 3.08203 10.1465L2.49805 12.127L4.47852 11.543C4.63086 11.4922 4.7832 11.416 4.91016 11.2891L5.77344 12.1523C5.51953 12.4062 5.18945 12.6094 4.83398 12.7109L1.76172 13.5996C1.55859 13.6758 1.33008 13.625 1.17773 13.4473C1 13.2949 0.949219 13.0664 1 12.8633L1.91406 9.79102C2.01562 9.43555 2.21875 9.10547 2.47266 8.85156L8.38867 2.93555L11.6895 6.23633ZM13.4922 2.12305C14.127 2.75781 14.127 3.79883 13.4922 4.43359L12.2734 5.65234L8.97266 2.35156L10.1914 1.13281C10.8262 0.498047 11.8672 0.498047 12.502 1.13281L13.4922 2.12305Z" fill="black" fill-opacity="0.5" />
                            </svg>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {tabs?.map((tab: TTab, index: number) => (
                            <div key={tab?.id}>
                                <DropdownMenuItem>
                                    <button onClick={() => changeTab(index)}>{tab?.label}</button>
                                </DropdownMenuItem>
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>



        </div>
    );
};
