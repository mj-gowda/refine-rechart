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
                <div onClick={() => changeMetric(currentIndex)} className="w-full hover:cursor-pointer">
                    <KpiCard
                        title={tabs[currentIndex]?.label}
                        data={tabs[currentIndex]?.data}
                    />
                </div>
                <div className="mt-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <p className={`${isActive ? "inline-flex" : "hidden"} group-hover:inline-flex`}>
                                <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.6895 6.23633L5.77344 12.1523L4.91016 11.2891L5.01172 11.1875H3.84375C3.61523 11.1875 3.4375 11.0098 3.4375 10.7812V9.61328L3.33594 9.71484C3.20898 9.8418 3.13281 9.96875 3.08203 10.1465L2.49805 12.127L4.47852 11.543C4.63086 11.4922 4.7832 11.416 4.91016 11.2891L5.77344 12.1523C5.51953 12.4062 5.18945 12.6094 4.83398 12.7109L1.76172 13.5996C1.55859 13.6758 1.33008 13.625 1.17773 13.4473C1 13.2949 0.949219 13.0664 1 12.8633L1.91406 9.79102C2.01562 9.43555 2.21875 9.10547 2.47266 8.85156L8.38867 2.93555L11.6895 6.23633ZM13.4922 2.12305C14.127 2.75781 14.127 3.79883 13.4922 4.43359L12.2734 5.65234L8.97266 2.35156L10.1914 1.13281C10.8262 0.498047 11.8672 0.498047 12.502 1.13281L13.4922 2.12305Z" fill="black" fillOpacity="0.5" />
                                </svg>
                            </p>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {tabs?.map((tab: TTab, index: number) => (
                                <div key={tab?.id}>
                                    <DropdownMenuItem>
                                        <button className="flex flex-row w-[180px] justify-start hover:cursor-default" onClick={() => changeMetric(index)}>
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.25 8.0625C1.25 8.23828 1.38672 8.375 1.5625 8.375H9.375C9.70703 8.375 10 8.66797 10 9C10 9.35156 9.70703 9.625 9.375 9.625H1.5625C0.683594 9.625 0 8.94141 0 8.0625V1.5C0 1.16797 0.273438 0.875 0.625 0.875C0.957031 0.875 1.25 1.16797 1.25 1.5V8.0625ZM6.67969 5.69922C6.44531 5.95312 6.03516 5.95312 5.80078 5.69922L4.6875 4.58594L2.92969 6.32422C2.69531 6.57812 2.28516 6.57812 2.05078 6.32422C1.79688 6.08984 1.79688 5.67969 2.05078 5.44531L4.23828 3.25781C4.47266 3.00391 4.88281 3.00391 5.11719 3.25781L6.25 4.37109L8.30078 2.32031C8.53516 2.06641 8.94531 2.06641 9.17969 2.32031C9.43359 2.55469 9.43359 2.96484 9.17969 3.19922L6.67969 5.69922Z" fill="#616161" />
                                            </svg>

                                            <p className="text-xs text-zinc-700 w-4/5 text-left ml-2">{tab?.label}</p>

                                            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 0.25C7.75391 0.25 10 2.49609 10 5.25C10 8.02344 7.75391 10.25 5 10.25C2.22656 10.25 0 8.02344 0 5.25C0 2.49609 2.22656 0.25 5 0.25ZM5 9.3125C7.22656 9.3125 9.0625 7.49609 9.0625 5.25C9.0625 3.02344 7.22656 1.1875 5 1.1875C2.75391 1.1875 0.9375 3.02344 0.9375 5.25C0.9375 7.49609 2.75391 9.3125 5 9.3125ZM5 6.8125C5.33203 6.8125 5.625 7.08594 5.625 7.4375C5.625 7.78906 5.33203 8.0625 5 8.0625C4.62891 8.0625 4.375 7.78906 4.375 7.4375C4.375 7.08594 4.64844 6.8125 5 6.8125ZM5.64453 2.75C6.42578 2.75 7.03125 3.35547 7.01172 4.11719C7.01172 4.58594 6.75781 5.03516 6.34766 5.28906L5.46875 5.83594V5.875C5.46875 6.12891 5.25391 6.34375 5 6.34375C4.74609 6.34375 4.53125 6.12891 4.53125 5.875V5.5625C4.53125 5.40625 4.60938 5.25 4.76562 5.15234L5.87891 4.48828C6.01562 4.41016 6.09375 4.27344 6.09375 4.11719C6.09375 3.88281 5.87891 3.6875 5.625 3.6875H4.62891C4.39453 3.6875 4.21875 3.88281 4.21875 4.11719C4.21875 4.37109 4.00391 4.58594 3.75 4.58594C3.49609 4.58594 3.28125 4.37109 3.28125 4.11719C3.28125 3.35547 3.88672 2.75 4.64844 2.75H5.64453Z" fill="#616161" />
                                            </svg>
                                        </button>


                                    </DropdownMenuItem>
                                </div>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    );
};
