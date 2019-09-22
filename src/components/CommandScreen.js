import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import { connect } from 'react-redux';
import StorageManager from '../storageManager';
import {
    updateFavorites,
    setCommandType,
    setCommand
} from '../actions/commandScreenActions';

import {
    COMMAND_TYPE_TEXT_OUTPUT,
    COMMAND_TYPE_PLOT_OUTPUT,
    DB_NAME
} from '../constants';

class CommandScreen extends Component{
    currentCommand = ''
    storage = new StorageManager();

    createTextInputField = () => {
        if (this.props.command !== this.currentCommand){
            return (
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={text => this.onChangeText(text)}
                    placeholder={'Enter a command'}
                    value={this.props.command}
                    />
                )
        }
        return (
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => this.onChangeText(text)}
                placeholder={'Enter a command'}
                />
            )
        
    }

    render(){
        var data = [['Text output', 'Plot output']]
        return (
            <View>
                <Button
                    title='Settings'
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
                {this.createTextInputField()}
                <Button
                    title='Execute'
                    onPress = {() => this.executeCommand()}
                />
                <Button 
                    title={this.getFavorite(0)}
                    onPress={() => this.selectCommandFromHistory(0)}
                />
                <Button 
                    title={this.getFavorite(1)}
                    onPress={() => this.selectCommandFromHistory(1)}
                />
                <Button 
                    title={this.getFavorite(2)}
                    onPress={() => this.selectCommandFromHistory(2)}
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

    getFavorite = (rank) => {
        if (rank >= this.props.favorites.length){
            return ''
        }
        return this.props.favorites[rank];
    }

    selectCommandFromHistory = (rank) => {
        let cmd = this.getFavorite(rank);
        this.props.setCommand(cmd);
    }

    onChangeText = (text) => {
        if (text === ''){
            return;
        }
        this.currentCommand = text;

        this.storage.mostCalled(text, (matches) => {
            this.props.updateFavorites(text, matches);
        })
    }

    setTextOutput = () => {
        this.props.setCommandType(COMMAND_TYPE_TEXT_OUTPUT);
    }

    setPlotOutput = () => {
        this.props.setCommandType(COMMAND_TYPE_PLOT_OUTPUT);
    }

    _executeCommand = (cmd) => {
        if (cmd === ''){
            return;
        }
        this.storage.updateCommand(cmd);
    }
    executeCommand = () => {
        this._executeCommand(this.props.command);
    }
};

const mapStateToProps = ({ cmd }) => {
    const { commandType, favorites, command } = cmd;
    return { commandType, favorites, command };
}

export default connect(
    mapStateToProps,
    {
        updateFavorites,
        setCommandType,
        setCommand
    }
)(CommandScreen);