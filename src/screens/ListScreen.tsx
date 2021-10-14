import * as React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';

import { Text, View } from '../components/Themed';
import { useHuntContext } from "../context/HuntContext";
import { IHunt } from "../interfaces/Hunt";
import { SimpleLineIcons } from "@expo/vector-icons";

import ToggleIcon from "../components/ToggleIcon";

const ListScreen = ({navigation}:any) => {
  const huntContext = useHuntContext();
  const layout = useWindowDimensions();

  const focusOnHunt = (id: string) => {
    console.log(id);
    huntContext.focusHunt(id);
    navigation.navigate('mapScreen')
  }

  /*
  TODO: Change list to an asynchronous list that loads only the data needed
   */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List View</Text>
      <FlatList style={{width: layout.width,}} keyExtractor={(item, index) => item.huntId} data={huntContext.huntList} renderItem={({item}:ListRenderItemInfo<IHunt>) => {
        return <View style={{width: layout.width, ...styles.listItem}} key={item.huntId}>
          <TouchableOpacity onPress={() => focusOnHunt(item.huntId)} style={{flex: 1}}><SimpleLineIcons name={'location-pin'} size={30}/></TouchableOpacity>
          <Text style={{flex: 5, textAlignVertical: 'center'}}>{item.huntName}</Text>
        </View>
      }} />
      <ToggleIcon navigateTo={'mapScreen'} />
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
  },
  listItem: {
    flexDirection:'row',
    borderColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 18,
    height: 60
  }
});

export default ListScreen;
