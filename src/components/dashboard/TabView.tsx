import React, { useState } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { IChartDatum, TTab } from "../../interfaces";
import { GetListResponse } from "@refinedev/core";

type TTabViewProps = {
    tabs: TTab[];
};

export const TabView = ({ tabs }: TTabViewProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const [showPanel, setShowPanel] = useState(true);
    return (
        <div className="mx-auto py-1 bg-slate-50 border rounded-2xl drop-shadow-md">
            <div className="flex">
                {tabs?.map((tab: TTab, index: number) => (
                    <TabItem
                        key={tab?.id}
                        label={tab?.label}
                        data={tab?.data}
                        isActive={index === activeTab}
                        clickHandler={() => setActiveTab(index)}
                    />
                ))}
                <div className=" w-1/6 mr-2 collapse collapse-arrow ">
                    <p className="collapse-title pt-8 hover:cursor-pointer" onClick={() => setShowPanel(!showPanel)}>
                        <svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 12.75C12.2891 12.75 12.1016 12.6797 11.9609 12.5391L7.46094 8.03906C7.15625 7.75781 7.15625 7.26562 7.46094 6.98438C7.74219 6.67969 8.23438 6.67969 8.51562 6.98438L12.5 10.9453L16.4609 6.98438C16.7422 6.67969 17.2344 6.67969 17.5156 6.98438C17.8203 7.26562 17.8203 7.75781 17.5156 8.03906L13.0156 12.5391C12.875 12.6797 12.6875 12.75 12.5 12.75Z" fill="black" fill-opacity="0.5" />
                        </svg>
                    </p>
                </div>

            </div>
            {showPanel && <div className="mx-auto">
                {tabs?.map((tab: TTab, index: number) => (
                    <TabPanel key={tab?.id} isActive={index === activeTab}>
                        {tab?.content}
                    </TabPanel>
                ))}
            </div>}

        </div>
    );
};
