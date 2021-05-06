import * as React from 'react';
import { Dimensions, Image, View, Text, ImageBackground, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
// import {getAccessories } from '../API/ApiRequest';
import { translate } from "../locale/local";
import { getProducts } from '../API/ApiRequest';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import  LoadingScreen from '../components/LoadingScreen';

const { height, width } = Dimensions.get('window');


  // forme globale d'un item composant le tableau carouselItem:
  //
  //       image: require('../assets/images/IMG_8238_lzn.jpg'),
  //       title:"Carette V1",
  //       text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ",
  //       button: () => this.props.navigation.navigate(translate("STACK_ABOUT"), {
  //         itemId: 'Carette V1',
  //         image: require('../assets/images/IMG_8238_lzn.jpg'),
  //       }),
  //     },

// classe gérant l'écran d'entrée dans le e-comerce, il effectue la requete principale de récupération des données de vente
class ShopScreen extends React.Component {

    // initialisation de la classe avec un state et un carousel
    // l'attribut carousel permet de contrôler les actions du carousel
    constructor(props){
        super(props);
        this.carousel = {}
        this.state = {
          activeIndex:0,
          carouselItems: [],
          isLoading: true,
      }
    }

    
    // Méthode de requète de produits et de leur paramètres dans la BDD Odoo
  _loadProducts() {
    getProducts().then(data => {
      this.setState({ carouselItems: data, isLoading: false })
    });
  }

  // Exécution de la requète avant le chargement total du screen
  UNSAFE_componentWillMount() {
    
    this._loadProducts()
  }

  

  // méthode de mise en forme et d'affichage des items du carousel
  _renderItem({item,index}){

            return (
                
              <View style={{
                  backgroundColor:'floralwhite',
                  borderRadius: 10,
                  height: width,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 20, }}>
                      {/* les images sont stockées dans la BDD Odoo en base64 */}
                      <Image style={stile.logo} source={{uri: `data:image/gif;base64,${item.image_1920}`}}/>
                      <Text style={{fontSize: 50, marginTop: -100, color: 'white'}}>{item.name}</Text>
                <ScrollView><Text style={{marginLeft:10,fontStyle:"italic",width:250, color: 'white'}}>{item.description_sale}</Text></ScrollView>

              </View>
    
            )
        }
    
    // méthode de mise en forme et d'affichage de la pagination du carousel
    pagination () {
      
        return (
            <Pagination
              // carouselRef prend en paramètre l'attribut carousel
              carouselRef={this.carousel}
              dotsLength={this.state.carouselItems.length}
              activeDotIndex={this.state.activeIndex}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgb(255,0,0)'
              }}
              inactiveDotStyle={{
                backgroundColor: 'rgb(195,187,187)'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              tappableDots={true}
            />
        );
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

        
    <SafeAreaView style={{flex: 1 }}>
        <ImageBackground style={stile.containerShop} source={require('../assets/images/background_1.jpg')}>
      <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center',}}>
          <Carousel
          style={{}}
          
            layout={"default"}
            ref={ref => this.carousel = ref}
            data={this.state.carouselItems}
            sliderWidth={width+10}
            itemWidth={width}
            renderItem={this._renderItem}
            onSnapToItem = { index => this.setState({activeIndex:index}) } 
            scrollEnabled = {false}
            />
            
      </View>
      <View>
      <TouchableOpacity
          style={{width: 200,height: 50, marginTop: 5, marginLeft: 5, justifyContent: 'center',alignItems: 'center', backgroundColor: '#00BCD4'}}
          onPress={() => {
              // this._toggleShopping();
              this.carousel.snapToItem(this.state.activeIndex);
              // console.log(this.state.activeIndex)
              this.props.navigation.navigate(translate("STACK_ABOUT"),{
                
                item:this.state.carouselItems[this.state.activeIndex],
              })
              
                            
          }}


      ><Text style={{color:"white",fontWeight:"bold"}}>SÉLECTIONNER</Text>
  
  </TouchableOpacity>
      </View>
      
      
      <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
          style={{width: 50,height: 50, marginTop: 5, marginLeft: 5, justifyContent: 'center',alignItems: 'center', backgroundColor: '#00BCD4', borderRadius: 25}}
          onPress={() => {

              this.carousel.snapToItem(this.state.activeIndex-1);
              
            
          }}


      ><Icon
      name="arrow-left"
      size={30}
      color="blue"
    />
  
  </TouchableOpacity>
      { this.pagination() }
      <TouchableOpacity
          style={{width: 50, height: 50, marginTop: 5, marginRight: 5, justifyContent: 'center',alignItems: 'center', backgroundColor: '#00BCD4', borderRadius: 25}}
      
      onPress={() => {
        
       
          this.carousel.snapToItem(this.state.activeIndex+1);
          
        
        
      }}
      ><Icon
      name="arrow-right"
      size={30}
      color="blue"
    /></TouchableOpacity>
      {this._displayLoading()}
      </View>
      </ImageBackground>
    </SafeAreaView>
    
  );
}
}

// const mapStateToProps = (state) => {
//   return {
//     shoppingList:state.shoppingList
//   }
// }


const stile = StyleSheet.create({
  logo: {
      width: width,
      height: width,
      // resizeMode:'contain',
      // marginTop:10,
      // marginBottom:10
    },
    containerShop : {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
     
    },
})

// export default connect(mapStateToProps)(ShopScreen)
export default ShopScreen