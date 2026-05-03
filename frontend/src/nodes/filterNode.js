import React from "react";
import BaseNode from "./BaseNode";

export const FilterNode = () => {
    return (
        <BaseNode
            title="Filter Node"
            inputs={["data"]}
            outputs={["filtered"]}
        >
            <div>Filter data</div>
        </BaseNode>
    );
};
