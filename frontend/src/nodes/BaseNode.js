import React from "react";
import { Handle, Position } from "reactflow";

const BaseNode = ({ title, inputs = [], outputs = [], children }) => {
    return (
        <div style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            background: "#fff",
            minWidth: "180px"
        }}>
            <div style={{ fontWeight: "bold" }}>{title}</div>

            {inputs.map((input, i) => (
                <Handle
                    key={input}
                    type="target"
                    position={Position.Left}
                    id={input}
                    style={{ top: 30 + i * 20 }}
                />
            ))}

            <div>{children}</div>

            {outputs.map((output, i) => (
                <Handle
                    key={output}
                    type="source"
                    position={Position.Right}
                    id={output}
                    style={{ top: 30 + i * 20 }}
                />
            ))}
        </div>
    );
};

export default BaseNode;