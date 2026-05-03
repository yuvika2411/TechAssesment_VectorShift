# VectorShift Frontend Assessment

## Features
- Reusable BaseNode abstraction
- Multiple node types (Input, Output, Text, Math, API, etc.)
- Dynamic TextNode:
  - Auto-resizing textarea
  - Detects {{variables}} and creates input handles
- Backend integration (FastAPI):
  - Counts nodes and edges
  - Checks if pipeline is a DAG
- Run Pipeline button shows results via alert

## Tech Stack
- React + React Flow
- Tailwind CSS
- FastAPI (Python)

## How to Run

### Frontend
cd frontend
npm install
npm start

### Backend
cd backend
pip install fastapi uvicorn
python -m uvicorn main:app --reload

## Usage
- Drag nodes
- Connect them
- Add {{variables}} in TextNode
- Click "Run Pipeline"

## Output Example
Nodes: 3  
Edges: 2  
Is DAG: true
