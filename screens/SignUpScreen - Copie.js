import * as React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import  LoadingScreen from '../components/LoadingScreen';




class SignUp extends React.Component 
{

  constructor(props) {
    super(props)
    this.state = { 
      
       
                          isLoading: true, 
                          email: "",
                          html: {},
                          
                        };
  }
  
    _displayLoading() {
        if (this.state.isLoading) {
            return (<LoadingScreen/>)
        }
    }
  

    getUrl() {
      const url = 'https://carette5.odoo.com/web/signup';
      return fetch(url)
      .then((response) => response.text())
      .catch((error) => console.error(error))
    }

    getCss(url) {
      return fetch(url)
      .then((response) => response.text())
      .catch((error) => console.error(error))
    }

    componentDidMount() {
      this.getUrl().then(data_1 => {
        // this.setState({ html: {html: data} })
        const url = "https://carette5.odoo.com"+data_1.substring(data_1.lastIndexOf('link type="text/css" rel="stylesheet"')+44, data_1.search('web.assets_frontend.css"/>')+23)

        this.getCss(url).then(data_2 => {
          
          let html_1 = data_1.substring(0,data_1.search('</head>'))
        
          let html_2 = data_1.substring(data_1.search('</head>'),data_1.length);
        
          this.setState({html : {html: html_1+'<style>'+data_2+'</style>'+html_2 }})
        })
      });
      
      
      
      
      
    }

    
    
  
    render() {
      const runTest = `
      document.getElementsByTagName("form")[0].action = "https://carette5.odoo.com/web/signup"


      
    //   if (window.location.href!= "about:blank" && window.location.href!= "https://carette5.odoo.com/web/signup") {
    //     location.replace("https://www.w3schools.com")
    // }
    //                             // window.ReactNativeWebView.postMessage(JSON.stringify({ email: document.querySelector('[itemprop="email"]').innerText}));
    //                             // document.location.href="https://carette5.odoo.com/web/signup";
    //                           } else if (document.querySelector('h1.mt-5')) {
    //                             // window.ReactNativeWebView.postMessage(JSON.stringify({ alert : "fail"}))
    //                             // document.location.href="https://carette5.odoo.com/web/signup";
    //                           } 

    if (document.querySelector('h1.mt-5')) {
                                  window.ReactNativeWebView.postMessage(JSON.stringify({ alert : "fail"}))
                                  document.location.href="https://carette5.odoo.com/web/signup";
                                } 


    document.querySelector('header').remove()
                             
                              
                              // document.getElementsByTagName('button')[0].remove();
                              // document.getElementsByTagName('a')[0].remove();
                              document.querySelector("a.btn").remove();
                              document.getElementsByTagName("footer")[0].remove();
                              document.body.style.backgroundColor ='#36485f';
                              var elements = document.getElementsByTagName('label')
                              while (elements[0]) elements[0].parentNode.removeChild(elements[0])
                              document.querySelector("input#login").placeholder = "Votre email";
                              document.querySelector("input#name").placeholder = "Votre nom";
                              document.querySelector("input#password").placeholder = "Saisissez votre mot de passe";
                              document.querySelector("input#confirm_password").placeholder = "Confirmez votre mot de passe";
                              document.getElementsByTagName('input')["login"].style.backgroundColor="transparent"
                              document.getElementsByTagName('input')["name"].style.backgroundColor="transparent"
                              document.getElementsByTagName('input')["password"].style.backgroundColor="transparent"
                              document.getElementsByTagName('input')["confirm_password"].style.backgroundColor="transparent"
                              document.getElementsByTagName('input')["login"].style.borderColor="transparent transparent white transparent"
                              document.getElementsByTagName('input')["name"].style.borderColor="transparent transparent white transparent"
                              document.getElementsByTagName('input')["password"].style.borderColor="transparent transparent white transparent"
                              document.getElementsByTagName('input')["confirm_password"].style.borderColor="transparent transparent white transparent"
                              document.getElementsByTagName('input')["login"].style.fontStyle="italic"
                              document.getElementsByTagName('input')["login"].style.color="white"
                              document.getElementsByTagName('input')["name"].style.fontStyle="italic"
                              document.getElementsByTagName('input')["password"].style.fontStyle="italic"
                              document.getElementsByTagName('input')["confirm_password"].style.fontStyle="italic"
                              document.getElementsByTagName('input')["name"].style.fontStyle="italic"
                              document.getElementsByTagName('input')["password"].style.fontStyle="italic"
                              document.getElementsByTagName('input')["confirm_password"].style.fontStyle="italic";
                              document.querySelector('form').innerHTML = "<img width= 300 src=https://carette5.odoo.com/web/image/website/1/logo/Carette?unique=7b26a75></br>"+document.querySelector('form').innerHTML;
                              
                              // document.querySelector('button.btn.btn-primary').addEventListener('click', () => {
                              //   window.ReactNativeWebView.postMessage(JSON.stringify({ click: true }));
                              // })

                              document.getElementsByTagName('input')["login"].addEventListener('blur', function(event) {
                                window.ReactNativeWebView.postMessage(JSON.stringify({ email: document.getElementsByTagName('input')["login"].value}))
                                
                              })
                              document.querySelector('form').addEventListener('submit', () => {
                                window.ReactNativeWebView.postMessage(JSON.stringify({ click: true }));
                              })
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
                          window.ReactNativeWebView.postMessage(JSON.stringify({ isLoading : true }))
                          `;
                          
                          console.log(this.state.email)
      
      return (
        <View style={{flex: 1}}>
        <WebView
        originWhitelist={['*']}
        style={{flex: 1}}
        source={ this.state.html }
        
        injectedJavaScript={runTest}
        
        onLoadProgress={e => {
          
          if (e.nativeEvent.title=="My Portal | Carette") {
          this.setState({ html: { uri: "https://carette5.odoo.com/web/signup"}, isLoading: false })
          this.props.navigation.navigate('Connexion', { email: this.state.email, alert: "congratulation, you are register" });

        }}}

        
        onMessage={event => {
          
          
          let message = JSON.parse(event.nativeEvent.data);
          
          if (message.email) {
            
            this.setState({ email: message.email });

            // this.props.navigation.navigate('Connexion', { email: message.email, alert: "congratulation, you are register" });
          } else if (message.alert) {
            
            alert('Un problème est survenu try again!!')
            this.setState({isLoading: false })
          } 
          else if (message.click) {
            this.setState({ isLoading: true })
            
            
          } else if( message.isLoading ) {

            this.setState({ isLoading : false })
          }
          
        }}

        // // onLoad={() => {this.setState({isLoading: false})}}
        

        // onLoadStart = {event => {if (event.nativeEvent.url=="https://test-entreprise1.odoo.com/web/signup") {
        //   console.log(event.nativeEvent.url)
        //   // this.setState({isLoading: true})
        //   // setTimeout(() => this.setState({isLoading: false}), 2000)
        // } else {
        //   console.log(event.nativeEvent.url)
        //   // this.setState({isLoading: true})
        // }}}

        //   // renderLoading={()=> {return(<ActivityIndicator size='large' style={{ position: "absolute", top:  20, left:  20 }}/>)}}
          
        
            
                

        //       // }}
        />
        {this._displayLoading()}
        </View>

        
        

      );
    }
    
}

export default SignUp;