import React from 'react';
import { View, StyleSheet, Button, LogBox, Text } from 'react-native';
import {
  createNativeStackNavigator,
} from 'react-native-screens/native-stack';
import { GestureDetectorProvider } from 'react-native-screens/gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreLogs(['Looks', 'Internal React']); 

const ScreenCaseSelections = ({ navigation }) => (
  <View style={[styles.container, styles.primaryScreen]}>
    <View style={{ padding: 20 }}>
      <Text>Select animation type</Text>
    </View>
    <Button
      title="Swipe Right ➡️"
      onPress={() => navigation.navigate(
        'StackWithSwipeRight', 
        { screen: 'ScreenB', initial: false }
      )}
    />
    <Button
      title="Swipe Left ⬅️"
      onPress={() => navigation.navigate(
        'StackWithSwipeLeft', 
        { screen: 'ScreenB', initial: false }
      )}
    />
    <Button
      title="Swipe Down ⬇️"
      onPress={() => navigation.navigate(
        'StackWithSwipeDown', 
        { screen: 'ScreenB', initial: false }
      )}
    />
    <Button
      title="Swipe Up ⬆️"
      onPress={() => navigation.navigate(
        'StackWithSwipeUp', 
        { screen: 'ScreenB', initial: false }
      )}
    />
    <Button
      title="Custom Swipe Right 🤡"
      onPress={() => navigation.navigate(
        'StackWithCustomSwipeRight', 
        { screen: 'ScreenB', initial: false }
      )}
    />
  </View>
);

const ScreenA = ({ navigation }) => (
  <View style={[styles.container, styles.screenA]}>
    <Button
      title="Go to ScreenB ➡️"
      onPress={() => navigation.navigate('ScreenB')}
    />
    <Button
      title="Change Animation Type 📜"
      onPress={() => navigation.navigate('CaseSelections')}
    />
    <View style={{ padding: 20 }}>
      <Text>This is first screen, go to ScreenB</Text>
    </View>
  </View>
);

const ScreenB = ({ route }) => (
  <View style={[styles.container, styles.screenB]}>
    <View style={{ padding: 20 }}>
      <Text>Use gesture ({route.params.gestureType}) to go back to ScreenA</Text>
    </View>
  </View>
);

const Stack = createNativeStackNavigator();

const StackWithSwipeRight = () => {
  return (
    <Stack.Navigator
      initialRouteName="ScreenA"
      screenOptions={{
        stackAnimation: 'none',
        goBackGesture: 'swipeRight', // describes screen transition animation
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen name="ScreenA" component={ScreenA} />
      <Stack.Screen name="ScreenB" component={ScreenB} initialParams={{ gestureType: 'swipeRight' }} />
    </Stack.Navigator>
  )
}

const StackWithSwipeLeft = () => {
  return (
    <Stack.Navigator
    initialRouteName="ScreenA"
      screenOptions={{
        stackAnimation: 'none',
        goBackGesture: 'swipeLeft', // describes screen transition animation
        gestureEnabled: false,
        headerShown: false
      }}>
      <Stack.Screen name="ScreenA" component={ScreenA} />
      <Stack.Screen name="ScreenB" component={ScreenB} initialParams={{ gestureType: 'swipeLeft' }} />
    </Stack.Navigator>
  )
}

const StackWithSwipeUp = () => {
  return (
    <Stack.Navigator
    initialRouteName="ScreenA"
      screenOptions={{
        stackAnimation: 'none',
        goBackGesture: 'swipeUp', // describes screen transition animation
        gestureEnabled: false,
        headerShown: false
      }}>
      <Stack.Screen name="ScreenA" component={ScreenA} />
      <Stack.Screen name="ScreenB" component={ScreenB} initialParams={{ gestureType: 'swipeUp' }} />
    </Stack.Navigator>
  )
}

const StackWithSwipeDown = () => {
  return (
    <Stack.Navigator
    initialRouteName="ScreenA"
      screenOptions={{
        stackAnimation: 'none',
        goBackGesture: 'swipeDown', // describes screen transition animation
        gestureEnabled: false,
        headerShown: false
      }}>
      <Stack.Screen name="ScreenA" component={ScreenA} />
      <Stack.Screen name="ScreenB" component={ScreenB} initialParams={{ gestureType: 'swipeDown' }} />
    </Stack.Navigator>
  )
}

const StackWithCustomSwipeRight = () => {
  return (
    <Stack.Navigator
    initialRouteName="ScreenA"
      screenOptions={{
        stackAnimation: 'none',
        gestureEnabled: false,
        headerShown: false,
        goBackGesture: 'swipeRight', // describes how to trigger screen transition animation
        transitionAnimation: { // definition of screen transition animation
          topScreenFrame: (event, screenSize) => {
            'worklet';
            return {
              opacity: 1 - Math.abs(event.translationX / screenSize.width),
            };
          },
          belowTopScreenFrame: (event, screenSize) => {
            'worklet';
            return {
              transform: [
                { rotate: 3 * 360 * (event.translationX / screenSize.width) + 'deg' }
              ]
            };
          },
        }
      }}>
      <Stack.Screen name="ScreenA" component={ScreenA} />
      <Stack.Screen name="ScreenB" component={ScreenB} initialParams={{ gestureType: 'custom swipe right' }} />
    </Stack.Navigator>
  )
}

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <GestureDetectorProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            goBackGesture: 'swipeRight',
            stackAnimation: 'none',
            headerShown: false,
            gestureEnabled: false,
          }}>
          <Stack.Screen
            name="CaseSelections"
            component={ScreenCaseSelections}
          />
          <Stack.Screen
            name="StackWithSwipeRight"
            component={StackWithSwipeRight}
          />
          <Stack.Screen
            name="StackWithSwipeLeft"
            component={StackWithSwipeLeft}
          />
          <Stack.Screen
            name="StackWithSwipeUp"
            component={StackWithSwipeUp}
          />
          <Stack.Screen
            name="StackWithSwipeDown"
            component={StackWithSwipeDown}
          />
          <Stack.Screen
            name="StackWithCustomSwipeRight"
            component={StackWithCustomSwipeRight}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureDetectorProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  primaryScreen: {
    backgroundColor: 'white',
    paddingTop: 100,
  },
  screenA: {
    backgroundColor: 'moccasin',
    paddingTop: 100,
  },
  screenB: {
    backgroundColor: 'thistle',
    paddingTop: 100,
  },
});

export default App;
