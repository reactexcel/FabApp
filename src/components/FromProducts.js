import React, { Component } from 'react'
import {  View } from 'react-native'
import { Container, Header,Left,Right,ListItem,Icon,Picker,Form, Content, Item, Input,Text, Radio } from 'native-base';

export default class FromProducts extends Component {
    render() {
        return (
            <View>
                <Form>
                    <Picker
                    mode="dropdown"
                    iosHeader="Select your SIM"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={"key0"}
                    onValueChange={()=>null}
                    >
                    <Picker.Item label="Wallet" value="key0" >
                    <Text>dvsdvsdvsdvsd</Text>
                    </Picker.Item>
                    <Picker.Item label="ATM Card" value="key1" />
                    <Picker.Item label="Debit Card" value="key2" />
                    <Picker.Item label="Credit Card" value="key3" />
                    <Picker.Item label="Net Banking" value="key4" />
                    </Picker>
                </Form>
            </View>
        )
    }
}
