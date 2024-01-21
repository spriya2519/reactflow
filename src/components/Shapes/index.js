import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges} from 'reactflow';

import Rectangle from './Rectangle.js';
import 'reactflow/dist/style.css';
import './text-updater-node.css';
import { MarkerType } from 'reactflow';
import { Grid } from '@mui/material';
const rfStyle = {
  backgroundColor: 'black',
};

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {  rectangle: Rectangle };

function ShapeFlow() {

  const initialNodes = [
    { id: '1', type: 'rectangle', position: { x: 600, y: 10 }, data: { value: 1, text: 'CEO', name: "Priya", color: 'black', bgcolor: '#FB8F78' } },
    { id: '2', type: 'rectangle', position: { x: 200, y: 150 }, data: { value: 2, name: "Rakshit", text: ' Marketing Director ', color: 'black', bgcolor: '#FADF5B' } },
    { id: '3', type: 'rectangle', position: { x: 600, y: 150 }, data: { value: 3, name: "Hemanth", text: ' Finance Director', color: 'black', bgcolor: '#FADF5B' } },
    { id: '4', type: 'rectangle', position: { x: 1000, y: 150 }, data: { value: 4, name: "Rachaya", e: "Rachaya", text: ' HR Director', color: 'black', bgcolor: '#FADF5B' } },
    { id: '5', type: 'rectangle', position: { x: 200, y: 300 }, data: { value: 5, name: "Navya", text: ' Manager 1', color: 'black', bgcolor: '#FAC35B' } },
    { id: '6', type: 'rectangle', position: { x: 600, y: 300 }, data: { value: 6, name: "Kalvin", text: ' Manager 2', color: 'black', bgcolor: '#FAC35B' } },
    { id: '7', type: 'rectangle', position: { x: 1000, y: 300 }, data: { value: 7, name: "Ria", text: ' Manager 3', color: 'black', bgcolor: '#FAC35B' } },
    { id: '8', type: 'rectangle', position: { x: 50, y: 450 }, data: { value: 8, name: "Ajay", text: ' Worker', color: 'black', bgcolor: '#86FA5B' } },
    { id: '9', type: 'rectangle', position: { x: 350, y: 450 }, data: { value: 9, name: "Dinesh", text: ' Worker', color: 'black', bgcolor: '#86FA5B' } },
    { id: '10', type: 'rectangle', position: { x: 600, y: 450 }, data: { value: 10, name: "Jyothi", text: ' Worker', color: 'black', bgcolor: '#86FA5B' } },
    { id: '11', type: 'rectangle', position: { x: 850, y: 450 }, data: { value: 11, name: "Adithya", text: ' Worker', color: 'black', bgcolor: '#86FA5B' } },
    { id: '12', type: 'rectangle', position: { x: 1150, y: 450 }, data: { value: 12, name: "Pavithra", text: ' Worker', color: 'black', bgcolor: '#86FA5B' } },
    { id: '13', type: 'rectangle', position: { x: 200, y: 550 }, data: { value: 13, name: "Mithun", text: ' Worker', color: 'black', bgcolor: '#B45BFA' } },
    { id: '14', type: 'rectangle', position: { x: 450, y: 550 }, data: { value: 14, name: "Jay", text: ' Worker', color: 'black', bgcolor: '#B45BFA' } },
    { id: '15', type: 'rectangle', position: { x: 750, y: 550 }, data: { value: 15, name: "Kousliya", text: ' Worker', color: 'black', bgcolor: '#B45BFA' } },
    { id: '16', type: 'rectangle', position: { x: 1000, y: 550 }, data: { value: 16, name: "Varsha", text: ' Worker', color: 'black', bgcolor: '#B45BFA' } },
  ];
  const initialEdges = [{ id: '1', source: '1', target: '2', type: 'step', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '2', source: '1', target: '3', type: 'step', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '3', source: '1', target: '4', type: 'step', stroke: 'red', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '4', source: '2', target: '5', type: 'step', stroke: '#fff', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '5', source: '3', target: '6', type: 'step', stroke: '#fff', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '6', source: '4', target: '7', type: 'step', stroke: '#fff', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '7', source: '5', target: '8', type: 'step', stroke: '#fff', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '8', source: '5', target: '9', type: 'step', stroke: '#fff', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '9', source: '6', target: '10', type: 'step', stroke: '#fff', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '10', source: '7', target: '11', type: 'step', stroke: '#fff', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '11', source: '7', target: '12', type: 'step', stroke: '#fff', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '12', source: '9', target: '13', type: 'step', stroke: '#fff', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '13', source: '9', target: '14', type: 'step', stroke: '#fff', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '14', source: '11', target: '15', type: 'step', stroke: '#fff', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },
  { id: '15', source: '11', target: '16', type: 'step', stroke: '#fff', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: 'white', strokeWidth: 2 } },

  ];
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // const handleSetbtnArray = () => { 
  //   setBtnArray((prev)=> btnArray.push('scghsvdghsvc'));
  //   console.log(btnArray)
  //   setNodes([...nodes])
  // }


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (


    <Grid item xs={12} sm={6} md={8} className="full-screen-background">
      <div style={{ width: '100%', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          style={rfStyle}
        />
      </div>
      <center>
        <footer style={{ color: "white", backgroundColor: "black", textAlign: "center", marginTop: '0rem', fontFamily: "-moz-initial" }}>
          &copy; 2024 Priya. All rights reserved.<br></br>
          <hr></hr>
          *What is the goal of the app?
          The primary objective of this project is to create a comprehensive
          workflow visualization dashboard using ReactFlow, a powerful React library designed for
          constructing interactive node-based graphs.<br></br>
          <hr></hr>
        </footer>
      </center>

    </Grid>


  );
}

export default ShapeFlow;
