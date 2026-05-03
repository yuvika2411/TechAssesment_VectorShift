import React from "react";
import BaseNode from "./BaseNode";

export const DelayNode = () => {
    return (
        <BaseNode
            title="Delay Node"
            inputs={["input"]}
            outputs={["output"]}
        >
            <div>Delay execution</div>
        </BaseNode>
    );
};
