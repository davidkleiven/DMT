import React, { Component } from 'react';
import { View, TextInput, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import StorageManager from '../storageManager';
import {setKnownConnections} from '../actions/KnownConnectionsActions';

class KnownConnectionsScreen extends Component{
    componentWillMount = () => {
        let sm = new StorageManager();
        sm.getKnownConnections((known) => {
            this.props.setKnownConnections(known);
        });
    }

    createKnownConnectionButton = (id) => {
        return (
            <Button
                title={this.props.known_connections[id]}
                onPress={() => this.connectToKnown(id)}
            />
        )
    }

    render(){
        return (
            <View>
                <Button
                    title='Settings'
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    placeholder={'Password'} secureTextEntry={true}
                    onChangeText={(text) => this.passwd = text}
                />
                <ScrollView>
                    {this.props.known_connections.map((_, index) => this.createKnownConnectionButton(index))}
                </ScrollView>
                <Button
                    title='Connect'
                    onPress={() => this.connect()}
                />
            </View>
        )
    }

    connectToKnown = (id) => {

    }

    connect = () => {

    }
}

const mapStateToProps = ({ knownConRed }) => {
    const {known_connections} = knownConRed;
    return {known_connections};
}

export default connect(
    mapStateToProps,
    {setKnownConnections}
)(KnownConnectionsScreen);