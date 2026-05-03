import React from "react";
import BaseNode from "./BaseNode";

export const LoggerNode = () => {
    return (
        <BaseNode
            title="Logger Node"
            inputs={["input"]}
        >
            <div>Log output</div>
        </BaseNode>
    );
};
