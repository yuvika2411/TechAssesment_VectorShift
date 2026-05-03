import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Background, MiniMap, ConnectionMode, Panel, useReactFlow, useViewport } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from "./nodes/inputNode";
import { OutputNode } from "./nodes/outputNode";
import { LLMNode } from "./nodes/llmNode";
import TextNode from './nodes/textNode';

import { MathNode } from "./nodes/mathNode";
import { ApiNode } from "./nodes/apiNode";
import { FilterNode } from "./nodes/filterNode";
import { LoggerNode } from "./nodes/loggerNode";
import { DelayNode } from "./nodes/delayNode";

import 'reactflow/dist/style.css';

const gridSize = 25;
const proOptions = { hideAttribution: true };
const defaultEdgeOptions = { 
  style: { 
    stroke: '#7c5cfc', 
    strokeWidth: 2, 
    filter: 'drop-shadow(0 0 5px rgba(124, 92, 252, 0.4))'
  },
  animated: true,
  type: 'smoothstep' 
};
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,

  math: MathNode,
  api: ApiNode,
  filter: FilterNode,
  logger: LoggerNode,
  delay: DelayNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const CustomControls = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { zoom } = useViewport();
  const zoomPercentage = Math.round(zoom * 100);

  const isLocked = useStore(state => state.isLocked);
  const toggleLock = useStore(state => state.toggleLock);
  const undo = useStore(state => state.undo);
  const redo = useStore(state => state.redo);
  const past = useStore(state => state.past);
  const future = useStore(state => state.future);

  const handleExpand = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(()=>{});
  }

  const handleCollapse = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(()=>{});
  }

  return (
    <>
      <Panel position="bottom-right" style={{ marginBottom: '175px', marginRight: '15px' }} className="pointer-events-auto flex items-center bg-[#1a1438] border border-[#2c145e] rounded-lg p-1 shadow-[0_0_15px_rgba(0,0,0,0.5)] gap-0.5 z-50">
        <button onClick={toggleLock} className={`p-1.5 rounded transition-colors ${isLocked ? 'text-white bg-[#3b1c82]' : 'text-[#c4b5fd] hover:text-white hover:bg-[#2c145e]'}`} title={isLocked ? "Screen Locked" : "Screen Unlocked"}>
          {isLocked ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
          )}
        </button>
        <button onClick={undo} disabled={past.length === 0} className={`p-1.5 rounded transition-colors ${past.length > 0 ? 'text-[#c4b5fd] hover:text-white hover:bg-[#2c145e]' : 'text-[#c4b5fd]/30 cursor-not-allowed'}`} title="Undo">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
        </button>
        <button onClick={redo} disabled={future.length === 0} className={`p-1.5 rounded transition-colors ${future.length > 0 ? 'text-[#c4b5fd] hover:text-white hover:bg-[#2c145e]' : 'text-[#c4b5fd]/30 cursor-not-allowed'}`} title="Redo">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
        </button>
        <button onClick={() => { if(document.fullscreenElement) handleCollapse(); else handleExpand(); }} className="p-1.5 text-[#c4b5fd] hover:text-white hover:bg-[#2c145e] rounded transition-colors" title="Toggle Fullscreen">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </button>
      </Panel>

      <Panel position="bottom-right" style={{ marginBottom: '15px', marginRight: '230px' }} className="pointer-events-auto flex flex-col items-center gap-2 z-50">
        <span className="text-[#c4b5fd] font-bold text-[11px] tracking-wide bg-[#110c24] px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(0,0,0,0.5)]">{zoomPercentage}%</span>
        <div className="flex flex-col bg-[#1a1438] border border-[#2c145e] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden w-[32px]">
          <button onClick={() => zoomIn({ duration: 200 })} className="py-2 flex justify-center text-[#c4b5fd] hover:text-white hover:bg-[#2c145e] border-b border-[#2c145e] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </button>
          <button onClick={() => zoomOut({ duration: 200 })} className="py-2 flex justify-center text-[#c4b5fd] hover:text-white hover:bg-[#2c145e] border-b border-[#2c145e] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/></svg>
          </button>
          <button onClick={() => fitView({ duration: 200 })} className="py-2 flex justify-center text-[#c4b5fd] hover:text-white hover:bg-[#2c145e] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 9h6v6H9z" fill="currentColor"/></svg>
          </button>
        </div>
      </Panel>
    </>
  );
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  const isLocked = useStore(state => state.isLocked);
  const showGrid = useStore(state => state.showGrid);
  const isPanMode = useStore(state => state.isPanMode);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const deleteEdge = useStore(state => state.deleteEdge);
  const onEdgeClick = (event, edge) => {
      event.stopPropagation();
      deleteEdge(edge.id);
  };

  return (
    <>
      <div ref={reactFlowWrapper} className="absolute inset-0 bg-[#0a0814] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1438_0%,_#0a0814_100%)] pointer-events-none z-0"></div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onEdgeClick={onEdgeClick}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
          defaultEdgeOptions={defaultEdgeOptions}
          connectionMode={ConnectionMode.Loose}
          edgesReconnectable={true}
          nodesDraggable={!isLocked}
          nodesConnectable={!isLocked}
          elementsSelectable={!isLocked}
          panOnDrag={!isLocked}
          zoomOnScroll={!isLocked}
          zoomOnPinch={!isLocked}
          zoomOnDoubleClick={!isLocked}
        >
          <Background color="#2c145e" gap={gridSize * 2} lineWidth={1} variant="lines" className="opacity-[0.3]" />
          <CustomControls />
          <MiniMap 
            style={{ 
              backgroundColor: '#14082c', 
              border: '1px solid #2c145e',
              borderRadius: '8px'
            }}
            nodeColor={(node) => {
              return '#7c5cfc';
            }}
            maskColor="rgba(10, 8, 20, 0.7)"
          />
        </ReactFlow>
      </div>
    </>
  )
}
