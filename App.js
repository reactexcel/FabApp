/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomePage from "./src/screens/HomePage";
import { Root, } from "native-base";
import Rootstack from './src/config/Navigation';

const App = () => {
  return (
    <Root>
      <Rootstack />
    </Root>
  );
};

export default App;
