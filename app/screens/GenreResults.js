import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import StarRating from 'react-native-star-rating';

export default class GenreResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tmdb_data: [],
            inMemoryMovies: [],
        }
    }

    UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        movies = navigation.getParam('movies', '');
        this.setState({
            tmdb_data: movies,
            inMemoryMovies: movies
        })
    }

    searchMovies = (text) => {
        const filteredMovies = this.state.inMemoryMovies.filter(
            results => {
                console.log(results)
                let MoviesLowerCase = (results.title).toLowerCase()
                let searchTermLowerCase = text.toLowerCase()
                return MoviesLowerCase.indexOf(searchTermLowerCase) > -1
            }
        )
        this.setState({ tmdb_data: filteredMovies });
    }

    renderItem = (movie) => {
        return (
            <View style={styles.listComponent}>
                <TouchableOpacity style={styles.img} onPress={() => this.props.navigation.navigate('MovieScreen', {
                    data: movie
                })}>
                    {
                        movie.item.poster_path == null ?
                            <Image

                                source={require('../img/noimage.png')}
                                style={styles.imageStyle}
                            />
                            :
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.item.poster_path}` }}

                                style={styles.imageStyle}
                            />
                    }

                </TouchableOpacity>
                <View style={styles.details}>
                    <TouchableOpacity
                        style={{ flex: 0.25, justifyContent: 'center' }}
                        onPress={() => this.props.navigation.navigate('MovieScreen', {
                            data: movie
                        })}
                    >
                        <Text style={styles.movieTitle}>{movie.item.title}</Text>
                        <Text style={styles.info}>
                            {movie.item.release_date}
                            {' | '}
                            {movie.item.original_language}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, borderBottomWidth: 0.2, borderBottomColor: 'grey' }}>
                        <View style={styles.bottom}>
                            <View style={{ flex: 0.25 }}>
                                <Text style={styles.popularity}>
                                    {
                                        <Text style={{ fontFamily: 'Baloo2-Bold', fontSize: 13, color: '#000000' }}>
                                            populatity:
                                        </Text>
                                    }

                                    {' '}
                                    {movie.item.popularity}
                                </Text>
                            </View>
                            <View style={{ flex: 0.75, justifyContent: 'center' }}>
                                <Text style={styles.vote}>
                                    {movie.item.vote_average}
                                    {'/10'}
                                </Text>
                                <StarRating
                                    disabled={true}
                                    halfStarEnabled={true}
                                    containerStyle={{ marginTop: '5%', width: '75%' }}
                                    maxStars={10}
                                    rating={movie.item.vote_average}
                                    fullStarColor={'#edb61f'}
                                    starSize={15}
                                    emptyStarColor={'grey'}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
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
                    <Text style={styles.headerTitle}>
                        Recommend By Genre
                        {' '}
                        {
                            <MaterialCommunityIcons
                                name='movie-search'
                                size={30}
                                color='#000000'
                            />
                        }
                    </Text>

                    <View style={styles.searchBar}>
                        <View style={{ flexDirection: 'row' }}>
                            <EvilIcons name='search' size={25} color='grey' style={{ alignSelf: 'center', marginLeft: '1%' }} />
                            <TextInput
                                placeholder=' Find a movie in the list ...'
                                placeholderTextColor='grey'
                                onChangeText={(text) => this.searchMovies(text)}
                                style={styles.search}
                                autoCapitalize='none'
                            />
                        </View>
                    </View>

                </View>

                <View
                    
                    style={styles.list}
                >

                    <FlatList
                        style={{
                            flex: 1,
                        }}
                        data={this.state.tmdb_data}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}

                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTitle: {
        marginLeft: '5%',
        fontSize: 25,
        fontFamily: 'Baloo2-ExtraBold'
    },
    header: {
        flex: 0.25,
    },
    back: {
        height: 50,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        marginLeft: '3%',
        fontSize: 25,
        fontFamily: 'Baloo2-Bold'
    },
    list: {
        flex: 1
    },
    listComponent: {
        flex: 1,
        flexDirection: 'row'
    },
    img: {
        flex: 1,
        alignItems: 'center'
    },
    imageStyle: {
        resizeMode: 'contain',
        width: '75%',
        height: 250,
        borderRadius: 20
    },
    details: {
        flex: 1,
    },
    movieTitle: {
        fontSize: 17,
        fontFamily: 'Baloo2-Bold'
    },
    info: {
        color: 'grey',
        fontFamily: 'Baloo2-Regular'
    },
    bottom: {
        flex: 1
    },
    popularity: {
        color: 'grey',
        fontSize: 13,
        fontFamily: 'Baloo2-Regular'
    },
    rating: {
        flex: 1
    },
    vote: {
        fontSize: 15,
        fontFamily: 'Baloo2-Bold',
        color: 'grey'
    },
    searchBar: {
        marginTop: '5%',
        marginLeft: '5%',
        height: 40,
        width: 360,
        backgroundColor: '#e6e6ea',
        borderRadius: 10
    },
    search: {
        width: 350,
        height: 40
    }
})