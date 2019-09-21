import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import { connect } from 'react-redux';
import StorageManager from '../storageManager';

import {
    COMMAND_TYPE_TEXT_OUTPUT,
    COMMAND_TYPE_PLOT_OUTPUT,
    DB_NAME
} from '../constants';

class CommandScreen extends Component{
    state = {commandType: COMMAND_TYPE_TEXT_OUTPUT, cmd: ''}
    storage = new StorageManager();

    render(){
        var data = [['Text output', 'Plot output']]
        return (
            <View>
                <Button
                    title='Settings'
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={text => this.onChangeText(text)}
                    placeholder={'Enter a command'}
                    />
                <Button
                    title='Execute'
                    onPress = {() => this.executeCommand()}
                />
                <View style={{height: 40}}>
                    <DropdownMenu
                        style={{flex: 1}}
                        bgColor={'white'}
                        tintColor={'#666666'}
                        activityTintColor={'green'} 
                        title='Expected output'
                        titleStyle={{color: '#333333'}} 
                        handler={(selection, row) => this.setState({text: data[selection][row]})}
                        data={data}
                    />
                </View>
            </View>
        );
    }

    onChangeText = (text) => {
        this.state.cmd = text;
    }

    setTextOutput = () => {
        this.props.commandType = COMMAND_TYPE_TEXT_OUTPUT
    }

    setPlotOutput = () => {
        this.props.commandType = COMMAND_TYPE_PLOT_OUTPUT
    }

    executeCommand = () => {
        this.storage.updateCommand(this.state.cmd);
    }
};

const mapStateToProps = ({ cmd }) => {
    const { updateFavorites, commandType } = cmd;

    return { updateFavorites, commandType };
}

export default connect(
    mapStateToProps, {}
)(CommandScreen);