import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { LibraryProvider } from './src/contexts/LibraryContext';
import AboutScreen from './src/screens/AboutScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import BooksListScreen from './src/screens/BookListScreen';
import FavoritesScreen from './src/screens/FavoriteScreen';
import HomeScreen from './src/screens/HomeScreen';
import PendingsScreen from './src/screens/PendigScreen';
import ReadingScreen from './src/screens/ReadingScreen';
import SettingsScreen from './src/screens/SettingScreen';

const RootStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();
const BooksStack = createNativeStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

function BooksStackNavigator({ route, navigation }) {
  const { collectionId, title } = route.params;
  return (
    <BooksStack.Navigator>
      <BooksStack.Screen
        name="BooksList"
        component={BooksListScreen}
        initialParams={{ collectionId }}
        options={{
          title: `${title} · Libros`,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
              <Ionicons name="arrow-back" size={24} color="black" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <BooksStack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Detalle del libro' }} />
      <BooksStack.Screen name="Reading" component={ReadingScreen} options={{ title: 'Lectura' }} />
    </BooksStack.Navigator>
  );
}

function FavoritesStackNavigator({ navigation }) {
  return (
    <BooksStack.Navigator>
      <BooksStack.Screen
        name="FavoritesList"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
              <Ionicons name="arrow-back" size={24} color="black" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </BooksStack.Navigator>
  );
}

function PendingsStackNavigator({ navigation }) {
  return (
    <BooksStack.Navigator>
      <BooksStack.Screen
        name="PendingsList"
        component={PendingsScreen}
        options={{
          title: 'Pendientes',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
              <Ionicons name="arrow-back" size={24} color="black" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </BooksStack.Navigator>
  );
}

function CollectionTabs({ route }) {
  const { collectionId, title } = route.params;

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Libros')
            return <Ionicons name={focused ? 'book' : 'book-outline'} size={size} color={color} />;
          if (route.name === 'Favoritos')
            return <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />;
          if (route.name === 'Pendientes')
            return <Ionicons name={focused ? 'time' : 'time-outline'} size={size} color={color} />;
          return null;
        },
      })}
    >
      <Tabs.Screen name="Libros" component={BooksStackNavigator} initialParams={{ collectionId, title }} />
      <Tabs.Screen name="Favoritos" component={FavoritesStackNavigator} />
      <Tabs.Screen name="Pendientes" component={PendingsStackNavigator} />
    </Tabs.Navigator>
  );
}

function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      <RootStack.Screen name="CollectionTabs" component={CollectionTabs} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}

const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#fff' } };

export default function App() {
  return (
    <LibraryProvider>
      <NavigationContainer theme={theme}>
        <StatusBar barStyle="dark-content" />
        <RootNavigator />
      </NavigationContainer>
    </LibraryProvider>
  );
}
