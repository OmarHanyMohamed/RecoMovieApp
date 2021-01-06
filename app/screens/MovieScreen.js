import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ImageBackground, Modal, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

var { height, width } = Dimensions.get('window');

export default class MovieScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isLoading: false,
            similar: []
        }
    }

    UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        data = navigation.getParam('data', '');
    }

    showSimilar = () => {
        this.setState({
            isLoading: true
        })

        fetch('http://192.168.43.169:5000/api', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.item.title
            })
        })
            .then((res) => res.json())
            .then((responeJson) => {
                this.setState({
                    similar: responeJson.results,
                    isLoading: false,
                    show: true
                })
            }, () => console.log(this.state.similar))

            .catch((error) => console.log('error:', error))
    }

    renderItem = (data) => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', width: 230, top: '10%' }}>
                <View style={{ flex: 1, borderRadius: 20 }}>
                    <Image
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500/${data.item.poster_path}`
                        }}
                        style={{ height: '110%', width: '100%', resizeMode: 'contain', borderRadius: 20 }}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'center', top: '8%' }}>
                    <Text style={styles.recomTitle}>
                        {data.item.title}
                    </Text>
                    <Text style={styles.recomInfo}>
                        {data.item.release_date}
                        {' | '}
                        {data.item.original_language}
                        {'\n'}
                    </Text>
                    <Text style={styles.Recomvote}>
                        {data.item.vote_average}
                        {'/10'}
                    </Text>
                    <StarRating
                        disabled={true}
                        halfStarEnabled={true}
                        containerStyle={{ marginTop: '5%', width: '60%' }}
                        maxStars={10}
                        rating={data.item.vote_average}
                        fullStarColor={'#edb61f'}
                        starSize={15}
                        emptyStarColor={'grey'}
                    />
                </View>
            </View>


        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    blurRadius={2}
                    style={styles.background}
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500/${data.item.poster_path}`
                    }}
                >

                    <View style={styles.backbtn}>
                        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                            <MaterialCommunityIcons
                                name='close-thick'
                                color='#000000'
                                size={25}

                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.moviesContainer}>
                        <View style={styles.img}>
                            <Image
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w500/${data.item.poster_path}`

                                }}
                                style={{ resizeMode: 'contain', height: '130%', width: '100%', borderRadius: 20 }}
                            />
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    {data.item.title}
                                </Text>
                                <StarRating
                                    disabled={true}
                                    halfStarEnabled={true}
                                    containerStyle={{ marginTop: '5%', width: '50%' }}
                                    maxStars={10}
                                    rating={data.item.vote_average}
                                    fullStarColor={'#f0c560'}
                                    starSize={15}
                                    emptyStarColor={'grey'}
                                />
                                <Text style={styles.voteText}>
                                    {'\n'}
                                    {
                                        <MaterialCommunityIcons
                                            name='star-circle'
                                            color='#000000'
                                            size={17}
                                        />
                                    }
                                    {' '}
                                    {data.item.vote_average}
                                    {' / '}
                                    {
                                        <Ionicons
                                            name='people'
                                            color='#000000'
                                            size={17}
                                        />
                                    }
                                    {' '}
                                    {data.item.vote_count}
                                    {'\n'}
                                </Text>
                                <ScrollView contentContainerStyle={{ height: height / 4  }}>
                                    <Text style={styles.overViewText}>
                                        {data.item.overview}
                                    </Text>
                                </ScrollView>
                            </View>
                            <View style={styles.btnContainer}>
                                {
                                    this.state.isLoading ?
                                        <View style={styles.spinner}>
                                            <ActivityIndicator size={'large'} color='#f0c560' />
                                        </View>
                                        :

                                        <TouchableOpacity style={styles.btn} onPress={this.showSimilar}>
                                            <Text style={styles.btnText}>
                                                Similar to this
                                                {' '}
                                                {
                                                    <FontAwesome
                                                        name='heart'
                                                        color='#ffffff'
                                                        size={15}
                                                    />
                                                }
                                            </Text>
                                        </TouchableOpacity>
                                }

                            </View>
                        </View>

                    </View>
                    <Modal
                        transparent={true}
                        visible={this.state.show}
                    >
                        <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#ffffff', height: 500, width: '100%', justifyContent: 'center' }}>
                                <View style={{ flex: 0.1, alignItems: 'flex-end' }}>
                                    <TouchableOpacity style={styles.close} onPress={() => this.setState({ show: false })}>
                                        <Ionicons
                                            name='close'
                                            size={30}

                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <Text style={styles.recomHeaderText}>
                                        Beacuse You Liked This :
                                    </Text>
                                </View>

                                <FlatList
                                    style={{
                                        flex: 1,
                                    }}
                                    horizontal={true}
                                    data={this.state.similar}
                                    renderItem={this.renderItem}
                                    keyExtractor={item => item.id.toString()}
                                />
                            </View>
                        </View>

                    </Modal>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backbtn: {
        backgroundColor: '#FFFFFF',
        marginLeft: '3%',
        top: '2%',
        height: 40,
        width: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        width: '100%',
        height: height,
        resizeMode: 'contain',
    },
    moviesContainer: {
        flex: 1,
        alignItems: 'center',
    },
    infoContainer: {
        width: width / 1.2,
        height: height / 1.7,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        alignItems: 'center'
    },
    img: {
        zIndex: 1000,
        width: width / 1.8,
        height: height / 3,
        borderRadius: 20,
    },
    title: {
        flex: 0.7,
        height: height / 3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        top: '20%',
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'Baloo2-Bold',
        color: 'grey',
        marginLeft: '12%',
        marginRight: '12%',
    },
    voteText: {
        fontSize: 13,
        fontFamily: 'Baloo2-Regular',
    },
    overViewText: {
        marginLeft: '7%',
        marginRight: '5%',
        fontFamily: 'Baloo2-Regular',
        color: 'grey',
        height: 200
    },
    btnContainer: {
        flex: 0.1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        top: '18%',
        backgroundColor: '#ffffff',
        borderRadius: 20
    },
    btn: {
        height: 40,
        width: 200,
        backgroundColor: '#f0c560',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    btnText: {
        color: '#f4f4f4',
        fontSize: 15,
        fontFamily: 'Baloo2-Bold'
    },
    recomHeader: {
        flex: 0.1
    },
    recomHeaderText: {
        fontSize: 22,
        fontFamily: 'Baloo2-ExtraBold',
    },
    recomTitle: {
        fontSize: 15,
        fontFamily: 'Baloo2-Bold',
        marginLeft: '5%',
    },
    recomInfo: {
        fontSize: 14,
        color: 'grey',
        fontFamily: 'Baloo2-Regular',
    },
    Recomvote: {
        fontSize: 13,
        color: 'grey',
        fontFamily: 'Baloo2-Bold',
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    close: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 0.3,
        borderColor: 'grey',
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-end',
        bottom: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})