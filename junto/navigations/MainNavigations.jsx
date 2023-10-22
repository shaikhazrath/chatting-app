import { Text, Dimensions, LogBox, Platform, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/authScreens/LoginScreen';
import RegisterScreen from '../screens/authScreens/RegisterScreen';
import UserGroups from '../screens/groupsScreens/UserGroups';
import SearchGroup from '../screens/groupsScreens/SearchGroup';
import CreateGroup from '../screens/groupsScreens/CreateGroup';
import GroupChat from '../screens/groupsScreens/GroupChat';
const Stack = createNativeStackNavigator();
const ios = Platform.OS == 'ios';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const MainNavigations = () => {
  const [loader, setLoader] = useState(true);
  const [token, setToken] = useState();
  const [fontsLoaded] = useFonts({
    'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'roboto-light': require('../assets/fonts/Roboto-Light.ttf'),
    'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setLoader(false);
          setToken(value);
        } else {
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };

    getToken();
  }, []);

  if (!fontsLoaded || loader) {
    return <Text>Loading....</Text>;
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={token ? "UserGroups" : "login"}>
          <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SearchGroup" component={SearchGroup} options={({ navigation }) => ({
            headerShown: true,
            title: 'JUNTO',
            headerStyle: {
              backgroundColor: '#121212',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              textAlign: 'center',
            },
            headerLeft: null,
          })} />
            <Stack.Screen name="CreateGroup" component={CreateGroup} options={({ navigation }) => ({
            headerShown: true,
            title: 'JUNTO',
            headerStyle: {
              backgroundColor: '#121212',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              textAlign: 'center',
            },
            headerLeft: null,
          })} />
          <Stack.Screen
            name="UserGroups"
            component={UserGroups}
            options={({ navigation }) => ({
              headerShown: true,
              title: 'JUNTO',
              headerStyle: {
                backgroundColor: '#121212',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 28,
                textAlign: 'center',
              },
              headerRight: () => (
                <>
                  <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => {
                      navigation.navigate('SearchGroup');
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 20 }}>Search</Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => {
                      navigation.navigate('CreateGroup');
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 20 }}>Create</Text>

                  </TouchableOpacity>
                </>
              ),
            })}
          />
          <Stack.Screen name="GroupChat" component={GroupChat}
          options={({ route }) => ({ title: route.params.selectedName ,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#121212',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              textAlign: 'center',
            },
            headerLeft: null,
          })}
          />
          

          {/* <Stack.Screen name="main" component={BottomNavigation} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>

  )
}


export default MainNavigations
