


// App.js

import * as React from 'react';


import { AsyncStorage, ActivityIndicator, Text, View, Alert } from 'react-native';

import { Icon, Overlay } from 'react-native-elements';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DrawerActions, CommonActions, useNavigationState } from '@react-navigation/native';

import styles from './assets/styles/stylesLoading';

import { requestLogin, getSignout } from './API/ApiRequest'

import AuthContext from './Context/Context';
import Hamburger from 'react-native-animated-hamburger'

import DrawerLog from './navigation/DrawerlogNav'
import DrawerUnlog from './navigation/DrawerUnlogNav'
import  LoadingScreen from './components/LoadingScreen';

import { translate } from "./locale/local";

class ShoppingCartIcon extends React.Component {
  render() {
      return(
          <View style={{paddingRight:15}}>
              <View style={{position:'absolute',height:30,width:30,right:25,bottom:15,borderRadius:15,alignItems:'center',justifyContent:'center',zIndex:2000,backgroundColor:'rgba(216,216,216,0.8)'}}>
                  <Text style={{color:'black',fontWeight:'bold'}}>0</Text>
              </View>
              <Icon name ='shopping-cart' size={30}/>
          </View>
      )
  }       
  }


// classe Burger gérant le comportement de l'icone du Burger
class Burger extends React.Component {
  
  // initialisation de la classe
  constructor(props) {
    super(props);
    this.state = {
      active: false
      
    }
  }

  // méthode du cycle de vie du composant
  // le state est modifié à chaque réception de props et le composant est re-rendu
  // la modification concerne l'état du props correspondant à l'état du drawer navigator
  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({active: newProps.isOpen()});
  }

  // méthode du cycle de vie
  // Affiche les composants à l'écran
  render() {

    return(
      
        <Hamburger
        active={this.state.active}
        type="spinArrow"
        onPress={() => this.props.toggle() } >

        </Hamburger>
    )
  }
}



// création de la navigation principale
const Drawer = createStackNavigator();

