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
    height: 600,
    backgroundColor: '#fff',
    nodeColor: "#9baf93",
    nodeRelSize: 2,
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

const ImpactGraph = ({ data }: Props) => (
    <ForceGraph2D
        height={params.height}
        backgroundColor={params.backgroundColor}
        graphData={data}
        nodeColor={params.nodeColor}
        nodeRelSize={params.nodeRelSize}
        nodeAutoColorBy={params.nodeAutoColorBy}
        nodeLabel={node => `
            id: ${node.id}<br>
            name: ${data.nodes[node.id].name}<br>
            group: ${Group[data.nodes[node.id].group]}<br>
            description: ${data.nodes[node.id].description}<br>
            point: ${data.nodes[node.id].point}
        `}
        nodeCanvasObject={(node, ctx) => nodePaint(node, ctx)}
        nodeVal={params.nodeVal}
        nodeCanvasObjectMode={() => 'after'}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
    />
)

export default ImpactGraph
