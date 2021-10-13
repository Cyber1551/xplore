import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { EvilIcons, Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import ToggleIcon from "../components/ToggleIcon";


const ListScreen = ({navigation}:any) => {
  console.log(typeof navigation);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List View</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default ListScreen;
