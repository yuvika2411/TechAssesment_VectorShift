import { useState } from 'react';
import BaseNode from './BaseNode';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode 
      id={id} 
      title="Output Node" 
      selected={selected} 
      inputs={[`${id}-value`]}
      color="from-purple-500 to-fuchsia-400"
      handleColor="#c084fc"
    >
      <div className="flex flex-col gap-4">
        <label className="flex flex-col text-[11px] text-gray-400 font-semibold uppercase tracking-widest">
          Name
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            className="w-full mt-2 p-2.5 bg-[#110c24] border border-[#2c145e] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c084fc] text-gray-200 shadow-inner text-[13px] transition-all"
          />
        </label>
        <label className="flex flex-col text-[11px] text-gray-400 font-semibold uppercase tracking-widest">
          Type
          <select 
            value={outputType} 
            onChange={(e) => setOutputType(e.target.value)}
            className="w-full mt-2 p-2.5 bg-[#110c24] border border-[#2c145e] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c084fc] text-gray-200 shadow-inner text-[13px] transition-all"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
