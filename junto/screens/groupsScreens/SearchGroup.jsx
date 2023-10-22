import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SearchGroupsCard from './components/SearchGroupsCard';

const SearchGroup = ({navigation}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError]=useState()
  const handleJoinPress = async (groupId,groupName) => {
    try {
      const value = await AsyncStorage.getItem('token');
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/join/${groupId}`, {
        headers: {
          Authorization: value,
        },
      });
    
  
      console.log(response.data.message);
      navigation.navigate('GroupChat',{selectedId: groupId ,selectedName:groupName })
    
    } catch (error) {
      navigation.navigate('GroupChat',{selectedId: groupId ,selectedName:groupName })

      setError(error.response.data.message);
    }
  };


  const searchGroups = async () => {
    try {
      setIsLoading(true);
      const value = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: value,
        },
      };

      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/groups/search?q=` + searchQuery,
        config
      );
      setSearchResults(response.data.groups);
    } catch (error) {
      console.error('Error searching for groups:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {
        error?
        <Text style={{color:'red', padding:10,textAlign:'center'}}>{error}</Text>
        :
        <View></View>
      }
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for existing groups"
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onBlur={searchGroups}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setSearchQuery('');
              setSearchResults([]);
            }}
          >
          <Text style={{color:'white'}}>close</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0084ff" style={styles.loader} />
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <SearchGroupsCard item={item} onJoinPress={handleJoinPress}/>
          )}
        />
      )}

 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background color
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#1e1e1e', // Darker background for search bar
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: 'white', // White text color
  },
 
});

export default SearchGroup;
