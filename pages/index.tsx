import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Graph from '../components/Graph'
import { GraphData } from '../interfaces'
import { getLinks, getNodes } from './api/graph'

type Props = {
  items: GraphData
}

const IndexPage = ({ items }: Props) => (
  <Layout title="Graph">
    <Graph data={items} />
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
    const result: GraphData = {
        nodes: await getNodes(),
        links: await getLinks()
    }

    return result;
}