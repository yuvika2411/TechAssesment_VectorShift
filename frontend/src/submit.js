import { useStore } from "./store";

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleRun = async () => {
        try {
            const res = await fetch("http://localhost:8000/pipelines/parse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nodes, edges })
            });

            const data = await res.json();

            alert(
                `Pipeline Analysis\n\n🔹 Nodes: ${data.num_nodes}\n🔹 Edges: ${data.num_edges}\n🔹 Is DAG: ${data.is_dag ? " Yes" : " No"}`
            );
        } catch (err) {
            console.error(err);
            alert("Error connecting to backend");
        }
    };

    return (
        <button
            onClick={handleRun}
            className="bg-[#7c5cfc] hover:bg-[#6d28d9] text-white font-bold py-2 px-6 rounded-lg shadow-[0_0_20px_rgba(124,92,252,0.4)] transition-all duration-300 hover:scale-105 border border-[#a78bfa]/30 tracking-wide text-[13px] flex items-center gap-2"
        >
            Run Pipeline
        </button>
    );
};