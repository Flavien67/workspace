import * as React from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native'
import {  Button } from 'react-native-elements';
import { UserConsumer }  from '../Context/Context';
import { getUser } from '../API/ApiRequest';
import  LoadingScreen from '../components/LoadingScreen'


// classe de l'écran d'accueil en mode connecté
// définit au plus simple
class HomeLoggedScreen extends React.Component {


  constructor(props) {
    super(props)
    this.state = { user: [],
                   userToken: '', 
                   isLoading: false,
                   isLoading_2: true
                  };

  }



  _loadUser(test) {

    getUser(test).then(data => {
      this.setState({ user: data,
                     userToken: test, 
                      isLoading: true,
                      isLoading_2: false
                    })
    });
  }
  

  // méthode de récupération du token de session dans le cache
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');

      this._loadUser(value);
      
    } catch (error) {
      // Error retrieving data
    }
  };


  // Exécution de la méthode ci-dessus dès que le componant est chargé
  componentDidMount() {
    this._retrieveData();
    
  }

  // méthode d'affichage de l'écran de chargement
  _displayLoading() {
    if (this.state.isLoading_2) {
        return (<LoadingScreen/>)
    }
  }
  
  render() { 

    return (
      <UserConsumer>
        {props => { 
            
           
          return <View style={styles.container}> 
          
            
          <View style={styles.getStartedContainer}>

            {/* Bouton de déconnexion, a placer */}
            <Button title="Sign out" onPress={() => props.signOut({token: this.state.userToken})}/>
            
          </View>  

          {/* Affiche le texte correspondant au champ name du model res.users */}
          {this.state.isLoading && (
        <Text>Hello {this.state.user[0].name}!!</Text>
      )}

      {this._displayLoading()}
      </View>
        }}
        
      </UserConsumer>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: 'black',
    //     shadowOffset: { width: 0, height: -3 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 3,
    //   },
    //   android: {
    //     elevation: 20,
    //   },
    // }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default HomeLoggedScreen
