import { GraphNode, GraphLink } from '../../../interfaces'
import { GoogleApis, google } from 'googleapis'

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

export const getLinks = async (): Promise<GraphLink[]> => {
    const targetGoogleResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'target impact'
      })
    const targetRows = targetGoogleResponse.data.values

    const relationData = targetRows.slice(1).filter(item => Number(item[2]) > 0);
    if (!relationData) {
        throw new Error('Cannot find user data')
    }
    
    const linkData: GraphLink[] = relationData.map(item => {
        return {
            source: Number(item[0]),
            target: Number(item[1]),
            impact: Number(item[2])
        }
    });
    
    return linkData
}

export const getNodes = async (): Promise<GraphNode[]> => {
    const googleResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'source'
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
        point: Number(row[3]),
        description: row[4]
      }
    })

    return nodeData
}