// fonction App de l'application définissant les points d'entrée
export default function App({navigation}) {
  
  //............................................

  // définition d'un réducer dont les cas correspondent au state global du contexte de l'application
  // initialisé en:
  //      isLoading: true,
  //      isSignout: false,
  //      userToken: null,
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':

          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isLoading: false
          };
          case 'IS_LOADING':
            return {
              isLoading: true
            }
          
      }
    },
    {
      
      isLoading: true,
      isSignout: false,
      userToken: null,

    }
  );


  // Hooks du component correspondand a componentDidMount
  React.useEffect(() => {
    
    // fonction de récupération asynchrone des données du store
    // données:
    //    userToken
    //    autoConnect
    //
    // gère les actions de connexion en fonction de la présence d'un token
    const bootstrapAsync = async () => {
      let userToken, autoConnect;
      
      try {
        // récupère userToken dans le store
        userToken = await AsyncStorage.getItem('userToken');

        // récupère autoConnect dans le store
        autoConnect = JSON.parse(await AsyncStorage.getItem('autoConnect'));
      } catch (e) {
        
      }

      // conditions de gestion des actions (2 paramètres)
      if (autoConnect && userToken) {
        // restoration du token : 
        // la présence du token dans le réducer entraine la connexion de l'utilisateur
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        
      } else if (!autoConnect && userToken) {
        
        // action de déconnexion en présence d'un token:
        dispatch({ type: 'SIGN_OUT' });
        
        try {
          // suppression du token dans la base de donnée
          getSignout(userToken).then(response => console.log(response));

          // suppression des variables userToken et autoConnect dans le store
          act = await AsyncStorage.multiRemove(['userToken', 'autoConnect'], () => {});
        } catch (e) {
          //
        }
        
        
      } else {
        
        // action de déconnexion
        dispatch({ type: 'SIGN_OUT' });
      }
      
      
    };
    
    bootstrapAsync();
  }, []);
      
  
  // Définition du authContext du provider disponible sur tous les Consumer
  const authContext = React.useMemo(
    () => ({
      
      // Connexion
      signIn: async data => {
          //temps de chargement pendant l'exécution de la requète
          dispatch({ type: 'IS_LOADING' })

          // Exécution de la requète
          requestLogin(data.data).then( response => {
           
            const saveToken = async () => {
              let userToken;
              try {
                // si le réponse est validée: stockage dans le cache du token et des paramètres de connexions définits par l'utilisateur dans la page de connexion
                userToken = await AsyncStorage.multiSet([['userToken', response],['email', data.data.username], ['checked', data.checked], ['autoConnect', data.autoConnect]], () => {});
        
              } catch (e) {
                console.log(e)
              }
            };

            const saveEmail = async () => {
              let userToken;
              try {
                userToken = await AsyncStorage.setItem('email', data.username);
        
              } catch (e) {
                console.log(e)
              }
            };

            // Condition d'erreur, l'utilisateur n'est pas connecté et une alerte est affichée
            if ( response == "[Auth] Unsuccessful Authentication" || response == "[Auth] Authentication data missing") {
              
              dispatch({ type: 'SIGN_OUT' }) ;
              
              Alert.alert(
                "Erreur",
                "Login ou mot de passe incorrect",
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
              

            } else {
              saveToken(response);
              dispatch({ type: 'SIGN_IN', token: response });
            }
            
          });
         
      },
      signOut: async data => {

        // le token est supprimé du cache et la requète est envoyé au serveur pour suppression de la ligne se session
        // a revoir
        const removeData = async () => {
          let checked, autoConnect;
          try {
            checked = JSON.parse(await AsyncStorage.getItem('checked'));
            autoConnect = JSON.parse(await AsyncStorage.getItem('autoConnect'));

            
            if (checked && !autoConnect) {
              userToken = await AsyncStorage.multiRemove(['userToken', 'checked', 'autoConnect'], () => {});
              getSignout(data.token).then(response => console.log(response))
              
            } else {
              userToken = await AsyncStorage.multiRemove(['userToken', 'email', 'checked', 'autoConnect'], () => {});
              getSignout(data.token).then(response => console.log(response))
            }
    
          } catch (e) {
            console.log(e)
          }
          
        };

        removeData()
        
        dispatch({ type: 'SIGN_OUT'})},

      
    }),
    []
  );


  //...........................................................

  return (

    <AuthContext.Provider value={authContext} >
      
      <NavigationContainer>
        <Drawer.Navigator >
          {/* paramétrage de la navigation en mode déconnecté
          la condition dépend de la présence d'un token dans le reducer
          */}
          {state.isLoading ? (
          <Drawer.Screen name="Home" component={LoadingScreen} />
          ) : state.userToken == null ? (
          <Drawer.Screen 
          
              name="Connectez-vous" 
              component={DrawerUnlog}  
              options={({navigation}) => ({
                                            headerTitle: () => {
                                              
                                                                  try {
                                                                  return(<Text>{navigation.dangerouslyGetState().routes[0].state.routeNames[navigation.dangerouslyGetState().routes[0].state.index]}</Text>)
                                                                  } catch(e) {
                                                                    return (<Text>HomeFree</Text>)
                                                                  }
                                                                  
                                                                  },
                                                                  headerRight: () => 
                                                      <ShoppingCartIcon/>
           ,
                                            headerLeft: () =>  <Burger 
                                                                  isOpen={() => {
                                                                   
                                                                  try {
                                                                    if (navigation.dangerouslyGetState().routes[0].state.history[navigation.dangerouslyGetState().routes[0].state.history.length-1].type=='route'){
                                                                      return false;
                                                                    } else {
                                                                      return true
                                                                    }
                                                                  }
                                                                  catch(e) {
                                                                    return(false)
                                                                  }
                                                                  }}
                                                                  
                                                                  toggle={()=> {
                                                                  
                                                                    navigation.dispatch(DrawerActions.toggleDrawer())}}/>})}/>
          
          ) : (
            <Drawer.Screen name="Home Logged" component={DrawerLog}/>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>

  );
}
