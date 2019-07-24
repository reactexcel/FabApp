import { createStackNavigator } from "react-navigation";
import { Easing, Animated } from "react-native";
import HomePage from "../screens/HomePage";
import Exebition from "../screens/Exebition";
import WorkerForm from "../screens/Form";
import FabricatorProfile from "../screens/FabricatorProfile";

const transitionConfig = () => {
    return {
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: sceneProps => {
        const { position, layout, scene, index, scenes } = sceneProps;
        const toIndex = index;
        const thisSceneIndex = scene.index;
        const width = layout.initWidth;
  
        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [width, 0, 0]
        });
  
        const slideFromRight = { transform: [{ translateX }] };
  
        const lastSceneIndex = scenes[scenes.length - 1].index;
  
        if (lastSceneIndex - toIndex > 1) {
          if (scene.index === toIndex) return;
  
          if (scene.index !== lastSceneIndex) return { opacity: 0 };
  
          return slideFromRight;
        }
        return slideFromRight;
      }
    };
  };

  const Rootstack = createStackNavigator({
    FabricatorProfile:{
      screen:FabricatorProfile
    },
    HomePage: {
        screen: HomePage
      },
      Exebition: {
        screen: Exebition
      },
      WorkerForm:{
          screen:WorkerForm
      },
      // FabricatorProfile:{
      //   screen:FabricatorProfile
      // }
    },
    {
        initialScreen: "FabricatorProfile",
        transitionConfig
    })

  export default Rootstack;