import * as React from 'react';
import { Button, Text, View, FlatList, StyleSheet, TouchableOpacity, } from 'react-native';
import { AuthContext } from '../constants/index'
import { generate } from "random-words"

export function HomeScreen({ navigation }) {

  const { signOut } = React.useContext(AuthContext);
  const listOfImages = [{ title: 'table', id: 1, },
  { title: 'apple1', id: 2, },
  { title: 'green', id: 3, },
  { title: 'money', id: 4, },
  { title: 'boy', id: 5, },
  { title: 'screen', id: 6, },
  { title: 'girl', id: 7, }]
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'ADD_ITEM':
          return {
            ...prevState,
            listOfImages: [...prevState.listOfImages, action.item]
          };
        case 'REMOOVE_ITEM':
          const id = action.id
          return {
            ...prevState,
            listOfImages: prevState.listOfImages.filter((card) => card.id !== id)

          };
        case 'SAVE_IMG':
          
          
          function updateObjectInArray(array, action) {
            const indexArr=array?.findIndex(card=>card.id== action.item.item.id)
            return array.map((item, index) => {
           
              if (index !== indexArr) {
                // This isn't the item we care about - keep it as-is
                return item
              }
       
              // Otherwise, this is the one we want - return an updated value
              return {
                ...item,
                ...{'path':action.item.path}
              }
            })
          }
         // let foundIndex = state.messages.findIndex(message => message ._id == payload._id);
      //    const messages = prevState.listOfImages?.splice(index-1,1,{id: action.item.item.id,title: action.item.item.title,path:action.item.path}); 
  
          return { 
            ...prevState,
            listOfImages:updateObjectInArray(prevState.listOfImages,action)
         }
      }
    },
    {
      listOfImages: listOfImages,

    }
  );

  const changePhoto = (item, path) => dispatch({ type: 'SAVE_IMG',  item:{item, path} });
  const onPress = (item) => navigation.navigate('CardScreen', { item: item ,imageSource:item.path,changePhoto:(item,path)=>changePhoto(item,path) })
  const additems = (item) => dispatch({ type: 'ADD_ITEM', item: { title: generate(), id: Date.now() } });
  const remooveItem = (item) => { console.log(item); dispatch({ type: 'REMOOVE_ITEM', id: item.id }); }
  const Item = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={() => onPress(item)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Button title="remoove item" onPress={() => remooveItem(item)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="add items" onPress={additems} />
      <FlatList
        data={state.listOfImages}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
      <Button title="Sign out!" onPress={signOut} />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: '#6495ED',
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  button: {

    padding: 10,

  },
});