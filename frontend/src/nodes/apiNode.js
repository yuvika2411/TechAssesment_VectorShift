import React from "react";
import BaseNode from "./BaseNode";

export const ApiNode = () => {
    return (
        <BaseNode
            title="API Node"
            inputs={["url"]}
            outputs={["response"]}
        >
            <div>Fetch API</div>
        </BaseNode>
    );
};