import React from 'react'
import { render } from 'react-dom'
import { View, TextInput, Button, StyleSheet, FlatList, Text } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            films: [],
            searchedText: "" 
        }
    }

    _searchTextInputChanged(text) {
        this.setState({ searchedText: text })
    }

    _loadFilms() {
        if (this.state.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.state.searchedText).then(data => {
                this.setState({ films: data.results })
            })
        }
    }
    render() {
        return (
            <View style={ styles.main_container }>
                <TextInput style={ styles.TextInput } placeholder="Titre du film" onChangeText={(text) => this._searchTextInputChanged(text)}/>
                <Button title='Rechercher' onPress={() => this._loadFilms()}/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex:1,
        marginTop: 20
    },
    TextInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
        textAlign: 'center'
    }
})


export default Search