


import * as React from 'react';
import { View } from 'react-native';

// import de la librairie webView permettant de gérer et d'afficher une webView issue d'un site web
import { WebView } from 'react-native-webview';
import  LoadingScreen from '../components/LoadingScreen'
import {translate} from '../locale/local'




// Gère l'affichage d'une webView de la page forgotten password du site web de la base d'odoo
export default class ForgottenPassword extends React.Component {
  
    constructor(props) {
      super(props) 
      
      this.state= {isLoading: true, email: '', html: {} }
  
    }

    // écran de chargement
    _displayLoading() {
        if (this.state.isLoading) {
            return (<LoadingScreen/>)
        }
    }


    // l'objectif des 3 prochaines méthodes est d'améliorer l'expérience utilisateur en préchageant le strict minimum nécessaire à l'affichage de la webView
    // effectue la requète html
    getUrl() {
      const url = 'https://carette5.odoo.com/web/reset_password';
      return fetch(url)
      .then((response) => response.text())
      .catch((error) => console.error(error))
    }

    // requète css
    getCss(url) {
      return fetch(url)
      .then((response) => response.text())
      .catch((error) => console.error(error))
    }

    // effectue la requète avant le chargement du screen
    UNSAFE_componentWillMount() {
      this.getUrl().then(data_1 => {

        //data_1 = HTML de la page
        const url = "https://carette5.odoo.com"+data_1.substring(data_1.lastIndexOf('link type="text/css" rel="stylesheet"')+44, data_1.search('web.assets_frontend.css"/>')+23)

        this.getCss(url).then(data_2 => {
          //data_2 = CSS de la page 
          let html_1 = data_1.substring(0,data_1.search('</head>'))
        
          let html_2 = data_1.substring(data_1.search('</head>'),data_1.length);
          // concaténation dans le state html
          this.setState({html : {html: html_1+'<style>'+data_2+'</style>'+html_2 }})
        })
      });}
    
    render() {
      // stockage du string d'injection javascript dans la webView
      const CODE = `
                        if (document.querySelector("p.alert.alert-success")) {
                          
                          window.ReactNativeWebView.postMessage(JSON.stringify({"alert": "success"}));
                          document.location.href="https://carette5.odoo.com/web/reset_password";
                         }
                         document.getElementsByTagName('button')[0].remove();
                         document.getElementsByTagName('a')[0].remove();
                         document.querySelector("div.d-flex").remove();
                         document.getElementsByTagName("footer")[0].remove();
                         document.body.style.backgroundColor ='#FFFFFF';
                         var elements = document.getElementsByTagName('label')
                         while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
                         document.querySelector("input#login").placeholder = "Votre email";
                         document.getElementsByTagName('input')["login"].style.backgroundColor="transparent"
                         document.getElementsByTagName('input')["login"].style.borderColor="transparent transparent white transparent";
                         document.getElementsByTagName('input')["login"].style.fontStyle="italic";
                         document.querySelector('form').innerHTML = "<img width= 300 src=https://carette5.odoo.com/web/image/website/1/logo/Carette?unique=499852a/></br>"+document.querySelector('form').innerHTML;
                            
  
  
                         function ffalse()
                   {
                           return false;
                   }
                   function ftrue()
                   {
                           return true;
                   }
                   document.onselectstart = new Function ("return false");
                   if(window.sidebar)
                   {
                           document.onmousedown = ffalse;
                           document.onclick = ftrue;
                   }
                   document.querySelector('button.btn.btn-primary').addEventListener('click', () => {
                    document.body.style.display='none'
                    
                    window.ReactNativeWebView.postMessage(JSON.stringify({"button": document.querySelector('input#login').value}));
                    
                   })
                   document.body.style.display='block'
                       
                        `

      return (
        <View style={{flex: 1}}>

        {/* Nombreux test dans ce screen, à revoir
        cette page peut tout a fait être gérée en passant par l'API d'odoo via un write sur le model res.users
        l'idée est de tester le préchagement de données en ligne sur l'expérience utilisateur
        */}
        <WebView
        originWhitelist={['*']}
        style={{flex: 1, marginTop: -10}}
        source={this.state.html}
        injectedJavaScript={CODE}

        onMessage={event => {
  
          let message = JSON.parse(event.nativeEvent.data)
  
          if (message.button) {
            this.setState({isLoading: true, email: message.button})
  
          } else if (message.alert) {
            //message alert danger :: switch todo
            this.setState({isLoading: false})
            this.props.navigation.navigate(translate("STACK_SIGN_IN"), { email: this.state.email, alert: "un mail a été envoyé à "+this.state.email });
          }

        }}
        onLoad={() => {this.setState({isLoading: false})}}
        
      
      />
      {this._displayLoading()}
      </View>
    ); }
  }
  