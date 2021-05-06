import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create ({
    inscr :{
      fontStyle:'italic',
      fontSize:12,
      justifyContent:"center",
      marginBottom:2
    },
    button :{
      marginBottom:10,
      backgroundColor:"green",
      width:300,
      alignItems:"center",
      borderRadius:20,
      height:30,
      shadowColor: 'rgba(0,0,0, .4)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      backgroundColor: '#fff',
      elevation: 2, // Android
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',    
    },
    buttonShop :{
      marginBottom:50,
      width:300,
      alignItems:"center",
      borderRadius:15,
      height:40,
      backgroundColor: 'black',
      elevation: 2, // Android
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',    
    },
    button1 :{
      marginBottom:10,
      marginTop:5,
      backgroundColor:"green",
      width:300,
      alignItems:"center",
      borderRadius:20,
      height:30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
      logo :{
        width:280,
        height:200,
        marginLeft: -20,
        resizeMode:'contain'
      },
      logo2 :{
        width:150,
        height:150,
        resizeMode:'contain',
        justifyContent:'center',
        alignItems:'center',
      },
      label: {
        margin: 8,
        color: 'black',
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 5,
      },
      container : {
        flex:1,
        justifyContent: 'flex-end',
        alignItems:'center',
        backgroundColor: '#f9f9f9',
       
        paddingLeft: 60,
        paddingRight: 60,
      },
      // containerShop : {
      //   flex:1,
      //   justifyContent:'center',
      //   alignItems:'center',
      //   paddingLeft: 60,
      //   paddingRight: 60,
      // },
      header : {
      alignSelf:'stretch',
      height: 40,
      marginBottom: 15,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      color:'#000',
      fontStyle:'italic'
      },
    })
    export default styles