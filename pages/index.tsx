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
  const endpoint: string = new URL('/api/graph', process.env.NEXT_PUBLIC_VERCEL_URL).toString()
  const items: GraphData = await (await fetch(endpoint)).json();
  // console.log(items)
  return { props: { items } }
}
export default IndexPage
