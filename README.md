# Quick GVC Calendar Event Chrome Extension

A Chrome extension that creates Google Calendar events with Google Meet links in one click.

## Setup Instructions

1. Create a Google Cloud Project:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Calendar API for your project

2. Configure OAuth2 Credentials:
   - Go to APIs & Services > Credentials
   - Click 'Create Credentials' > 'OAuth client ID'
   - Choose 'Chrome Extension' as application type
   - Get your extension's ID from Chrome (load it first in developer mode)
   - Add your extension ID to the authorized origins
   - Copy the generated client ID

3. Update the Extension:
   - Open manifest.json
   - Replace 'REPLACE_WITH_YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com' with your actual client ID

## Installation

1. Clone or download this repository
2. Open Chrome and go to chrome://extensions/
3. Enable 'Developer mode' in the top right
4. Click 'Load unpacked' and select the extension directory

## Preview and Testing

1. After loading the extension, you'll see its icon in the Chrome toolbar
2. Click the extension icon to open the popup
3. Click 'Create CxCall Event' button
4. If this is your first time:
   - You'll be prompted to sign in with your Google account
   - Grant the necessary permissions when prompted
5. The extension will:
   - Create a 30-minute calendar event titled 'CxCall'
   - Generate a Google Meet link
   - Copy the Meet link to your clipboard
   - Show a success message

## Troubleshooting

- If you see 'bad client id' error:
  - Make sure you've followed the OAuth2 setup steps above
  - Verify that you've copied the correct client ID to manifest.json
  - Check that your Google Cloud Project has the Calendar API enabled
  - Ensure your OAuth consent screen is properly configured

## Support

For issues or questions, please create an issue in the repository.