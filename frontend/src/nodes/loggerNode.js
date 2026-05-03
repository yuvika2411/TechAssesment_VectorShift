import React from "react";
import BaseNode from "./BaseNode";

export const LoggerNode = ({ id, selected }) => {
    return (
        <BaseNode 
            id={id} 
            title="Logger Node" 
            nodeType="output"
            selected={selected} 
            inputs={["input"]}
            color="from-teal-500 to-emerald-400"
            handleColor="#14b8a6"
        >
            <div className="text-[13px] text-purple-200/70">Log outputs to the console.</div>
        </BaseNode>
    );
};
