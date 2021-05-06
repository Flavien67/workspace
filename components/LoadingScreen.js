import * as React from 'react';
import styles from '../assets/styles/stylesLoading'
import { ActivityIndicator, View } from 'react-native';
import { Overlay } from 'react-native-elements';

export default function _loadingScreen() {
      return ( 
        <Overlay
        overlayStyle={{height: 0, width: 0}}
        fullScreen={false}
        animationType="fade"
        transparent={false}
        isVisible={true}
        
        
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <ActivityIndicator size='large' style={{ position: "absolute", top:  17, left:  17 }}/>


              
            
          </View>
        </View>
      </Overlay>
      )
    // }
  }