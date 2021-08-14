import { NextApiRequest, NextApiResponse } from 'next'
import { GoogleApis, google } from 'googleapis'
import { User } from '../../../interfaces'

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
      range: 'data'
    })
    const rows = googleResponse.data.values

    if (!rows) {
      throw new Error('Cannot find user data')
    }

    const result = rows.slice(1).map((row): User => {
      return {
        id: row[0],
        name: row[1]
      }
    })
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
