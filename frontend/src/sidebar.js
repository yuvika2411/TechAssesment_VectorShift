import React from 'react';
import { useStore } from './store';
import { DraggableNode } from './draggableNode';

export const Sidebar = () => {
    // We can pull node/edge count for stats from the Zustand store
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    return (
        <div className="w-[300px] bg-[#0a0814] border-r border-[#2c145e]/60 flex flex-col z-10 shadow-2xl h-full relative overflow-hidden">
            {/* Sidebar Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#1a1438_0%,_transparent_70%)] pointer-events-none z-0"></div>
            
            {/* Node Library */}
            <div className="relative p-4 flex-1 z-10 overflow-hidden flex flex-col">
                <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center justify-between pb-2 border-b border-[#2c145e]/50">
                    <span>Library</span>
                    <span className="text-[9px] bg-[#1a1438] px-1.5 py-0.5 rounded text-[#c4b5fd] border border-[#2c145e]">Drag nodes</span>
                </h2>
                
                <div className="flex flex-col gap-3">
                    <div>
                        <h3 className="text-[9px] font-bold text-[#7c5cfc] uppercase tracking-widest mb-1.5 px-1">I/O</h3>
                        <div className="grid grid-cols-2 gap-1.5">
                            <DraggableNode type='customInput' label='Input' />
                            <DraggableNode type='customOutput' label='Output' />
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-[9px] font-bold text-[#7c5cfc] uppercase tracking-widest mb-1.5 px-1">Logic & AI</h3>
                        <div className="grid grid-cols-2 gap-1.5">
                            <DraggableNode type='llm' label='LLM' />
                            <DraggableNode type='text' label='Text' />
                            <DraggableNode type='math' label='Math' />
                            <DraggableNode type='api' label='API' />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[9px] font-bold text-[#7c5cfc] uppercase tracking-widest mb-1.5 px-1">Utilities</h3>
                        <div className="grid grid-cols-2 gap-1.5">
                            <DraggableNode type='filter' label='Filter' />
                            <DraggableNode type='logger' label='Logger' />
                            <DraggableNode type='delay' label='Delay' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Restored Pipeline Stats (No Status Row) */}
            <div className="relative p-5 border-t border-[#2c145e]/50 bg-[#0a0814]/80 backdrop-blur-md z-10">
                <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Pipeline Stats</h2>
                <div className="flex flex-col gap-2.5 text-[12px] text-[#c4b5fd]">
                    <div className="flex justify-between items-center bg-[#1a1438]/50 p-2 rounded-lg border border-[#3b1c82]/30">
                        <span>Active Nodes</span>
                        <span className="font-bold text-white bg-[#7c5cfc]/20 px-2 rounded">{nodes.length}</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#1a1438]/50 p-2 rounded-lg border border-[#3b1c82]/30">
                        <span>Connections</span>
                        <span className="font-bold text-white bg-[#7c5cfc]/20 px-2 rounded">{edges.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
