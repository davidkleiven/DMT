import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';

class CommandScreen extends Component{
    render(){
        return (
            <View>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => this.props.onChangeText(text)}
                value={value}
                />
            </View>
        );
    }
};

const mapStateToProps = ({ cmd }) => {
    const { onChangeText } = cmd;

    return { onChangeText };
}

export default connect(
    mapStateToProps, {}
)(CommandScreen);