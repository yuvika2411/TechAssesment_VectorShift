from fastapi import FastAPI
from pydantic import BaseModel
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root check
@app.get("/")
def read_root():
    return {"Ping": "Pong"}


# Request body structure
class Pipeline(BaseModel):
    nodes: list
    edges: list


# Main endpoint
@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Build graph
    graph = defaultdict(list)
    indegree = defaultdict(int)

    for edge in pipeline.edges:
        src = edge["source"]
        tgt = edge["target"]
        graph[src].append(tgt)
        indegree[tgt] += 1

    # Kahn's Algorithm for DAG check
    queue = [n["id"] for n in pipeline.nodes if indegree[n["id"]] == 0]
    visited = 0

    while queue:
        node = queue.pop(0)
        visited += 1

        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    is_dag = visited == num_nodes

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }