import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import UserGroupsCard from './components/UserGroupsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const UserGroups = ({navigation}) => {
  const [userGroups, setUserGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserGroups = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/mygroups`, {
          headers: {
            Authorization: value,
          },
        });
        setUserGroups(response.data.userGroups);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        console.log(error)
        setIsLoading(false);
      }
    };

    getUserGroups();
  }, []);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      
      navigation.navigate('login');
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      {isLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.errorText}>Error fetching data. Please try again.</Text>
        
      ) : userGroups.length === 0 ? (
        <Text style={styles.emptyText}>No user groups available.</Text>
      ) : (
        <FlatList
          data={userGroups}
          renderItem={({ item }) => (
            <UserGroupsCard item={item} navigation={navigation}/>
          )}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#272727', // Dark background color
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UserGroups;
