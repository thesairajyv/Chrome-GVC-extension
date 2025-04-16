document.getElementById('createEvent').addEventListener('click', createCalendarEvent);

async function createCalendarEvent() {
  const statusElement = document.getElementById('status');
  statusElement.textContent = 'Creating event...';

  try {
    // Get auth token
    const authResult = await chrome.identity.getAuthToken({ interactive: true });
    if (!authResult) {
      throw new Error('Failed to authenticate. Please check your Google account connection.');
    }

    // Create event with GVC link
    const event = {
      summary: 'CxCall',
      start: {
        dateTime: new Date().toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      end: {
        dateTime: new Date(Date.now() + 30 * 60000).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      conferenceData: {
        createRequest: {
          requestId: Date.now().toString(),
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    };

    // Call Calendar API
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authResult.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });

    if (!response.ok) {
      throw new Error('Failed to create event');
    }

    const createdEvent = await response.json();
    const meetLink = createdEvent.conferenceData.entryPoints[0].uri;

    // Copy meet link to clipboard
    await navigator.clipboard.writeText(meetLink);

    statusElement.textContent = 'Event created! Meet link copied to clipboard.';
    setTimeout(() => { window.close(); }, 2000);
  } catch (error) {
    console.error('Error:', error);
    statusElement.textContent = error.message || 'Error creating event. Please try again.';
  }
}