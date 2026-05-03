import React, { useState } from 'react';
import { SubmitButton } from './submit';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export const PipelineToolbar = () => {
    const [name, setName] = useState("VectorShift Pipeline 1");

    const handleExportPNG = () => {
        const el = document.querySelector('.react-flow');
        if(!el) return;
        toPng(el, { backgroundColor: '#0a0814' }).then((dataUrl) => {
            const link = document.createElement('a');
            link.download = `${name}.png`;
            link.href = dataUrl;
            link.click();
        });
    };

    const handleExportPDF = () => {
        const el = document.querySelector('.react-flow');
        if(!el) return;
        toPng(el, { backgroundColor: '#0a0814' }).then((dataUrl) => {
            const pdf = new jsPDF({ orientation: 'landscape' });
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${name}.pdf`);
        });
    };

    return (
        <div className="flex items-center justify-between px-8 py-4 bg-[#0a0814] border-b border-[#2c145e] z-20 relative shadow-md">
            <div className="flex items-center gap-4">
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent text-white text-[20px] font-bold tracking-wide focus:outline-none focus:ring-1 focus:ring-[#7c5cfc] rounded px-2 py-1 min-w-[300px] hover:bg-[#1a1438]/50 transition-colors cursor-text border border-transparent hover:border-[#3b1c82]"
                />
            </div>
            <div className="flex items-center gap-3">
                <button onClick={handleExportPNG} className="bg-[#1a1438] hover:bg-[#2c145e] text-[#c4b5fd] hover:text-white font-semibold py-2 px-4 rounded-lg border border-[#3b1c82] transition-colors text-[13px] flex items-center gap-2">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                    PNG
                </button>
                <button onClick={handleExportPDF} className="bg-[#1a1438] hover:bg-[#2c145e] text-[#c4b5fd] hover:text-white font-semibold py-2 px-4 rounded-lg border border-[#3b1c82] transition-colors text-[13px] flex items-center gap-2">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                    PDF
                </button>
                <div className="w-[1px] h-8 bg-[#2c145e] mx-2"></div>
                <SubmitButton />
            </div>
        </div>
    );
};
