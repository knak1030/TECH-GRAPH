import { User, GraphNode, GraphLink, GraphData } from '../interfaces'

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
  { id: 104, name: 'Dave' },
  { id: 105, name: 'Daveeee' },
]

const nodes: GraphNode[] = [
  {
    id: 0,
    name: "React",
    group: 1,
    point: 50
  },
  {
    id: 1,
    name: "Vue.js",
    group: 1,
    point: 10
  },
  {
    id: 2,
    name: "JS",
    group: 0,
    point: 30
  },
  {
    id: 3,
    name: "JS-class-syntax",
    group: 2,
    point: 0
  },
  {
    id: 4,
    name: "TS",
    group: 0,
    point: 10
  },
]

const links: GraphLink[] = [
  {
    source: 0,
    target: 1,
    impact: 0.5
  },
  {
    source: 0,
    target: 2,
    impact: 1
  },
  {
    source: 0,
    target: 3,
    impact: 0
  }
]

export const graphData: GraphData = {
  nodes: nodes,
  links: links
}