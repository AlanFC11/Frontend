import React, { Component } from 'react'
import useEffect from 'react'
import {StyleSheet, Text, View, Button, SafeAreaView, Image, TextInput, TouchableOpacity} from 'react-native';
//import AppLoading from 'expo-app-loading';
//import { useFonts, Asap } from '@expo-google-fonts/inter';
import logo from '../img/logo.jpg';
//import { color } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';


//const navigation = useNavigation();
//export default function Login({navigation}) {
export class Login extends Component {
    
    constructor(props) {
        super(props);
        navigation =props.navigation;

        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center',}}>
            <Image
                style={{
                resizeMode: 'contain',
                height: 85,
                width: 85,
                
                }}
                source={logo}
            />
            </View>
            <View style= {styles.SeparatorVStyle} />
            <View style= {styles.SeparatorVStyle} />
        <View style={{justifyContent: 'center',}}>
          <TextInput style={styles.inputs} placeholder = 'Correo electrónico' onChangeText={(email) => this.setState({email})} />
          <View style= {styles.SeparatorVStyle} />
          <TextInput style={styles.inputs}  secureTextEntry={true} placeholder = 'Contraseña' onChangeText={(password) => this.setState({password})} />
        </View>
        <View style= {styles.SeparatorVStyle} />
        <View style= {styles.SeparatorVStyle} />
          <View style={{justifyContent: 'center', flex:2, flexDirection:'row',maxHeight:32}}>
          <Button 
            title="¿No tienes cuenta? Regístrate"
            color="#1eb4bc"
            onPress={() => navigation.navigate("Register")}
          />
          <View style= {styles.SeparatorHStyle} />
          <Button
            title="Inicia sesión"
            color="#1eb4bc"
            onPress={() => authenticate(this.state.email, this.state.password)}
          />
        </View>
        <View style= {styles.SeparatorVStyle} />
        <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate("Login")}>
            <Text style={{color:'#ebbe20', alignSelf:'center' }}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        <View style= {styles.SeparatorVStyle} />
        <View style= {styles.SeparatorVStyle} />
        <View style= {styles.SeparatorVStyle} />
          <View style={{justifyContent: 'flex-end', alignSelf: 'center'}}>
          <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate("Login")}>
            <Text style={{color:'#aaaaaa', fontSize:12 }}>Aviso de privacidad</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
  }
};

export default Login

async function authenticate(email, password) {
  console.log(email, password);
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  console.log('Digest: ', digest);
  const logStatus = await httpLogin(email, digest);
  if (logStatus == 450) {
    alert('Contraseña incorrecta');
  }else if(logStatus == 499){
    alert('logged');
  }else if(logStatus == 451){
    alert('Email no registrado');
  }else if (logStatus >=500 || logStatus<600){
    alert('Error del servidor');
  }else{
    alert('Se produjo un error. Vuelve a intentarlo');
  }
};

async function getMovies(){
  try {
    let response = await fetch(
      'http://192.168.42.88:3000/basicInfo'
    );
    //console.log(response);
    let json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

async function httpLogin(email, password) {
  var data = {
   email: email,
   password: password
  };
  try {
   let response = await fetch(
    "http://192.168.42.88:3000/auth",
    {
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify(data)
   }
  );
  return response.status;
   
 } catch (errors) {

   alert(errors);
  } 
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 150,
      paddingHorizontal: 10,
      paddingBottom: 110,
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    SeparatorVStyle: {
        backgroundColor: '#fff',
        width: 1,
        height: 15,
      },
      SeparatorHStyle: {
        backgroundColor: '#fff',
        width: 10,
        height: 1,
      },
      inputs: {
          borderColor: '#aaaaaa',
          borderBottomWidth: 2,
      },
});
