import React from 'react';
import shortid from 'shortid';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

export const Pendientes = ({ pendientes, handleDeletePendiente }) => {

    const {title, description, date } = pendientes;

    const handleDeleteElement = (id) =>{
        console.log(`Borrando id ${id}`);
        handleDeletePendiente(id);
    }
    return (
        <View style={styles.pendientesContent}>
            <View>
                <Text style={styles.titleLbl}>Titulo:</Text>
                <Text style={styles.contentLbl}>{title}</Text>
            </View>

            <View>
                <Text style={styles.titleLbl}>Descripcion:</Text>
                <Text style={styles.contentLbl}>{description}</Text>
            </View>

            <View>
                <Text style={styles.titleLbl}>Fecha para terminarlo:</Text>
                <Text style={styles.contentLbl}>{date}</Text>
            </View>

            <View>
                <TouchableHighlight onPress={() => handleDeleteElement(pendientes.id)} style={styles.deleteBtn}>
                    <Text style={styles.deleteLbl}>Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pendientesContent: {
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderBottomColor: '#555',
        borderBottomWidth: 0.5
    },
    deleteBtn: {
        marginTop: 5,
        backgroundColor: '#62000b',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    deleteLbl: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center'
    },
    titleLbl: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    contentLbl: {
        fontSize: 17,
        marginBottom: 10
    }
})
