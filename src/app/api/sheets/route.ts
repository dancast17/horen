import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { NextRequest, NextResponse } from 'next/server';

// Google Sheets configuration
const SPREADSHEET_ID = '1IiAJ_9eTnh46lgx5BMzv3PN1lpxhotEbUbQW6yHQGGc';
const SHEET_NAME = 'Folha1';
const RANGE = 'A1'; // Start appending at the first row

// Initialize Google Sheets client
async function getGoogleSheetsClient() {
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
    return google.sheets({
      version: 'v4',
      auth: client as OAuth2Client, // ✅ fix here
    });
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Received data:", data); // 👈 LOG HERE

    const { email, phone } = data;

    const phoneRegex = /^\+?\d{9,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      console.warn("Invalid email:", email); // 👈 LOG HERE
      return NextResponse.json({ error: 'Invalid or missing email address.' }, { status: 400 });
    }

    if (!phone || !phoneRegex.test(phone)) {
      console.warn("Invalid phone:", phone); // 👈 LOG HERE
      return NextResponse.json({ error: 'Invalid or missing phone number.' }, { status: 400 });
    }

    const sheets = await getGoogleSheetsClient();
    const phoneNumber = "+" + phone.replace(/\D/g, '');
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
    console.error('API Error submitting form:', error); // 👈 LOG ERROR
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}

