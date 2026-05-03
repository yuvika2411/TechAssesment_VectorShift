import React from "react";
import BaseNode from "./BaseNode";

export const MathNode = () => {
    return (
        <BaseNode
            title="Math Node"
            inputs={["num1", "num2"]}
            outputs={["result"]}
        >
            <div>Add numbers</div>
        </BaseNode>
    );
};