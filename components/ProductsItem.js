// Components/ProductsItem.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Card, Button } from 'react-native-elements';

class ProductsItem extends React.Component {
  render() {

    const product = this.props.product
    
    return (

      <Card
            style={styles.image}
            image={{uri: `data:image/gif;base64,${product.image_1920}`}}>
            <Text style={{marginBottom: 10, marginTop: 20 }}>
              {product.name}
            </Text>
            <Text style={styles.price} h4>
              {product.list_price}€
            </Text>
            <Text h6 style={styles.description}>
                added 2h ago
            </Text>
            <Button
            type="clear"
            title='Buy now'
            onPress={() => this.props.navigation.navigate('Details')} />
        </Card>





      // <View style={styles.main_container}>
      //   <Image
      //     style={styles.image}
      //     source={{uri: `data:image/gif;base64,${product.image_1920}`}}
      //   />
      //   <View style={styles.content_container}>
      //     <View style={styles.header_container}>
      //       <Text style={styles.title_text}>{product.name}</Text>
      //       <Text style={styles.vote_text}>{product.list_price} €</Text>
      //     </View>
      //     <View style={styles.description_container}>
      //       <Text style={styles.description_text} numberOfLines={6}>{product.description}</Text>
      //     </View>
      //     <View style={styles.date_container}>
      //       <Text style={styles.date_text}>Sorti le 00/00/0000</Text>
      //     </View>
      //   </View>
      // </View>
    )
  }
}
const styles = StyleSheet.create({
  name: {
      color: '#5a647d',
      fontWeight: 'bold',
      fontSize: 30
  },
  price: {
      fontWeight: 'bold',
      marginBottom: 10
  },
  image: {
        resizeMode:'cover',
        margin: 5,
        // backgroundColor: 'gray'
      },
  description: {
      fontSize: 10,
      color: '#c1c4cd'
  }
});
// const styles = StyleSheet.create({
//   main_container: {
//     flexDirection: 'row',
//   },
//   image: {
//     width: 120,
//     height: 180,
//     margin: 5,
//     // backgroundColor: 'gray'
//   },
//   content_container: {
//     flex: 1,
//     margin: 5
//   },
//   header_container: {
//     flex: 3,
//     flexDirection: 'row'
//   },
//   title_text: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     flex: 1,
//     flexWrap: 'wrap',
//     paddingRight: 5
//   },
//   vote_text: {
//     fontWeight: 'bold',
//     fontSize: 26,
//     color: '#666666'
//   },
//   description_container: {
//     flex: 7
//   },
//   description_text: {
//     fontStyle: 'italic',
//     color: '#666666'
//   },
//   date_container: {
//     flex: 1
//   },
//   date_text: {
//     textAlign: 'right',
//     fontSize: 14
//   }
// })

export default ProductsItem