import { StyleSheet, TouchableOpacity } from 'react-native';

const MyBtn = ({ children, valores }) => {
    return (
        <TouchableOpacity onPress={valores} style={Styles.btn} >
            {
                children
            }
        </TouchableOpacity>
    )
}
const Styles = StyleSheet.create({
    btn: {
        backgroundColor: 'red',
        borderWidth: 1,
        width: '80%'
    }
})
export default MyBtn;