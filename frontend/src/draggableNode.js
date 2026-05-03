export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const getIcon = () => {
        switch(type) {
            case 'customInput': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M4 12l4-4m-4 4 4 4"/></svg>;
            case 'customOutput': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-4 4 4-4-4-4"/></svg>;
            case 'llm': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a2 2 0 0 1 2 2c0 4.4 3.6 8 8 8a2 2 0 0 1 0 4c-4.4 0-8 3.6-8 8a2 2 0 0 1-4 0c0-4.4-3.6-8-8-8a2 2 0 0 1 0-4c4.4 0 8-3.6 8-8a2 2 0 0 1 2-2Z"/></svg>;
            case 'text': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>;
            case 'math': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5v14M19 5l-4 4M5 19l4-4"/></svg>;
            case 'api': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
            case 'filter': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>;
            case 'logger': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m4 12 5 5L20 7"/></svg>;
            case 'delay': return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
            default: return null;
        }
    };

    return (
      <div
        className="cursor-grab border border-[#3b1c82] bg-[#110c24] hover:bg-[#2c145e] hover:border-[#7c5cfc] px-3 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2.5 w-full group text-[#c4b5fd] hover:text-white shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(124,92,252,0.3)] hover:-translate-y-0.5"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <div className="text-[#7c5cfc] group-hover:text-[#a78bfa] transition-colors bg-[#1a1438] group-hover:bg-[#3b1c82] p-1.5 rounded-md shadow-inner border border-[#2c145e] group-hover:border-[#7c5cfc] z-10">
              {getIcon()}
          </div>
          <span className="text-[12px] font-bold tracking-wider z-10">{label}</span>
      </div>
    );
};
  