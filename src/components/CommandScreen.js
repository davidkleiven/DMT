import React, { Component } from 'react';
import { View, TextInput, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import StorageManager from '../storageManager';
import {sshExecute} from '../sshExecute';
import {
    updateFavorites,
    setCommandType,
    setCommand,
    retrieveSSHCred
} from '../actions/commandScreenActions';

import {
    COMMAND_TYPE_TEXT_OUTPUT,
    COMMAND_TYPE_PLOT_OUTPUT,
    DB_NAME
} from '../constants';
import {deletableItemStyle} from './styles';

class CommandScreen extends Component{
    state = {
        command: ''
    }
    storage = new StorageManager();

    createTextInputField = () => {
        return (
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => this.onChangeText(text)}
                placeholder={'Enter a command'}
                value={this.state.command}
                />
            )
    }

    createHistoryButton = (id) => {
        return(
            <View style={deletableItemStyle.container}>
                <View style={deletableItemStyle.mainButton}>
                    <Button
                        title={this.getFavorite(id)}
                        onPress={() => this.selectCommandFromHistory(id)}
                    />
                </View>
                <View style={deletableItemStyle.deleteButton}>
                    <Button
                        title='Del'
                        onPress={() => this.deleteCommandFromHistory(id)}
                    />
                </View>
            </View>
        )
    }

    render(){
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
                <ScrollView>
                    {[0, 1, 2].map((id) => this.createHistoryButton(id))}
                </ScrollView>
            </View>
        );
    }

    deleteCommandFromHistory = (id) => {
        const cmd = this.getFavorite(id);
        console.log(cmd);
        this.storage.deleteCommand(cmd, () => {
            this.storage.mostCalled(this.state.command, (matches) => {
                this.props.updateFavorites(this.state.command, matches);
            })
        })
    }

    getFavorite = (rank) => {
        if (rank >= this.props.favorites.length){
            return ''
        }
        return this.props.favorites[rank];
    }

    selectCommandFromHistory = (rank) => {
        const cmd = this.getFavorite(rank);
        this.storage.mostCalled(cmd, (matches) => {
            this.props.setCommand(cmd, matches);
        });
        this.setState({command: cmd});
    }

    onChangeText = (text) => {
        this.setState({command: text});
        if (text === ''){
            return;
        }

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
        sshExecute(this.props.sshCred, cmd, (res) => {
            console.log(res)
        },
        (err) => {});
    }
    executeCommand = () => {
        this._executeCommand(this.props.command);
    }
};

const mapStateToProps = ({ cmd }) => {
    const { commandType, favorites, command, sshCred } = cmd;
    console.log(sshCred);
    return { commandType, favorites, command, sshCred };
}

export default connect(
    mapStateToProps,
    {
        updateFavorites,
        setCommandType,
        setCommand,
        retrieveSSHCred
    }
)(CommandScreen);