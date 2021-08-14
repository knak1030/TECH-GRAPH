import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Graph from '../components/Graph'
import { GraphData } from '../interfaces'

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
  const items: GraphData = await (await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/graph`)).json();
  // console.log(items)
  return { props: { items } }
}
export default IndexPage
