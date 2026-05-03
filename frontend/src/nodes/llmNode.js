import BaseNode from './BaseNode';

export const LLMNode = ({ id, selected }) => {
  return (
    <BaseNode 
      id={id} 
      title="LLM Node" 
      nodeType="processing"
      selected={selected} 
      inputs={[`${id}-system`, `${id}-prompt`]}
      outputs={[`${id}-response`]}
      color="from-blue-500 to-cyan-400"
      handleColor="#3b82f6"
    >
      <div className="flex flex-col">
        <span className="text-[13px] text-purple-200/70">Connect systems and prompts to utilize a Large Language Model.</span>
      </div>
    </BaseNode>
  );
}
