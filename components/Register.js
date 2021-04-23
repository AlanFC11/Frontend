import React, { Component } from 'react'
import {StyleSheet, Text, View, Button, SafeAreaView, Image, TextInput, TouchableOpacity} from 'react-native'
//import AppLoading from 'expo-app-loading';
import { useFonts, Asap } from '@expo-google-fonts/inter';
import logo from '../../img/logo.jpg'
import { color } from 'react-native-reanimated';
import * as Crypto from 'expo-crypto';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { date: null, dt: null, birthDate: '' };

        this.state = {
            email: '',
            password: '',
            name: '',
            username:'',
        }
    }
    checkValue(str, max) {
        if (str.charAt(0) !== '0' || str == '00') {
          var num = parseInt(str);
          if (isNaN(num) || num <= 0 || num > max) num = 1;
          str =
            num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
              ? '0' + num
              : num.toString();
        }
        return str;
      }
      dateTimeInputChangeHandler = (e) => {
        this.type = 'text';
        var input = e;
        var expr = new RegExp(/\D\/$/);
        if (expr.test(input)) input = input.substr(0, input.length - 3);
        var values = input.split('/').map(function (v) {
          return v.replace(/\D/g, '');
        });
        if (values[1]) values[1] = this.checkValue(values[1], 12);
        if (values[0]) values[0] = this.checkValue(values[0], 31);
        var output = values.map(function (v, i) {
          return v.length == 2 && i < 2 ? v + '/' : v;
        });
        this.setState({
          birthDate: output.join('').substr(0, 14),
        });
      };

    render() {
        return (
            <SafeAreaView style={styles.container}>
            <View style={{justifyContent: 'center', alignItems:'flex-start',}}>
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
            <View style= {styles.SeparatorVStyle} />
        <View style={{justifyContent: 'center',padding:4}}>
          <TextInput style={styles.inputs} placeholder = 'Correo electrónico' onChangeText={(email) => this.setState({email})} />
          <View style= {styles.SeparatorVStyle} />
          <TextInput style={styles.inputs}  secureTextEntry={true} placeholder = 'Contraseña' onChangeText={(password) => this.setState({password})} />
          <View style= {styles.SeparatorVStyle} />
          <TextInput style={styles.inputs} placeholder = 'Nombre' onChangeText={(name) => this.setState({name})} />
          <View style= {styles.SeparatorVStyle} />
          <TextInput style={styles.inputs} placeholder = 'Usuario' onChangeText={(username) => this.setState({username})} />
          <View style= {styles.SeparatorVStyle} />
          <TextInput
          keyboardType="number-pad"
          style={styles.inputs,{marginBottom:25}}
          maxLength={10}
          placeholder="Fecha de nacimiento: DD/MM/YYYY"
          onChangeText={(e) => this.dateTimeInputChangeHandler(e)}
          value={this.state.birthDate}
        />
        </View>
        
          <View style= {styles.SeparatorHStyle} />
          <Button
            title="Registrarse"
            //color="#5ac65a"
            color="#ebbe20"
            onPress={() => register(this.state.email, this.state.password, this.state.name, this.state.username, this.state.birthDate)}
          />
          <View style= {styles.SeparatorVStyle} />
          <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate("Login")}>
            <Text style={{color:'#aaaaaa', fontSize:12, textAlign:'center' }}>Al registrarme, confirmo que he leído y acepto los términos y condiciones, así como el aviso de privacidad.</Text>
            </TouchableOpacity>
          
    </SafeAreaView>
    )
  }
}

export default Register

async function register(email, password, name, username, birthDate) {
  registerDate = new Date();
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  const logStatus = await httpRegister(email, digest, name, username, birthDate, registerDate);
  if (logStatus == 459) {
    navigation.navigate("Login");
  }else if(logStatus == 460){
    alert('Email y/o nombre de usuario ya existe');
  }else if (logStatus >=500 || logStatus<600){
    alert('Error del servidor');
  }else{
   alert('Se produjo un error. Vuelve a intentarlo');
 }
};

async function httpRegister(email, password, name, username, birthDate, registerDate) {
  var dataSchema = {
   email: email,
   password: password,
   name: name,
   username: username, 
   birthDate: birthDate,
   location: '',
   registerDate: registerDate
  };
  try {
   let response = await fetch(
    "http://192.168.42.88:3000/new/user",
    {
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json"
      },
     body: JSON.stringify(dataSchema)
   }
  );
  return response.status;
   
 } catch (errors) {

   alert(errors);
  } 
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 90,
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