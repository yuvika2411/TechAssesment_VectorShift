import { useState } from 'react';
import BaseNode from './BaseNode';

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode 
      id={id} 
      title="Input Node" 
      selected={selected} 
      outputs={[`${id}-value`]}
      color="from-green-500 to-emerald-400"
      handleColor="#4ade80"
    >
      <div className="flex flex-col gap-4">
        <label className="flex flex-col text-[11px] text-gray-400 font-semibold uppercase tracking-widest">
          Name
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            className="w-full mt-2 p-2.5 bg-[#110c24] border border-[#2c145e] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4ade80] text-gray-200 shadow-inner text-[13px] transition-all"
          />
        </label>
        <label className="flex flex-col text-[11px] text-gray-400 font-semibold uppercase tracking-widest">
          Type
          <select 
            value={inputType} 
            onChange={(e) => setInputType(e.target.value)}
            className="w-full mt-2 p-2.5 bg-[#110c24] border border-[#2c145e] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4ade80] text-gray-200 shadow-inner text-[13px] transition-all"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
