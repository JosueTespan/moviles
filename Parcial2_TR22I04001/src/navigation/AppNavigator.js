import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import local screens
// import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import DrawerNavigation from './DrawerNavigation';

const Stack = createNativeStackNavigator();

export default function App() {//Agregué un Stack general, que contiene al Drawer y un simple Main
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name='MainApp' component={HomeScreen} /> */}
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Principal' component={DrawerNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

