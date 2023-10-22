import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('name@gmail.com');
  const [password, setPassword] = useState('name12345678')
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError]= useState('')
  const storeToken = async (value,userId) => {
    try {
      await AsyncStorage.setItem('token', value);
      await AsyncStorage.setItem('user', userId);

    } catch (e) {
      console.log(e)
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleLogin = () => {
    const data = {
      email: email,
      password: password
    }
    axios.post(`${process.env.EXPO_PUBLIC_API_URL}/signin`, data, { headers: { 'content-type': 'application/json' } }).then((response) => {
      storeToken(response.data.token,response.data.user._id)
      navigation.navigate('UserGroups')
    }).catch((error) => {
      setError(error.response.data)
    })

  }
  const handleRegister =()=>{
    navigation.navigate('register')
  }


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
  >
    <ImageBackground
      source={require('../../assets/auth/background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>L O G I N</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor='#8D8D8D'
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
         <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor='#8D8D8D'
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeButton}>
              <Text style={{color:'white'}}>show</Text>
            </TouchableOpacity>
          </View>
        <LinearGradient
            colors={['#1D009E', '#9800FD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>
          {
            error?
          <Text style={styles.errormsg}>{error}</Text>
:
<View></View>
          }

          <View style={styles.linksContainer}>
            <TouchableOpacity>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          
          </View>
        </View>

        <View style={styles.linksContainer}>      
              
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.linkText}>Create an Account</Text>
            </TouchableOpacity>
          </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(245, 245, 245, 0.1)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white'
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 15,
    color: 'white',
    borderColor: 'white'
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonGradient: {
    borderRadius: 5,
    marginTop:10,
  },
  linksContainer: {
    flexDirection:'row',

    marginTop: 20,
    justifyContent:'flex-end'
  },
  linkText: {
    color: '#B4B4B4',
    fontSize: 12,
  },
  errormsg:{
    color:'#FF5757',
    margin:10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 15,
    borderColor: '#8D8D8D',
  },
  passwordInput: {
    flex: 1,
    color: 'white',
    marginLeft: 10,
  },
  eyeButton: {
    paddingRight: 10,
  },
});
