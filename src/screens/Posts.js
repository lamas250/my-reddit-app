import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import Post from '../components/Post';
import { useQuery, gql } from "@apollo/client";

// posts query
const POSTS_QUERY = gql`
  query {
    posts {
      id
      title
      link
      imageUrl
    }
  }
`;

// posts subscription
const POSTS_SUBSCRIPTION = gql`
  subscription {
    postAdded {
      id
      title
      link
      imageUrl
    }
  }
`;


export default function Posts({navigation}){
  const {subscribeToMore, loading, error, data} = useQuery(POSTS_QUERY,{
    variables: {}
  });

  useEffect(() => {
    subscribeToMore({
      document: POSTS_SUBSCRIPTION,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.postAdded;

        return Object.assign({}, prev, {
            posts: [newFeedItem, ...prev.post.posts],
        });
      }
    });
  },[])

  if(loading || error){
    console.log(error);
    return <ActivityIndicator style={{...StyleSheet.absoluteFillObject}} />
  }

  return (
    <View style={styles.container}>
      {data && (
        <FlatList
          data={data.posts}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => (
            <Post
              post={item}
              onPress={() => navigation.navigate("Detail", { post: item })}
            />
          )}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around'
  }
})