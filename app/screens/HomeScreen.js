import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default class HomeScreen extends Component {

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor='#000000'></StatusBar>
                <View style={styles.top}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../img/popcorn.png')}
                            style={{ height: 350, width: 300 }}
                        />
                        <Text style={styles.title}>
                            Welcome to RecoMovie
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.descr}>
                            Want to watch a movie but don't know which one ?
                            {'\n\n'}
                            {
                                <Text style={{ fontSize: 10, fontFamily: 'Baloo2-Regular', color: '#FFFFFF' }}>
                                    Then RecoMovie is the solution as it is a Movie recommendation app which help you choose the best movie for your mood by asking some questions and it will deliver you the best movie for you.
                                </Text>
                            }
                        </Text>
                    </View>

                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('RecomGenreScreen')}>
                        <Text style={styles.btnText}>
                            Let's Get Started
                            {'   '}
                            <Fontisto
                                name='angle-dobule-right'
                                color='#f4f4f4'
                                size={17}
                            />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    top: {
        flex: 0.8,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: '#000000'
    },
    bottom: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4'
    },
    backbtn: {
        flex: 0.3,
        justifyContent: 'center',
    },
    back: {
        height: 35,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 0.5,
        justifyContent: 'center',
        
    },
    title: {
        color: '#f4f4f4',
        fontSize: 27, 
        fontFamily: 'Baloo2-Bold'
    },
    descr: {
        fontSize: 13,
        fontFamily: 'Baloo2-Medium',
        marginLeft: '12%',
        marginRight: '5%',
        color: '#FFFFFF',
    },
    btn: {
        height: 60,
        width: 320,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    btnText: {
        color: '#f4f4f4',
        fontSize: 15,
        fontFamily: 'Baloo2-ExtraBold'
    },
})