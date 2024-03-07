import { useState } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TTab } from "../../interfaces";
import { Button } from "@/components/shadcn/ui/button"
import { CollapsibleIcon } from "../icons/svg";
import {
    Collapsible,
    CollapsibleTrigger,
} from "@/components/shadcn/ui/collapsible"

type TTabViewProps = {
    tabs: TTab[];
};

export const TabView = ({ tabs }: TTabViewProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const [chart, setChart] = useState(0);
    const [showPanel, setShowPanel] = useState(true);

    return (
        <div className=" mr-auto ml-12 p-2 max-w-[920px] h-fit  bg-slate-50 border rounded-2xl drop-shadow-md">
            <div className="flex flex-row gap-2">
                {tabs?.slice(0, 4).map((tab: TTab, index: number) => (
                    <TabItem
                        key={tab?.id}
                        currentTab={index}
                        tabs={tabs}
                        isActive={index === activeTab}
                        clickHandler={(num?: number) => { setActiveTab(index); num ? setChart(num) : null }}
                        chart={(num: number) => setChart(num)}
                    />
                ))}
                <Collapsible
                    open={showPanel}
                    onOpenChange={setShowPanel}
                    className="space-y-2"
                >
                    <CollapsibleTrigger asChild>
                        <Button variant="secondary" size="sm" className=" mt-4">
                            {showPanel ? (<CollapsibleIcon transform="scale(1,-1)" />)
                                : (<CollapsibleIcon transform="scale(-1,1)" />)}
                        </Button>
                    </CollapsibleTrigger>
                </Collapsible>
            </div>
            {showPanel &&
                <div className="w-[850px] pr-3">
                    {tabs?.map((tab: TTab, index: number) => (
                        <TabPanel key={tab?.id} isActive={index === activeTab}>
                            {tabs[chart]?.content}
                        </TabPanel>
                    ))}
                </div>}


        </div>
    );
};
