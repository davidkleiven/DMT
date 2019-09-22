import React, { Component } from 'react';
import { View, TextInput, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import StorageManager from '../storageManager';
import {setKnownConnections} from '../actions/KnownConnectionsActions';
import {deletableItemStyle} from './styles';

class KnownConnectionsScreen extends Component{
    componentWillMount = () => {
        let sm = new StorageManager();
        sm.getKnownConnections((known) => {
            this.props.setKnownConnections(known);
        });
    }

    createKnownConnectionButton = (id) => {
        return (
            <View style={deletableItemStyle.container}>
                <View style={deletableItemStyle.mainButton}>
                    <Button
                        title={this.props.known_connections[id]}
                        onPress={() => this.connectToKnown(id)}
                    />
                </View>
                <View style={deletableItemStyle.deleteButton}>
                    <Button
                        title='Del'
                        onPress={() => this.deleteKnownConnection(id)}
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

    deleteKnownConnection = (id) => {
        let sm = new StorageManager();
        sm.deleteKnownConnection(this.props.known_connections[id], 
            () => {
                sm.getKnownConnections((known) => {
                    this.props.setKnownConnections(known);
                });
            })
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