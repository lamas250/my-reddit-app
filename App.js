import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./ApolloClient";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
