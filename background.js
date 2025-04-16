// Service worker for handling authentication and calendar events
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'createCalendarEvent') {
    createCalendarEvent()
      .then(response => sendResponse({ success: true, meetLink: response.hangoutLink }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Required for async response
  }
});

async function createCalendarEvent() {
  const authResult = await chrome.identity.getAuthToken({ interactive: true });
  if (!authResult) {
    throw new Error('Failed to get authentication token');
  }
  const token = authResult.token;

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
      createRequest: { requestId: crypto.randomUUID() }
    }
  };

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || 'Failed to create calendar event');
  }

  return response.json();
}