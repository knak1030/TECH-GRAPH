// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export type GraphNode = {
  id: number
  name: string
  group: number,
  point: number
}

export type GraphLink = {
  source: number,
  target: number,
  impact: number
}

export type GraphData = {
  nodes: GraphNode[],
  links: GraphLink[]
}

export type Label = {
  id: number,
  name: string,
  group: string
}

export const Group = {
  0: "development",
  1: "performance",
  2: "monitoring",
  3: "teaming"
}

export type Params = {
  height: number,
  backgroundColor: string,
  nodeColor: string,
  nodeRelSize: number,
  nodeAutoColorBy: string,
  nodeVal: string,
  nodeOpacity: number,
  nodeCanvasObjectMode: string
}
