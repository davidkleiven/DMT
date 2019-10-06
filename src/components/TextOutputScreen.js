import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Button, Text } from 'react-native';

class TextOutputScreen extends Component{
    render(){
        return (
        <View>
            <Button title='Back' onPress={() => this.props.navigation.navigate('Command')}/>
            <ScrollView>
                <Text>
                    {this.props.commandOutput}
                </Text>
            </ScrollView>
        </View>
    )
    }
}

const mapStateToProps = ({txtOutRed}) => {
    const { commandOutput} = txtOutRed;
    return {commandOutput};
}

export default connect(mapStateToProps, {})(TextOutputScreen);