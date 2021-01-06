import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import RecomGenreScreen from './screens/RecomGenreScreen';
import GenreResults from './screens/GenreResults';
import MovieScreen from './screens/MovieScreen';

const PrimaryNav = createStackNavigator({
    HomeScreen: { screen: HomeScreen },
    RecomGenreScreen: { screen: RecomGenreScreen },
    GenreResults: { screen: GenreResults },
    MovieScreen: { screen: MovieScreen }
}, {
    headerMode: 'none',
    initialRouteName: 'HomeScreen',
})

export default createAppContainer(PrimaryNav)