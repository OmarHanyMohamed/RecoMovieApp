# RecoMovie
 A movie recommendation app using react native, the app recommends movies to the user via a Content-Based Recommendation system that recommends movies similar to the movie the user loves.

## Getting Started

To get started, you'll need to register a free account on [TMDb](https://www.themoviedb.org/) to obtain a developer key.
The details of the movies(title, rating, poster, etc) are fetched using that API.

For more information you can visit [API Docs](https://developers.themoviedb.org/3/getting-started/introduction)

### Prerequisites

**for the recommendation system you'll need some libraries such as :** 

As it's not the best practice to to have my virtualenv directory inside my git repository, so I used pip freeze to get the packages needed into a ```requirements.txt``` file which is above.

All what you have to do to get those requirments is to run this command:

``` 
pip install -r requirements.txt
```
you can find the recommendation system I created here with a detailed explaination [here](https://github.com/OmarHanyMohamed/Content-Based-Recommendation-System) .  

**for the app you'll need :** 

```
npm install react-navigation react-navigation-stack react-native-gesture-handler
npm install --save @react-native-community/masked-view
npm install react-native-safe-area-context
npm i react-native-elements --save
npm i --save react-native-vector-icons
npm install react-native-star-rating --save
```

### How to use

The app is very simple it contains 4 screens 

**HomeScreen** 

which simply gives a brief info about what the app is for. 

<img src='Screenshots/homepage.jpg' width="265" >

___

**RecomGenreScreen**

Where you can choose the genre you want to watch.

![](https://media.giphy.com/media/Y8uLRnzHjfHAEYyjXS/giphy.gif)

___

**GenreResults**

The results obtained from our genre recommendation function

![](https://media.giphy.com/media/HiCgRUEvmbjTtb4kuI/giphy.gif)

___

**MovieScreen**

Contains the movie info as well as `similar to this` button which provides the user with movies similar to this movie/

![](https://media.giphy.com/media/AKaBURiT9Nk4aPy72B/giphy.gif)


## Built with

* Python 3.7.2
* Flask 1.1.2
* react-native 0.63.4

## Source for the dataset

[The Movies Dataset](https://www.kaggle.com/rounakbanik/the-movies-dataset?select=keywords.csv)

## Notes

* I used only a portion of the dataset due to lack of computing power. 
* This app was created to combine both my React Native knowledge and Machine Learning. 
