import * as React from 'react';
import { CheckBox, Image, View, ScrollView, TextInput, Button, Dimensions, AsyncStorage, Alert, TouchableOpacity, Text } from 'react-native';
import { UserConsumer }  from '../Context/Context';
import styles from '../assets/styles/styles'
// import { CheckBox } from 'react-native-elements';
import  LoadingScreen from '../components/LoadingScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { translate } from "../locale/local";

// dimensions de la fenêtre
const { height, width } = Dimensions.get('window');

// définit le screen de connexion
export default class LoginScreen extends React.Component {

  // les paramètres username et password sont initialisés dans le state
  constructor(props) {
    super(props)
 
    this.state = { username: undefined, 
                   password: undefined, 
                   checked: false, 
                   autoConnect: false, 
                   }
  }

  
    // action du screen a la réception d'un nouveau props
    // s'il reçoit la valeur True e register il affiche une Alert
    UNSAFE_componentWillReceiveProps(newProps) {
      if (newProps.route.params.register) {
        this.setState({username: newProps.route.params.email, isLoading: false})
        Alert.alert(
          "Inscription",
          "Vous êtes maintenant enregistré dans la base, un email de confirmation a été envoyé",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log() }
          ],
          { cancelable: false }
          
        );
      }

      
    }

    // méthode de récupération de la variable email dans le cache de l'application
    // cette variable est présente si le state checked est égal à True
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('email');
        
        this.setState({ username: value })

      } catch (error) {
        // Error retrieving data
      }
    };


    // méthode de définition de l'action du screen quand il est chargé
    // s'il reçoit un paramètre email en props, le screen l'importe dans le state
    componentDidMount() {

      this._retrieveData();
      if (this.props.route.params) {
        this.setState({username: this.props.route.params.email})
        // alert(this.props.route.params.alert)
      }
    }


    
    // Définition du responsive du screen
    // cette méthode s'appuie sur les dimensions de l'écran stockés dans les variables width et height
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



    // méthode exécuté à chaque fois que le screen est rendu soit à chaque mise à jour du state 
    // elle affiche l'écran de temps de chargement jusqu'à ce que le paramètre isLoading du state passe à False
    _displayLoading() {
      if (this.state.isLoading) {
          return (<LoadingScreen/>)
      }
    }


  render() {
 
    
    
  return (
     // le UserConsumer est initié dans le fichier Context
     // il permet de récupérer et d'exécuter les actions du AuthContext dispatcher par le provider
    <UserConsumer>{props => {

      return(
        
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.logo}
            source={require('../assets/images/carettev3.png')}>
        </Image>

        {/* mise en place des input connectés au state correspondant */}
        <TextInput
          placeholder={translate("LOGIN")}
          placeholderTextColor="black"
          value={this.state.username}
          onChangeText={text => this.setState({username: text})}
          editable={true}
          style={styles.header}
        />
        <TextInput
          placeholder={translate("PASSWORD")}
          placeholderTextColor="black"
          value={this.state.password}
          onChangeText={text => this.setState({password: text})}
          secureTextEntry
          style={styles.header}
        />

    

        {/* les checkbox mettent à jour les state checked et autoConnect a terme stockés dans le cache. */}
        <View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={this.state.checked}
                // change la valeur du state correspondant en l'inverse
                onValueChange={() => this.setState({checked: !this.state.checked})}
                style={styles.checkbox}
              />
              <Text style={styles.label}>{translate("REMEMBER_ME")}</Text>
            </View>             
        </View>
        
        {/* condition d'affichage de la 2e checkbox si la première est cochée */}
        {this.state.checked && (
          <View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={this.state.autoConnect}
                onValueChange={() => this.setState({autoConnect: !this.state.autoConnect})}
                style={styles.checkbox}
              />
              <Text style={styles.label}>{translate("AUTO_CONNECT")}</Text>
            </View>
          
          </View>
        )}
        
        {/* Bouton submit du formulaire, il exécute la fonction signn du AuthContext */}
        <TouchableOpacity
          style={{width: '100%',}}    
          onPress={() => {props.signIn( {data: {username: this.state.username, password: this.state.password}, checked: JSON.stringify(this.state.checked), autoConnect: JSON.stringify(this.state.autoConnect) });
                this.setState({ password : "" })  
                }} 
        >
          <LinearGradient
            // Button Linear Gradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
            
              <Text style={{color: '#fff', fontSize: 15}}>{translate("BUTTON_CONNECT")}</Text>
        

          </LinearGradient>
        </TouchableOpacity>
        
        {/* view des liens vers les autres pages du formulaire de contact. 
            cette view prend en style la fonction screenSize de manière à s'adapter à la taille de l'écran
        */}
        <View style={this.screenSize()}>
          <TouchableOpacity 
          // style={styles.inscr}
          onPress={() => this.props.navigation.navigate(translate("STACK_SIGN_UP"))}
          >
            <Text>{translate("SIGN_UP_ASK")}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
          // style={styles.inscr}
          onPress={() => this.props.navigation.navigate(translate("STACK_FORGOTTEN_PASSWORD"))}
          >
            <Text>{translate("FORGOTTEN_PASSWORD_ASK")}</Text>
          </TouchableOpacity>
        </View>
  
  </ScrollView>)}}
  
  </UserConsumer>
  );
  }
}



