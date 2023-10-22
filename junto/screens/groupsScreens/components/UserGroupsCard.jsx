import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const UserGroupsCard = ({ item ,navigation}) => {
  const handlePress = () => {
    navigation.navigate('GroupChat',{selectedId: item.id ,selectedName:item.name })
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <Icon name="users" size={32} color="#FFFFFF" />
      </View>
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.unreadCount}>5 unread messages</Text>
        <Text style={styles.lastMessage}>Last message content goes here...</Text>
      </View>
      <Text style={styles.lastMessageTime}>2:30 PM</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  iconContainer: {
    backgroundColor: '#555555',
    borderRadius: 24,
    padding: 12,
  },
  groupInfo: {
    flex: 1,
    marginLeft: 16,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  unreadCount: {
    color: '#25D366',
    fontSize: 14,
    marginTop: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 4,
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop: 4,
  },
});

export default UserGroupsCard;
