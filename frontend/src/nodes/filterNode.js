import React from "react";
import BaseNode from "./BaseNode";

export const FilterNode = ({ id, selected }) => {
    return (
        <BaseNode 
            id={id} 
            title="Filter Node" 
            nodeType="processing"
            selected={selected} 
            inputs={["data"]}
            outputs={["filtered"]}
            color="from-orange-500 to-amber-400"
            handleColor="#f97316"
        >
            <div className="text-[13px] text-purple-200/70">Filter data conditionally.</div>
        </BaseNode>
    );
};
