import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

// Google Sheets configuration
const SPREADSHEET_ID = '1IiAJ_9eTnh46lgx5BMzv3PN1lpxhotEbUbQW6yHQGGc';
const SHEET_NAME = 'Folha1';
const RANGE = 'A1'; // Start appending at the first row

// Initialize Google Sheets client
async function getGoogleSheetsClient() {
  // Check if we have the required environment variables
  const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
  
  if (!credentials) {
    throw new Error('Missing Google Sheets credentials in environment variables');
  }

  try {
    const parsedCredentials = JSON.parse(credentials);
    
    const auth = new google.auth.GoogleAuth({
      credentials: parsedCredentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    // Create the sheets client with the correct typing
    return google.sheets({ version: 'v4', auth: client });

  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, phone } = data;

    // Validate input
    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Email and phone are required' },
        { status: 400 }
      );
    }

    // Get Google Sheets client
    const sheets = await getGoogleSheetsClient();

    // Append data to the spreadsheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!${RANGE}`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[email, phone]],
      },
    });
    

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
