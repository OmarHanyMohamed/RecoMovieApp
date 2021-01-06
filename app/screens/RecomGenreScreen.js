import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class RecomGenreScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comedy: false,
            action: false,
            drama: false,
            romance: false,
            final: '',
            isLoading: true,
            movies: [],
            errorMessage: ''
        }
    }

    genreRecom = () => {
        this.setState({
            isLoading: false,
            errorMessage: ''
        })

        if (this.state.final !== '') {
            fetch("http://192.168.43.169:5000/genre", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: this.state.final
                })
            }).then((res) => res.json())
                .then((responeJson) => {
                    this.setState({
                        movies: responeJson.results,
                        isLoading: true
                    })
                    this.props.navigation.navigate('GenreResults', {
                        movies: this.state.movies
                    })
                })

                .catch((error) => console.log('error:', error))
        } else {
            this.setState({
                errorMessage: 'You Must Choose a Genre First',
                isLoading: true
            })
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor='#000000'></StatusBar>

                <View style={styles.slide1}>
                    <View style={styles.backbtn}>
                        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome
                                name='chevron-left'
                                color='#000000'
                                size={25}
                                style={{ marginLeft: '3%' }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.question}>
                        <Text style={styles.text}>What genre would you like to watch ?</Text>
                    </View>
                    <View style={styles.answers}>
                        <View style={styles.checkBox}>
                            <CheckBox
                                checkedColor='#000000'
                                textStyle={{ fontFamily: 'Baloo2-Regular', fontSize: 17, color: this.state.comedy ? '#000000' : 'grey', marginLeft: '5%' }}
                                size={30}
                                containerStyle={styles.containerStyle}
                                title='Comedy'
                                checked={this.state.comedy}
                                checkedIcon='check-circle'
                                uncheckedIcon='circle'
                                uncheckedColor='#F6F6F6'
                                onPress={() => this.setState({ comedy: !this.state.comedy, action: false, drama: false, romance: false, final: 'Comedy' })}
                            />
                            <CheckBox
                                checkedColor='#000000'
                                textStyle={{ fontFamily: 'Baloo2-Regular', fontSize: 17, color: this.state.action ? '#000000' : 'grey', marginLeft: '5%' }}
                                size={30}
                                containerStyle={styles.containerStyle}
                                title='Action'
                                checked={this.state.action}
                                checkedIcon='check-circle'
                                uncheckedIcon='circle'
                                uncheckedColor='#F6F6F6'
                                onPress={() => this.setState({ action: !this.state.action, comedy: false, drama: false, romance: false, final: 'Action' })}
                            />
                            <CheckBox
                                checkedColor='#000000'
                                textStyle={{ fontFamily: 'Baloo2-Regular', fontSize: 17, color: this.state.drama ? '#000000' : 'grey', marginLeft: '5%' }}
                                size={30}
                                containerStyle={styles.containerStyle}
                                title='Drama'
                                checked={this.state.drama}
                                checkedIcon='check-circle'
                                uncheckedIcon='circle'
                                uncheckedColor='#F6F6F6'
                                onPress={() => this.setState({ drama: !this.state.drama, comedy: false, action: false, romance: false, final: 'Drama' })}
                            />
                            <CheckBox
                                checkedColor='#000000'
                                textStyle={{ fontFamily: 'Baloo2-Regular', fontSize: 17, color: this.state.romance ? '#000000' : 'grey', marginLeft: '5%' }}
                                size={30}
                                containerStyle={styles.containerStyle}
                                title='Romance'
                                checked={this.state.romance}
                                checkedIcon='check-circle'
                                uncheckedIcon='circle'
                                uncheckedColor='#F6F6F6'
                                onPress={() => this.setState({ romance: !this.state.romance, comedy: false, action: false, drama: false, final: 'Romance' })}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.error}>
                    <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                </View>
                <View style={styles.btnContainer}>
                    {
                        this.state.isLoading ?
                            <TouchableOpacity style={styles.btn} onPress={this.genreRecom}>
                                <Text style={styles.btnText}>
                                    Proceed
                                </Text>
                            </TouchableOpacity>
                            :
                            <View style={styles.spinner}>
                                <ActivityIndicator size={'large'} color='#000000' />
                            </View>
                    }
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6'
    },
    wrapper: {},
    header: {
        flex: 0.1,
        marginLeft: '5%',
        marginTop: '5%'
    },
    backbtn: {
        flex: 0.2,
        justifyContent: 'center',
    },
    back: {
        height: 35,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {
        flex: 1,
        backgroundColor: '#F6F6F6'
    },
    answers: {
        flex: 1
    },
    checkBox: {
        flex: 0.5,
        marginTop: '15%',
        marginLeft: '3%',
        width: '96%',
        height: 60,
        justifyContent: 'center',
        borderRadius: 50
    },
    containerStyle: {
        backgroundColor: '#ffffff',
        borderRadius: 50,
        height: 60,
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        fontFamily: 'Baloo2-Bold',
        marginLeft: '7%',
        marginRight: '5%'
    },
    question: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        height: 60,
        width: 350,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    btnText: {
        color: '#f4f4f4',
        fontSize: 22,
        fontFamily: 'Baloo2-Bold'
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    error: {
        flexDirection: 'row',
        alignSelf: 'center',


    },
    errorMessage: {
        color: '#ff0033',
        fontSize: 15,
        fontFamily: 'Baloo2-Regular'
    }
})