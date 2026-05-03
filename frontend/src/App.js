import { ReactFlowProvider } from 'reactflow';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { Sidebar } from './sidebar';

function App() {
  return (
    <div className="flex flex-col h-screen bg-[#0a0814] overflow-hidden text-gray-200 font-sans">
      <PipelineToolbar />
      <div className="flex flex-1 relative overflow-hidden">
        <Sidebar />
        <div className="flex-1 relative">
          <ReactFlowProvider>
            <PipelineUI />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
