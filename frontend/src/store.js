import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    past: [],
    future: [],
    
    _saveHistory: () => {
        const { nodes, edges, past } = get();
        const snapNodes = JSON.parse(JSON.stringify(nodes));
        const snapEdges = JSON.parse(JSON.stringify(edges));
        set({ past: [...past, { nodes: snapNodes, edges: snapEdges }], future: [] });
    },
    
    undo: () => {
        const { past, future, nodes, edges } = get();
        if (past.length === 0) return;
        
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        
        const currentSnapNodes = JSON.parse(JSON.stringify(nodes));
        const currentSnapEdges = JSON.parse(JSON.stringify(edges));
        
        set({
            past: newPast,
            future: [{ nodes: currentSnapNodes, edges: currentSnapEdges }, ...future],
            nodes: JSON.parse(JSON.stringify(previous.nodes)),
            edges: JSON.parse(JSON.stringify(previous.edges))
        });
    },
    
    redo: () => {
        const { past, future, nodes, edges } = get();
        if (future.length === 0) return;
        
        const next = future[0];
        const newFuture = future.slice(1);
        
        const currentSnapNodes = JSON.parse(JSON.stringify(nodes));
        const currentSnapEdges = JSON.parse(JSON.stringify(edges));
        
        set({
            past: [...past, { nodes: currentSnapNodes, edges: currentSnapEdges }],
            future: newFuture,
            nodes: JSON.parse(JSON.stringify(next.nodes)),
            edges: JSON.parse(JSON.stringify(next.edges))
        });
    },

    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        get()._saveHistory();
        set({
            nodes: [...get().nodes, node]
        });
    },
    duplicateNode: (id) => {
        get()._saveHistory();
        const node = get().nodes.find(n => n.id === id);
        if(!node) return;
        const newId = get().getNodeID(node.type);
        const newNode = {
            ...node,
            id: newId,
            position: { x: node.position.x + 30, y: node.position.y + 30 },
            selected: true,
            data: { ...node.data, id: newId }
        };
        const updatedNodes = get().nodes.map(n => ({...n, selected: false}));
        set({ nodes: [...updatedNodes, newNode] });
    },
    deleteNode: (id) => {
        get()._saveHistory();
        set({
            nodes: get().nodes.filter(node => node.id !== id),
            edges: get().edges.filter(edge => edge.source !== id && edge.target !== id)
        });
    },
    deleteEdge: (id) => {
        get()._saveHistory();
        set({
            edges: get().edges.filter(edge => edge.id !== id)
        });
    },
    onNodesChange: (changes) => {
      const isRemove = changes.some(c => c.type === 'remove');
      if (isRemove) get()._saveHistory();
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      const isRemove = changes.some(c => c.type === 'remove');
      if (isRemove) get()._saveHistory();
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      get()._saveHistory();
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    isLocked: false,
    toggleLock: () => set(state => ({ isLocked: !state.isLocked })),
    showGrid: true,
    toggleGrid: () => set(state => ({ showGrid: !state.showGrid })),
    isPanMode: true,
    togglePanMode: () => set(state => ({ isPanMode: !state.isPanMode })),
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      get()._saveHistory();
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
  }));
