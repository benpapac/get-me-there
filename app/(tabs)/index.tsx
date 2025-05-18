import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { jwtDecode } from 'jwt-decode';

import { GoogleLogin } from '@react-oauth/google';

import { useRef } from 'react';

export default function HomeScreen() {

  const client = useRef(null);

  const responseMessage = (response: any) => {
    client.current = response;
    // async function listUpcomingEvents() {
    //   let response;
    //   try {
    //     const request = {
    //       'calendarId': 'primary',
    //       'timeMin': (new Date()).toISOString(),
    //       'showDeleted': false,
    //       'singleEvents': true,
    //       'maxResults': 10,
    //       'orderBy': 'startTime',
    //     };
    //     response = await gapi.client.calendar.events.list(request);
    //     //https://www.googleapis.com/calendar/v3/calendars/calendarId/events
    //   } catch (err) {
    //     console.log('err', err);
    //     return;
    //   }

    //   const events = response.result.items;
    //   console.log('events', events);
    //   if (!events || events.length == 0) {
    //     console.log('no events found');
    //     return;
    //   }
    //   // Flatten to string to display
    //   // const output = events.reduce(
    //   //     (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
    //   //     'Events:\n');
    //   // document.getElementById('content').innerText = output;
    // }


    const parsed = jwtDecode(response.credential);
      console.log(response, parsed);
  };
  const errorMessage = (error: any) => {
      console.log(error);
  };


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
