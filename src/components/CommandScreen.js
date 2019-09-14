import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import { connect } from 'react-redux';
import {
    COMMAND_TYPE_TEXT_OUTPUT,
    COMMAND_TYPE_PLOT_OUTPUT
} from '../constants';

class CommandScreen extends Component{
    state = {commandType: COMMAND_TYPE_TEXT_OUTPUT, cmd: ''}
    render(){
        var data = [['Text output', 'Plot output']]
        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={text => this.props.onChangeText(text)}
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

    setTextOutput = () => {
        this.props.commandType = COMMAND_TYPE_TEXT_OUTPUT
    }

    setPlotOutput = () => {
        this.props.commandType = COMMAND_TYPE_PLOT_OUTPUT
    }

    executeCommand = () => {

    }
};

const mapStateToProps = ({ cmd }) => {
    const { onChangeText, commandType } = cmd;

    return { onChangeText, commandType };
}

export default connect(
    mapStateToProps, {}
)(CommandScreen);