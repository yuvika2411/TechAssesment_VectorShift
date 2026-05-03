import React, { useState } from "react";
import BaseNode from "./BaseNode";

const TextNode = () => {
  const [text, setText] = useState("");

  return (
    <BaseNode
      title="Text Node"
      inputs={["input"]}
      outputs={["output"]}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%" }}
      />
    </BaseNode>
  );
};

export default TextNode;