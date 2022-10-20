import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Posts from "../screens/Posts";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import PostDetail from "../screens/PostDetail";
import PostForm from "../screens/PostForm";
import EditForm from "../screens/EditForm";

const AppStack = createStackNavigator();

export default function AppNavigator(){
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="Posts"
          component={Posts}
          options={({ navigation, route }) => ({
            headerRight: props => (
              <Ionicons
                onPress={() => navigation.navigate("PostForm")}
                name="md-add"
                size={25}
                color={"#161616"}
                style={{
                  position: "relative",
                  right: 20,
                  zIndex: 8,
                }}
              />
            ),
          })}
        />
        <AppStack.Screen name="Detail" component={PostDetail} />
        <AppStack.Screen
          name="PostForm"
          component={PostForm}
          options={{
            title: "Create Post",
          }}
        />
        <AppStack.Screen
          name="EditForm"
          component={EditForm}
          options={{
            title: "Edit Post",
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}