import React from "react";
import { Handle, Position } from "reactflow";
import { useStore } from '../store';

const BaseNode = ({ id, title, inputs = [], outputs = [], children, selected, color = "from-[#7c5cfc] to-[#a78bfa]", handleColor = "#7c5cfc" }) => {
    const duplicateNode = useStore(state => state.duplicateNode);
    const deleteNode = useStore(state => state.deleteNode);

    return (
        <div className={`relative rounded-2xl border ${selected ? 'border-[#7c5cfc] shadow-[0_0_30px_rgba(124,92,252,0.2)]' : 'border-[#2c145e] shadow-2xl'} transition-all duration-300 flex flex-col min-w-[300px] min-h-[120px] bg-[#0a0814]/95 backdrop-blur-xl group`}>
            
            <div className="relative bg-[#110c24]/80 text-[#f3f4f6] px-5 py-4 text-[14px] font-semibold tracking-wide rounded-t-2xl border-b border-[#2c145e] flex justify-between items-center overflow-hidden">
                {/* Colored top stripe perfectly contained within header */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${color}`}></div>

                <span className="flex items-center gap-2.5 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: handleColor, boxShadow: `0 0 8px ${handleColor}80` }}></div>
                    {title}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.5)] mt-1"></div>
            </div>

            <div className="p-6 text-[#c4b5fd]">
                {inputs.map((input, i) => (
                    <Handle
                        key={input}
                        type="target"
                        position={Position.Left}
                        id={input}
                        style={{
                            top: 40 + i * 30,
                            background: '#0a0814',
                            borderColor: handleColor,
                            borderWidth: '2px',
                            width: '14px',
                            height: '14px',
                            left: '-7px'
                        }}
                    />
                ))}

                <div className="flex flex-col gap-5">{children}</div>

                {outputs.map((output, i) => (
                    <Handle
                        key={output}
                        type="source"
                        position={Position.Right}
                        id={output}
                        style={{
                            top: 40 + i * 30,
                            background: '#0a0814',
                            borderColor: handleColor,
                            borderWidth: '2px',
                            width: '14px',
                            height: '14px',
                            right: '-7px'
                        }}
                    />
                ))}
            </div>
            
            {/* Footer Actions (Appears on Hover) */}
            <div className="mt-auto border-t border-[#2c145e] px-5 py-3 bg-[#110c24]/50 rounded-b-2xl flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => duplicateNode(id)} className="hover:text-[#c4b5fd] transition-colors flex items-center gap-1.5">
                    <span>⧉</span> Duplicate
                </button>
                <button onClick={() => deleteNode(id)} className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                    <span>✕</span> Delete
                </button>
            </div>
        </div>
    );
};

export default BaseNode;