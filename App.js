/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import HomePage from "./src/screens/HomePage";
import { Root, } from "native-base";
import Rootstack from './src/config/Navigation';
import {Component} from "react"


export default class App extends Component {
  render(){
    return (
        // <Root>
            <Rootstack />
        // </Root>
    )
  }
};


