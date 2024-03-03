import { useState } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TTab } from "../../interfaces";
import { Button } from "@/components/shadcn/ui/button"
import {
    Collapsible,
    CollapsibleTrigger,
} from "@/components/shadcn/ui/collapsible"

type TTabViewProps = {
    tabs: TTab[];
};

export const TabView = ({ tabs }: TTabViewProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const [showPanel, setShowPanel] = useState(true);
    return (
        <div className="p-2 mx-auto max-w-[861px] h-fit  bg-slate-50 border rounded-2xl drop-shadow-md">
            <div className="flex flex-row gap-2">
                {tabs?.slice(0, 4).map((tab: TTab, index: number) => (
                    <TabItem
                        key={tab?.id}
                        label={tab?.label}
                        index={index}
                        data={tab?.data}
                        tabs={tabs}
                        isActive={index === activeTab}
                        clickHandler={() => setActiveTab(index)}
                    />
                ))}
                <Collapsible
                    open={showPanel}
                    onOpenChange={setShowPanel}
                    className="space-y-2"
                >
                    <CollapsibleTrigger asChild>
                        <Button variant="secondary" size="sm" className=" mt-4">
                            {showPanel ?
                                (<svg width="11" height="7" viewBox="0 0 11 7" fill="none" transform="scale(1,-1)" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 6.75C5.28906 6.75 5.10156 6.67969 4.96094 6.53906L0.460938 2.03906C0.15625 1.75781 0.15625 1.26562 0.460938 0.984375C0.742188 0.679688 1.23438 0.679688 1.51562 0.984375L5.5 4.94531L9.46094 0.984375C9.74219 0.679688 10.2344 0.679688 10.5156 0.984375C10.8203 1.26562 10.8203 1.75781 10.5156 2.03906L6.01562 6.53906C5.875 6.67969 5.6875 6.75 5.5 6.75Z" fill="black" fill-opacity="0.5" />
                                </svg>)
                                : (<svg width="11" height="7" viewBox="0 0 11 7" fill="none" transform="scale(-1,1)" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 6.75C5.28906 6.75 5.10156 6.67969 4.96094 6.53906L0.460938 2.03906C0.15625 1.75781 0.15625 1.26562 0.460938 0.984375C0.742188 0.679688 1.23438 0.679688 1.51562 0.984375L5.5 4.94531L9.46094 0.984375C9.74219 0.679688 10.2344 0.679688 10.5156 0.984375C10.8203 1.26562 10.8203 1.75781 10.5156 2.03906L6.01562 6.53906C5.875 6.67969 5.6875 6.75 5.5 6.75Z" fill="black" fill-opacity="0.5" />
                                </svg>)}
                        </Button>
                    </CollapsibleTrigger>
                </Collapsible>

            </div>
            {showPanel &&
                <div className="w-[850px] pr-3">
                    {tabs?.map((tab: TTab, index: number) => (
                        <TabPanel key={tab?.id} isActive={index === activeTab}>
                            {tab?.content}
                        </TabPanel>
                    ))}
                </div>}

        </div>
    );
};
