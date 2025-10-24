import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ModalExample({isVisible, onClose, titulo, onPrtitulo, setTitulo}) {
   
    return (
        <View>
            <Modal visible={isVisible} transparent={true} animationType="slide">
                <View style={{
                    flex: 1, justifyContent: "center", alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}>
                    <View style={{ width: 200, height: 200, backgroundColor: "white", padding: 20, borderRadius: 10 }}>
                        <Text>Realizar cambios</Text>
                        <TextInput
                            placeholder='escribir'
                            style={{borderWidth: 1, borderRadius: 5, marginTop: 10}}
                            value={titulo}
                            onChangeText={(val) => setTitulo(val)}
                        />
                        <TouchableOpacity
                        onPress={() => onClose()}
                            style={{marginTop: 20, borderWidth:1, backgroundColor: 'blue',
                            width: 75, height: 30, alignSelf: 'center', borderRadius: 5, justifyContent: 'center',}}
                        >
                            <Text style={{color: 'white', textAlign: 'center',}}>Cerrar </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}