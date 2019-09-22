import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Button } from 'react-native';
import StorageManager from '../storageManager';

class NewConnectionScreen extends Component{
    constructor(props){
        super(props);
        this.host = ''
        this.username = ''
        this.passwd = ''
        this.alias = ''
        this.port = ''
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
                    placeholder={'Host'}
                    onChangeText={(text) => this.host = text}
                    />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    placeholder={'Username'}
                    onChangeText={(text) => this.username = text}
                    />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    placeholder={'Password'} secureTextEntry={true}
                    onChangeText={(text) => this.passwd = text}
                    />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    placeholder={'Alias'}
                    onChangeText={(text) => this.alias = text}
                    />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    placeholder={'Port'}
                    onChangeText={(text) => this.port = text}
                    />
                <Button
                    title='Connect'
                    onPress={() => this.connect()}
                />
            </View>
        )
    }

    connect = () => {
        if (this.host === ''){
            console.log("No hostname");
            return;
        }
        
        if (this.username === ''){
            console.log("No username given!");
            return;
        }

        if (this.alias === ''){
            console.log("No alias given!");
            return;
        }

        if (this.passwd === ''){
            console.log("No password given!");
            return;
        }
        var sm = new StorageManager();
        
        let info = {host: this.host, username: this.username, alias: this.alias, port: this.port};
        sm._storeData(this.alias, JSON.stringify(info));
        sm.updateAliases(this.alias);
    }
}

const mapStateToProps = ({ }) => {
    return {};
}

export default connect(
    mapStateToProps,
    {}
)(NewConnectionScreen);