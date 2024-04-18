import React from "react";

type TTabPanelProps = {
    isActive: Boolean;
    children: JSX.Element;
};

export const TabPanel = ({ isActive, children }: TTabPanelProps) => {
    return isActive ? <div className="sm:mx-auto py-2">{children}</div> : null;
};
