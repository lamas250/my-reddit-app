import React from 'react';
import { Dimensions, Image, Linking, StyleSheet, View, Text } from 'react-native';
import RoundedButton from '../components/RoundedButton';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const {width, height} = Dimensions.get('window');

// Mutations
const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export default function PostDetail({route, navigation}){
  const {post} = route.params;
  const { title, link, imageUrl } = post;
  const [deletePost] = useMutation(DELETE_POST); 

  return (
    <View style={styles.container}>
      {!!imageUrl && (
        <Image style={styles.image} source={{uri: imageUrl}} />
      )}
      <Text style={styles.text}>{title}</Text>
      <RoundedButton
        text={link}
        textColor='#fff'
        backgroundColor='rgb(75, 148, 214)'
        onPress={() => {
          Linking.openURL(link)
            .catch((err) => console.log(err))
        }}
        icon={<Ionicons name='md-link' color='#fff' style={styles.saveIcon} />}
       />
      <RoundedButton
        text="Edit"
        textColor="#fff"
        backgroundColor="#a9a9a9"
        onPress={() => {
          navigation.navigate('EditForm', {post});
        }}
        icon={<Ionicons name="md-options" size={20} color={"#fff"} style={styles.saveIcon} />}
      />
      <RoundedButton
        text="Delete"
        textColor="#fff"
        backgroundColor="#FA8072"
        onPress={() => {
          deletePost({ variables: {id: post.id}})
          .then(() => navigation.goBack())
          .catch(err => console.log(err));
        }}
        icon={<Ionicons name="md-trash" size={20} color={"#fff"} style={styles.saveIcon} />}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 32,
    color: '#161616',
    padding: 15
  },
  image: {
    width: width,
    height: width,
    resizeMode: 'cover'
  },
  saveIcon: {
    position: 'relative',
    left: 20,
    zIndex: 8
  }
})