import { NextApiRequest, NextApiResponse } from 'next'
import { GoogleApis, google } from 'googleapis'
import { GraphData, GraphNode, GraphLink } from '../../../interfaces'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
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

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
