import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const clientId = 'YOUR_GOOGLE_CLIENT_ID';

export default function HomeScreen() {
  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    flow: 'implicit', // This ensures access_token is returned
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;

      try {
        const now = new Date().toISOString();
        const response = await axios.get(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              maxResults: 5,
              timeMin: now,
              singleEvents: true,
              orderBy: 'startTime',
            },
          }
        );

        const events = response.data.items;
        console.log('Upcoming Events:', events);
        alert(`Next Event: ${events[0]?.location || 'Enter a location in your event to get directions there'}`);
      } catch (err) {
        console.error('Error fetching calendar events:', err);
      }
    },
    onError: () => {
      console.error('Login Failed');
    },
  });

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <button onClick={() => login()}>Sign in and Get Events</button>
      </div>
    </GoogleOAuthProvider>
  );
}
