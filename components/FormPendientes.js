import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    TextInput,
    Button,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

export const FormPendientes = ({ setPendientes, pendientes, setShowPendiente }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [pendiente, setPendiente] = useState({
        title: '',
        description: '',
    });
    const [newDate, setNewDate] = useState('');

    // Fecha
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // Titulo
    const handleChangeInputs = (text, name) => {
        setPendiente({
            ...pendiente, [name]: text
        })
    }
    const handleConfirmDate = (date) => {
        const options = { year: 'numeric', month: 'long', days: '2-digit' };
        const dateString = date.toLocaleDateString('es-ES', options);
        setNewDate(dateString);
        hideDatePicker();
    };
    const showAlert = () => {
        Alert.alert(
            'Error',
            'Rellenar todos los campos para poder generar el pendiente',
            [{
                text: 'Ok'
            }]
        )
    }
    const createNePendiente = () => {
        const { title, description } = pendiente;

        const newPendiente = {
            id: shortid.generate(),
            title: title,
            description: description,
            date: newDate
        }

        if (title === '' || description === '' || newDate === '') {
            showAlert();
            return;
        }

        setPendientes([...pendientes, newPendiente]);
        setShowPendiente(false);
        console.log(newPendiente);
    }

    return (
        <ScrollView style={styles.pendientesForm}>
            <Text style={styles.titleContent}>Añadir pendiente:</Text>
            <View>
                <Text style={styles.labelForm}>Titulo del pendiente:</Text>
                <TextInput
                    value={pendiente.title}
                    style={styles.inputForm}
                    onChangeText={(text) => handleChangeInputs(text, 'title')}
                />
            </View>
            <View>
                <Text style={styles.labelForm}>Fecha proxima a terminar:</Text>
                <Button title="Escoger fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    locale='es_ES'
                    mode="date"
                    onCancel={hideDatePicker}
                    onConfirm={handleConfirmDate}
                    onChangeText={(text) => setNewDate(text)}
                    value={pendiente.date}
                    headerTextIOS="Elige una fecha"
                />
                <Text>{newDate}</Text>
            </View>
            <View>
                <Text style={styles.labelForm}>Descripcion del pendiente:</Text>
                <TextInput
                    value={pendiente.description}
                    style={styles.inputForm}
                    onChangeText={(text) => handleChangeInputs(text, 'description')}
                />
            </View>

            <View>
                <TouchableHighlight onPress={() => createNePendiente()} style={styles.submitFormBtn}>
                    <Text style={styles.submitFormLbl}>Guardar</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pendientesForm: {
        backgroundColor: '#FFF',
        marginTop: 30,
        paddingHorizontal: 15,
        paddingTop: 10
    },
    inputForm: {
        borderColor: '#555',
        borderWidth: 0.5
    },
    labelForm: {
        marginTop: 15,
        fontSize: 15,
        marginBottom: 8
    },
    titleContent: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8
    },
    submitFormBtn: {
        marginTop: 30,
        backgroundColor: '#ff746b',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    submitFormLbl: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center'
    }
})
