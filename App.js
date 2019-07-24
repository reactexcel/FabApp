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
// import {store} from './src/redux/store'
// import { Provider } from "react-redux";


// XMLHttpRequest = GLOBAL.originalXMLHttpRequest
//   ? GLOBAL.originalXMLHttpRequest
//   : GLOBAL.XMLHttpRequest;

// // fetch logger
// global._fetch = fetch;
// global.fetch = function(uri, options, ...args) {
//   return global._fetch(uri, options, ...args).then(response => {
//     console.log("Fetch", { request: { uri, options, ...args }, response });
//     return response;
//   });
// };

// global.FormData = global.originalFormData;

const App = () => {
  return (
    <Root>
      {/* <Provider store={store} > */}
        <Rootstack />
      {/* </Provider> */}
    </Root>
  );
};

export default App;
