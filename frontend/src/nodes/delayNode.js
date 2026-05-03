import React from "react";
import BaseNode from "./BaseNode";

export const DelayNode = ({ id, selected }) => {
    return (
        <BaseNode 
            id={id} 
            title="Delay Node" 
            nodeType="processing"
            selected={selected} 
            inputs={["input"]}
            outputs={["output"]}
            color="from-pink-500 to-rose-400"
            handleColor="#ec4899"
        >
            <div className="text-[13px] text-purple-200/70">Pause execution flow.</div>
        </BaseNode>
    );
};
