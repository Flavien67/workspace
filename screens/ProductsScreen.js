import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity, Animated, ImageBackground, ScrollView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getProducts } from '../API/ApiRequest';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import AnimatedColorView from 'react-native-animated-colors';


const { height, width } = Dimensions.get('window');



class Products extends React.Component {
  
  constructor(props) {
    super(props)
    this.carousel = {};
    this.carousel_2 = {};
    this.state = { products: [],
                    image: this.props.route.params.image ,
                    activeIndex:0,
                    carouselItems: [
                      // exemple:
                    // {
          
                    //     title:"Couleur",
                    //     items: ['blue',
                    //             'red',
                    //             'orange'],
                    //     // button: this._onPressCarousel,
                    //   },
                    // {
                        
                    //     title:"Matière",
                    //     items: ['michel'],
                        
                    //   },
                    // {
                    //   title:"fonction",
                    //   items: [],
                      
                    //   },
                    //   {
                    //     title:"test",
                    //     items: [],
                        
                    //     },
                    //     {
                    //       title:"retest",
                    //       items: [],
                          
                    //       },
                    //       {}// !!!!! important !!!!
                  ]
    // this._loadProducts();
  }}

  componentDidMount(){
    this.setState({carouselItems: this.props.route.params.item.carouselItems, image: this.props.route.params.item.image_1920})
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    
    this.setState({carouselItems: newProps.route.params.item.carouselItems, image: newProps.route.params.item.image_1920})
    this.carousel.snapToItem(0);
    this.carousel_2.snapToItem(0);
   
  }


    _renderNav({item, index}) {

      if (item.title) {
        return(

          <View
            
            style={styles.item}
            >

                    <Text 
                    style={styles.text} 
                    numberOfLines={1}>
                        { item.title }
                    </Text>

                    </View>
                
                )
                  }
        
      }

  


      _renderItem({item,index}){
        // console.log(item.Couleur)
    
    
        return (
          <View style={{
            flex: 1,
            marginLeft:20,
    
              backgroundColor:'floralWhite',
              borderRadius: 10,
              height:1,
              alignItems: 'center',
              
              marginRight: 10, }}>  
          <View style={{
            flex: 0,
            flexDirection: 'row',
              backgroundColor:'#F5FCFF',
              borderRadius: 10,
    
    
              }}>
                  
            
            <TouchableOpacity
                style={{width: 50,height: 50, marginTop: 5, marginLeft: 5, justifyContent: 'center',alignItems: 'center', backgroundColor: '#00BCD4', borderRadius: 25}}
                onPress={() => {
    
                    this.carousel.snapToItem(index-1);
                    this.carousel_2.snapToItem(index-1);
                  
                }}
    
    
            >
              <Icon
                name="arrow-left"
                size={30}
                color="blue"
              />
            
            </TouchableOpacity>
    
    
            <Text style={{fontSize: 30, flex: 20, textAlign: 'center'}}>{item.title}</Text>
            <TouchableOpacity
                style={{width: 50, height: 50, marginTop: 5, marginRight: 5, justifyContent: 'center',alignItems: 'center', backgroundColor: '#00BCD4', borderRadius: 25}}
            
            onPress={() => {
              
              if ( index==this.state.carouselItems.length-2) {
                
    
              } else {
                this.carousel.snapToItem(index+1);
                this.carousel_2.snapToItem(index+1);
              }
              
            }}
            ><Icon
            name="arrow-right"
            size={30}
            color="blue"
          />
          </TouchableOpacity>
          </View>

          
            
            <FlatList
                  data={item.items}
                  style={{width:250,flex:1,height:100}}
                  keyExtractor={(item) => item.properties.toString()}
                  renderItem={({item}) => 
                  <View style={{flex:1,paddingBottom:10}}>
                    <TouchableOpacity style={{flex:1}}>
                      <Text style={{width:250,height:50,borderColor:'black',borderWidth:1,paddingLeft:105,paddingTop:14,textTransform:'uppercase',backgroundColor:item.properties[1]}}>{item.properties[0]}</Text>
                  </TouchableOpacity>
                  </View>}
              />
    
          
          
          
          
          
          
          
          {/* <FlatList
              data={item.items}
              // keyExtractor={(item) => item.color.toString()}
              renderItem={({item}) => <Button title={item}/>}
          /> */}
          
          </View>
       
    
        )
    }
    
    
    
    
    
    
      // _loadProducts() {
      //   getProducts().then(data => {
      //     this.setState({ products: data })
      //   });
      // }
    
    
      render() {
        // console.log(this.state)
    
      return (
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
              <ImageBackground
                source={require('../assets/images/profile-screen-bg.png')}
                style={styles.profileContainer}
                imageStyle={styles.profileBackground}
              >
    
              <View style={{ flex:2, justifyContent: 'center',paddingTop: 10, height: 20 }}>
                <Carousel
    
                  layout={"default"}
                  ref={ref => this.carousel_2 = ref}
                  data={this.state.carouselItems}
                  sliderWidth={width}
                  itemWidth={100}
                  renderItem={this._renderNav.bind(this)}
                  scrollEnabled={false}
                  />
                  
              </View>
          
          
              <View style={{flex: 14,alignItems: 'center',justifyContent: 'center', paddingBottom: 10 }}>
              <Image style={{width: width/1.1, height: height/2.7}} source={{uri: `data:image/gif;base64,${this.state.image}`}}/>
              </View>
              <View style={{ flex: 20, flexDirection:'row', justifyContent: 'center'}}>
                <Carousel
                style={{paddingTop: 3}}
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={350}
                  itemWidth={350}
                  renderItem={this._renderItem.bind(this)}
                  
                  onSnapToItem = { index => this.setState({activeIndex:index}) } 
                  scrollEnabled= {false}
                  />
                  
              </View>
          {/* <FlatList
              data={this.state.products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <ProductsItem product={item}/>}
            /> */}
            </ImageBackground>
        </View>
      );
    }
    
    }
    
    
    
    const styles = StyleSheet.create({
      // variantes: {
      //   width:200,
      //   height:50,
      //   backgroundColor:'yellow',
        
     
      // },
      container: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
      },
      contentContainer: {
        // paddingTop: 15,
      },
      
      text: {
        color: '#fff',
        fontSize: 20,
    
        
        },
        profileContainer: {
          width: width,
          height: height,
          padding: 0,
          zIndex: 0
        },
        profileBackground: {
          width: width,
          height: height / 2
        },
      item: {
        height:30,
        width: 150,
        alignItems: 'flex-start',
        justifyContent: 'center',
        
        
        borderRadius: 5,
        backgroundColor: '#5e73e5',
        borderStyle: 'solid',
        borderWidth: 1,
        
        },
      image: {
        // width: width-20,
        // height: 240
      },
      optionIconContainer: {
        marginRight: 12,
      },
      option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
      },
      lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
      },
    });
    
    export default Products
    
