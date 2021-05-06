import * as React from 'react';
import {  SafeAreaView, TouchableWithoutFeedback,Keyboard, KeyboardAvoidingView, Platform, CheckBox, Image, View, ScrollView, TextInput, Button, Dimensions, AsyncStorage, Alert, TouchableOpacity, Text } from 'react-native';
import { UserConsumer }  from '../Context/Context';
import { requestSignUp } from '../API/ApiRequest'
import styles from '../assets/styles/styles'
import  LoadingScreen from '../components/LoadingScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { translate } from "../locale/local";

// variables width et height contenant les dimansions de la fenêtre
const { height, width } = Dimensions.get('window');

// Classe définissant l'écran d'inscription
// sensiblement la même que LoginScreen, à voir pour commentaires
export default class SignUpScreen extends React.Component {

  constructor(props) {
    super(props)
 
    this.state = { email: undefined, 
                   name: undefined, 
                   password: undefined, 
                   password_2: undefined,
                   isLoading: false,
                   }
  }

  

 
    screenSize() {
      if (width<730 & width>500) {
        
        styles.container={
          flex:1,
          backgroundColor: '#f9f9f9',
          paddingLeft: width/3,
          paddingRight: width/3,
        }
        return({flex: 1})
      }
       else if (width<730){
        styles.logo={
          width:260,
        height:200,
        marginLeft: -20,
        resizeMode:'contain'
        }
        return({flex: 1})

      }
      
      else {
        console.log('test')
        styles.container={
          flex:1,
          alignItems:'center',
          backgroundColor: '#f9f9f9',
          marginLeft: -20,
          paddingLeft: width/3,
          paddingRight: width/3,
        }
        return({flex: 1, flexDirection: 'row'})
      }
    }



    _displayLoading() {
      if (this.state.isLoading) {
          return (<LoadingScreen/>)
      }
    }


  render() {
 
  return (
     
    <UserConsumer>{props => {

      return(

      <View
      style={styles.container}
      >
    <Image style={styles.logo}
        source={require('../assets/images/carettev3.png')}></Image>

    <TextInput

      placeholder="Adresse e-mail"
      placeholderTextColor="black"
      value={this.state.email}
      onChangeText={text => this.setState({email: text})}
      editable={true}
      style={styles.header}
      
      />
    
    <TextInput
      placeholder="Nom"
      placeholderTextColor="black"
      value={this.state.name}
      onChangeText={text => this.setState({name: text})}
      style={styles.header}
      
    />

    <TextInput
      placeholder="Mot de passe"
      placeholderTextColor="black"
      value={this.state.password}
      onChangeText={text => this.setState({password: text})}
      secureTextEntry
      style={styles.header}
      
    />

    <TextInput
      placeholder="Confirmer le Mot de passe"
      placeholderTextColor="black"
      value={this.state.password_2}
      onChangeText={text => this.setState({password_2: text})}
      secureTextEntry
      style={styles.header}
      
    />



        
        <TouchableOpacity
        style={{width: '100%',}}
              
onPress={() => {
  this.setState({isLoading: true})
  requestSignUp({ email: this.state.email, name: this.state.name, password: this.state.password, password_2: this.state.password_2}).then(data=> {
    if (data.error) {
      this.setState({isLoading: false})
      switch(data.data) {
        
        case 'passwords failed':
          return(Alert.alert(
            "Erreur",
            "mots de passe différents",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log() }
            ],
            { cancelable: false }
            
          ));
          default :
          console.log(data)
          return(Alert.alert(
            "Erreur",
            "Un utilisateur est déjà enregistré avec cette adresse email",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log() }
            ],
            { cancelable: false }
            
          ));
      }
      console.log(data)
      
    

    } else {
      

      this.props.navigation.navigate(translate('DRAWER_SIGN_IN'), {email: this.state.email, register: true})
      this.setState({isLoading: false, email: '', name: '', password: '', password_2: ''})
    
    }
    })
  
                }} 
>
        <LinearGradient
          // Button Linear Gradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
          
              <Text style={{color: '#fff', fontSize: 15}}>INSCRIPTION</Text>
      

        </LinearGradient>
        </TouchableOpacity>
    
    <View style={this.screenSize()}>
    <TouchableOpacity 
    // style={styles.inscr}
    onPress={() => this.props.navigation.navigate(translate("STACK_SIGN_UP"))}
    ><Text>Déjà inscrit?  </Text></TouchableOpacity>
    

    </View>
    {this._displayLoading()}
  </View>
  
 
  )}}
  
  </UserConsumer>
  );
  }
}



