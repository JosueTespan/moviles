import axios from 'axios';
import { useState } from "react";
import {
    ActivityIndicator,
    Platform, // nueva: para decidir con base en el sistema operativo en uso
    StyleSheet,
    Text, TextInput,
    ToastAndroid, // nuevo: módulo para mostrar un menjase temporal
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen({ navigation }) {

    const [nombre, setNombre] = useState(null);
    const [correo, setCorreo] = useState(null);
    const [contrasenia, setContrasenia] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const showToast = (msg = '¡Registro exitoso!') => { // Tostada; solo funciona en android
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

    const signup = async () => {

         if(isLoading){ // evitar que al presionar el botón se lance la petición si ya hay una en curso
            alert("Espere, ya hsay una petición en proceso..")
            return
        }

        if (!nombre || !correo || !contrasenia) {
            alert("Debe llenar todos los campos")
            //ponemos un valor de retorno para detener el flujo de la función
            return
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                'https://dsm-moviles.onrender.com/users/signup',
                {
                    name: nombre,
                    email: correo,
                    password: contrasenia
                }
            );
            console.log('Usuario creado:', response.data);
            setIsLoading(false)
            Platform.OS != 'ios' && showToast(); //llamamos a la función solo si estamos en android
            navigation.replace("Login")
        } catch (error) {
            console.error(error.response?.data || error.message);
            setIsLoading(false)
        }
    }

    return (
        <SafeAreaView>
            {isLoading == true && <ActivityIndicator />}
            <View style={styles.viewTitles}>
                <Text style={{ fontSize: 20, color: 'green',  marginBottom: 15,}}>bMusic</Text>
                <Text style={{ fontSize: 25, color: 'black' }}>¡Registrate ahora!</Text>
            </View>
            <View style={styles.viewInputs}>
                <TextInput
                    placeholder="nombre..."
                    style={styles.input}
                    onChangeText={setNombre}
                />
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
                    onPress={signup}
                >
                    <Text>Sign Up</Text>
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
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        marginTop: 30,
        width: '70%',
        height: 45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

})