import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MapScreen from "./src/screens/MapScreen";
import ListScreen from "./src/screens/ListScreen";
import { Ionicons } from "@expo/vector-icons";

const renderScene = SceneMap({
  map: MapScreen,
  list: ListScreen,
});

const App = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'map', icon: 'map'},
    { key: 'list', icon: 'list'},
  ]);
  return (
      <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={props => <TabBar renderIcon={({route, focused, color}) => (
              // @ts-ignore
              <Ionicons name={route.icon} color={color} />
          )} {...props} />}
          tabBarPosition={'bottom'}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
      />
  );
}

export default App;
