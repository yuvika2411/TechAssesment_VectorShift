import React from "react";
import BaseNode from "./BaseNode";

export const ApiNode = ({ id, selected }) => {
    return (
        <BaseNode 
            id={id} 
            title="API Node" 
            nodeType="processing"
            selected={selected} 
            inputs={["url"]}
            outputs={["response"]}
            color="from-cyan-500 to-teal-400"
            handleColor="#06b6d4"
        >
            <div className="text-[13px] text-purple-200/70">Make external HTTP requests.</div>
        </BaseNode>
    );
};