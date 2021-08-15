import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Graph from '../components/Graph'
import { GraphData, GraphNode, GraphLink } from '../interfaces'
import { GoogleApis, google } from 'googleapis'

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
    const googleapis = new GoogleApis()
    const jwt = new googleapis.auth.JWT(
      process.env.GCP_SERVICEACCOUNT_EMAIL,
      undefined,
      (process.env.GCP_SERVICEACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    )
    const sheets = google.sheets({
      version: 'v4',
      auth: jwt
    })
    const googleResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'graph'
    })
    const rows = googleResponse.data.values

    if (!rows) {
      throw new Error('Cannot find user data')
    }

    const nodeData: GraphNode[] = rows.slice(1).map((row): GraphNode => {
      return {
        id: Number(row[0]),
        name: row[1],
        group: Number(row[2]),
        tag: row[3].split(','),
        point: Number(row[4]),
        description: row[5]
      }
    })

    const linkData: GraphLink[] = nodeData.map((node): GraphLink[] => (
        node.tag.map(item => ({
            "source": node.id,
            "target": Number(item)
        }))
      )).flat()
    
    const result: GraphData = {
        nodes: nodeData,
        links: linkData
    }

    return result;
}