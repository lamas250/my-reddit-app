import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import RoundedButton from "../components/RoundedButton";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "expo";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const { width } = Dimensions.get("window");

// Mutations
const ADD_POST = gql`
  mutation AddPost($title:String!,$link:String!,$imageUrl:String!) {
    addPost(title: $title, link:$link, imageUrl: $imageUrl)
  }
`;

export default function PostForm({ route, navigation }) {
  const [addPost] = useMutation(ADD_POST);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View>
          <Text>Title</Text>
          <TextInput
            onChangeText={text => setTitle(text)}
            value={title}
            placeholder="Title"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
            autoFocus
          />
        </View>
        <View>
          <Text>Link</Text>
          <TextInput
            onChangeText={text => setLink(text)}
            value={link}
            placeholder="Link"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        <View>
          <Text>Image URL</Text>
          <TextInput
            onChangeText={text => setImageUrl(text)}
            value={imageUrl}
            placeholder="Image URL"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
      </View>

      <RoundedButton
        text="Create Post"
        textColor="#fff"
        backgroundColor="rgba(75, 148, 214, 1)"
        onPress={() => {
          // TextInput validation
          let nullValues = [];
          if (!title) {
            nullValues.push("Title");
          }
          if (!link) {
            nullValues.push("Link");
          }
          if (!imageUrl) {
            nullValues.push("Image URL");
          }
          if (nullValues.length) {
            Alert.alert(`Please fill in ${nullValues.join(", ")}`);
          } else {
            addPost({ variables: { title, link, imageUrl } })
              .then(() => {
                navigation.goBack();
              })
              .catch(err => console.log(err));
          }
        }}
        icon={
          <Ionicons
            name="md-checkmark-circle"
            size={20}
            color={"#fff"}
            style={styles.saveIcon}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  saveIcon: {
    position: "relative",
    left: 20,
    zIndex: 8,
  },
  inputContainer: {
    flex: 0.4,
    justifyContent: "space-around",
  },
  input: {
    width: width - 40,
    height: 40,
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
  },
  image: {
    width: width,
    height: width,
    resizeMode: "cover",
  },
});