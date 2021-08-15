import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import ImpactGraph from '../components/ImpactGraph'
import { GraphData, GraphNode, GraphLink } from '../interfaces'
import { getLinks, getNodes } from './api/graph'

type Props = {
  items: GraphData
}

const IndexPage = ({ items }: Props) => (
  <Layout title="Relation">
    <ImpactGraph data={items} />
  </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: GraphData = await getGraphData()
  return { props: { items } }
}
export default IndexPage

const getGraphData = async (): Promise<GraphData> => {
    const linkData: GraphLink[] = await getLinks()

    const nodeData: GraphNode[] = (await getNodes()).map((node): GraphNode => {
        const filteredArr = linkData.filter(link => link.target == node.id);
        node.point = 0
        if (filteredArr.length > 0) {
            node.point = filteredArr.map(link => link.impact)
                .reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue))
            node.point *= 10
        }
        return node
    })

    const result: GraphData = {
        nodes: nodeData,
        links: linkData
    }
    console.log(result)

    return result;
}