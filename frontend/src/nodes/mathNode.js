import React from "react";
import BaseNode from "./BaseNode";

export const MathNode = ({ id, selected }) => {
    return (
        <BaseNode 
            id={id} 
            title="Math Node" 
            nodeType="processing"
            selected={selected} 
            inputs={["num1", "num2"]}
            outputs={["result"]}
            color="from-red-500 to-rose-400"
            handleColor="#ef4444"
        >
            <div className="text-[13px] text-purple-200/70">Perform mathematical operations.</div>
        </BaseNode>
    );
};