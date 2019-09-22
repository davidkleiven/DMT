import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import StorageManager from '../storageManager';

class SettingsScreen extends Component{
    render(){
        return(
            <View>
                <Button
                    title='Clear Data'
                    onPress = {() => this.clearData()}
                />
                <Button
                    title='New connection'
                    onPress = {() => this.props.navigation.navigate('NewConnection')}
                />
                <Button
                    title='Known connections'
                    onPress = {() => this.props.navigation.navigate('KnownConnections')}
                />
            </View>
        )
    }

    clearData = () => {
        var storage = new StorageManager();
        storage.clearAll();
    }
}

const mapStateToProps = ({}) => {
    return {};
}

export default connect(
    mapStateToProps, {}
)(SettingsScreen);