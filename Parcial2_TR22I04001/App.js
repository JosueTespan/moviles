import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import EventDetailScreen from "./src/screens/EventDetailScreen";
import EventsListScreen from "./src/screens/EventsListScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ResumenScreen from "./src/screens/ResumenScreen";
import { getUserDocId } from "./src/utils/storage";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function EventsStack() {
  const InnerStack = createNativeStackNavigator();
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="EventsList"
        component={EventsListScreen}
        options={{ title: "Eventos" }}
      />
      <InnerStack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{ title: "Detalle" }}
      />
    </InnerStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Eventos"
        component={EventsStack}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Resumen"
        component={ResumenScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "list" : "list-outline"} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [bootRoute, setBootRoute] = useState("Register");

  useEffect(() => {
    (async () => {
      const uid = await getUserDocId();
      if (uid) setBootRoute("Main");
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {bootRoute === "Register" ? (
          <Stack.Screen name="Register" component={RegisterScreen} />
        ) : null}
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
