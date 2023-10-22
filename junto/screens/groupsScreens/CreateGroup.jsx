import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [message,setMessage]=useState()


  const createGroup = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: value,
        },
      };
      const data = {
        name: groupName,
        description: groupDescription,
      };
  
      const response = await axios.post( 
        `${process.env.EXPO_PUBLIC_API_URL}/createGroup`,
        data,
        config
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  

  return (
    <View   style={styles.container}>
           {
        message ?
        <Text style={{color:'white', textAlign:'center',marginBottom:50 , fontWeight:'bold',fontSize:20, textTransform:'uppercase'}}>{message}</Text>
        :
        <Text style={{color:'white', textAlign:'center',marginBottom:50 , fontWeight:'bold',fontSize:20, textTransform:'uppercase'}}>Create New group</Text>

      }
       <TextInput
        style={styles.input}
        placeholder="Group Name"
        placeholderTextColor="#ccc"
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#ccc"
        value={groupDescription}
        onChangeText={(text) => setGroupDescription(text)}
        multiline
      />
      <TouchableOpacity onPress={createGroup}>
        <LinearGradient
          colors={['#1D009E', '#0065FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>Create Group</Text>
        </LinearGradient>
      </TouchableOpacity>
 
    </View>
  )
}

export default CreateGroup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    padding: 16,
  },

  input: {
    width: '100%',
    height: 40,
    borderColor: '#666', 
    borderBottomWidth: 1,
    paddingLeft: 12,
    marginBottom: 16,
    color: 'white', 
  },
  createButton: {
    backgroundColor: '#0084ff', 
    padding: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})