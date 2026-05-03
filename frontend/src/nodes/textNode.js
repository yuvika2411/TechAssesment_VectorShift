import React, { useState, useEffect, useRef, useMemo } from "react";
import { useUpdateNodeInternals } from "reactflow";
import BaseNode from "./BaseNode";

const TextNode = ({ id, selected }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;
    const matches = [...text.matchAll(regex)];
    return [...new Set(matches.map(match => match[1]))];
  }, [text]);

  console.log("Extracted variables:", variables);

  useEffect(() => {
    // Notify React Flow about dynamic handle changes
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <BaseNode 
      id={id} 
      title="Text Node" 
      selected={selected} 
      inputs={variables}
      outputs={["output"]}
      color="from-yellow-500 to-amber-400"
      handleColor="#facc15"
    >
      <div className="flex flex-col">
        <label className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest mb-2">Text</label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2.5 bg-[#110c24] border border-[#2c145e] rounded-lg resize-none overflow-hidden focus:outline-none focus:ring-1 focus:ring-[#facc15] text-gray-200 shadow-inner text-[13px] transition-all"
          rows={3}
        />
      </div>
    </BaseNode>
  );
};

export default TextNode;