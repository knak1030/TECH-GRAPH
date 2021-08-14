import * as React from 'react'
import { GraphData, Group, Params } from '../interfaces'
import dynamic from 'next/dynamic';
const ForceGraph2D = dynamic(() => import('../components/ForceGraph2D'), {
  ssr: false,
});

type Props = {
    data: GraphData
}

const params: Params = {
    backgroundColor: '#fff',
    nodeColor: "#9baf93",
    nodeRelSize: 3,
    nodeAutoColorBy: "group",
    nodeVal: "point",
    nodeOpacity: 0.7,
    nodeCanvasObjectMode: 'after'
}

function nodePaint(node, ctx) {
    ctx.fillStyle = '#333';
    ctx.font = '8px Roboto';  
    ctx.fillText(node.name, node.x, node.y);
}

const Graph = ({ data }: Props) => (
    <ForceGraph2D
        backgroundColor={params.backgroundColor}
        graphData={data}
        nodeColor={params.nodeColor}
        nodeRelSize={params.nodeRelSize}
        nodeAutoColorBy={params.nodeAutoColorBy}
        nodeLabel={node => `
            id: ${node.id}<br>
            name: ${data.nodes[node.id].name}<br>
            group: ${Group[data.nodes[node.id].group]}<br>
            description: ${data.nodes[node.id].description}
        `}
        nodeCanvasObject={(node, ctx) => nodePaint(node, ctx)}
        nodeVal={params.nodeVal}
        nodeCanvasObjectMode={() => 'after'}
    />
)

export default Graph
