import axios from 'axios';
import { useState } from "react";
import {
    ActivityIndicator,
    Platform, // nuevo: módulo para decidir con base en el sistema operativo en uso
    StyleSheet,
    Text, TextInput,
    ToastAndroid, // nuevo: módulo para mostrar un menjase temporal
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen({ navigation }) {

    const [correo, setCorreo] = useState(null);
    const [contrasenia, setContrasenia] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const showToast = (msg = '¡Acceso correcto!') => { // Tostada; solo funciona en android
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const login = async () => {

        if(isLoading){ // evitar que al presionar el botón se lance la petición si ya hay una en curso
            alert("Espere, ya petición en proceso..")
            return
        }

        if (!correo || !contrasenia) {
            alert("Debe llenar todos los campos")
            return
        }
        setIsLoading(true);
        try {
            const response = await axios.post(
                'https://dsm-moviles.onrender.com/users/login',
                {
                    email: correo,
                    password: contrasenia
                }
            );
            //    console.log('Token JWT:', response.data.token);
            console.log('respuesta:', response.data);
            setIsLoading(false)
            Platform.OS != 'ios' && showToast(); //llamamos a la función solo si estamos en android
            navigation.replace("Principal")
        } catch (error) {
            console.error(error.response?.data || error.message);
            setIsLoading(false)
        }
    }

    return (
        <SafeAreaView>
            {isLoading == true && <ActivityIndicator />}
            <View style={styles.viewTitles}>
                <Text style={{ fontSize: 20, color: 'green', marginBottom: 15, }}>bMusic</Text>
                <Text style={{ fontSize: 25, color: 'black' }}>Iniciar Sesión</Text>
            </View>
            <View style={styles.viewInputs}>
                <TextInput
                    placeholder="correo..."
                    style={styles.input}
                    onChangeText={setCorreo}
                />
                <TextInput
                    placeholder="contraseña..."
                    style={styles.input}
                    onChangeText={setContrasenia}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={login}
                >
                    <Text>Sign In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    viewTitles: {
        marginTop: 20,
        alignSelf: 'center',
        alignItems: 'center'
    },
    viewInputs: {
        alignItems: 'center',
         width: '100%',
    },
    input: {
        width: '90%',
        maxWidth: 400,   // no crecerá más allá de 400px
        minWidth: 200,   // no será más pequeño que 200px
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: 'gray',
        marginTop: 20,
    },
    btn: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#1616e4',
        backgroundColor: 'lightblue',
        marginTop: 30,
        width: '70%',
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

})