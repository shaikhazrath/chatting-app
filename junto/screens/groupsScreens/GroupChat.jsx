import React, { useState, useEffect ,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import io from 'socket.io-client';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GroupChat = () => {
  const router = useRoute();
  const flatListRef = useRef(null);
  const groupId = router.params.selectedId;
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);



  
  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };


  useEffect(() => {
    const socketInstance = io(`${process.env.EXPO_PUBLIC_API_URL}`, { transports: ['websocket'] });
    socketInstance.on('connect', () => {
      console.log('Connected to server');
      socketInstance.emit('joinGroup', groupId);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socketInstance.on('chat message', handleNewMessage);

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        console.log('Disconnected from socket');
      }
    };

  }, []);
  const fetchmessages = async () => {
    const value = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/groupmessages/${groupId}`, {
        headers: {
          Authorization: value
        }
      })
      setMessages(response.data.messages)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
 
    fetchmessages()
  }, [groupId])


  const handleSend = async () => {
    const value = await AsyncStorage.getItem('token');

    if (messageInput.trim() !== '') {
      const message = { text: messageInput, group: groupId, authorization: value };

      if (socket) {
        socket.emit('chat message', message);
        
      }

      setMessageInput('');
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };
  const handleKeyboardDidShow = () => {
    scrollToBottom(); 
  };


  

  return (
    <View style={styles.container}>
    <KeyboardAvoidingView style={styles.chatContainer}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View style={item.user === 'user' ? styles.userMessage : styles.otherMessage}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={() => Math.random().toString()}
        onContentSizeChange={scrollToBottom}  
              />
    </KeyboardAvoidingView>

    <TouchableOpacity onPress={handleKeyboardDidShow()} style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        placeholderTextColor="white"
        value={messageInput}
        onChangeText={(text) => setMessageInput(text)}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10, // Add some padding to the bottom to create space for the input area
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
    marginBottom: 10,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5e5',
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
    marginBottom: 10,
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 55,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#272727',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    color: '#fff',
    borderRadius: 20, // Add border radius to the input field
    backgroundColor: '#272727', // Change the input field background color
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60, // Adjust the width of the send button
    height: 40, // Adjust the height of the send button
    borderRadius: 20, // Add border radius to the send button
    backgroundColor: '#3498db',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});


export default GroupChat;
