import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios'
const SearchGroupsCard = ({ item,onJoinPress }) => {

  const join =async(groupId,groupName)=>{
    await onJoinPress(groupId,groupName); 
    console.log(groupId)
  }

  return (
    <View style={styles.cardContainer}>
  
      <Image
        source={require('../../../assets/auth/background.png')}
        style={styles.groupIcon}
      />

      {/* Group Details */}
      <View style={styles.groupDetails}>
        {/* Group Name */}
        <Text style={styles.groupName}>{item.name}</Text>

        {/* Number of Members */}
        <Text style={styles.memberCount}>{item.memberCount} Members</Text>
      </View>

      {/* Join Button */}
      <TouchableOpacity style={styles.joinButton}  onPress={()=>{join(item._id,item.name)}}>
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    elevation: 3, // Add elevation for a shadow effect (Android)
    shadowColor: 'black', // Shadow color (iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (iOS)
    shadowOpacity: 0.2, // Shadow opacity (iOS)
  },
  groupIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: 18, // Larger font size for group name
    fontWeight: 'bold',
    color: 'white',
  },
  memberCount: {
    fontSize: 12, // Smaller font size for member count
    color: 'gray',
  },
  joinButton: {
    backgroundColor: '#0084ff', // Blue join button background color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SearchGroupsCard;
