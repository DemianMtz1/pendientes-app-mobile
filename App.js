import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Keyboard,
  View,
  Platform,
  FlatList,
} from 'react-native';
import { FormPendientes } from './components/FormPendientes';
import { Pendientes } from './components/Pendientes';

const App: () => React$Node = () => {

  const [pendientes, setPendientes] = useState([]);
  const [showPendiente, setShowPendiente] = useState(false);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  }

  const handleShowPendiente = () => {
    setShowPendiente(!showPendiente);
    console.log(showPendiente)
  }

  const handleDeletePendiente = id =>{
    setPendientes((pendientesActuales) =>{
      return pendientesActuales.filter( pendiente => pendiente.id !== id)
    });
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
        <View style={styles.container}>
          <Text style={styles.titleApp}>{'Guardar \nPendientes'}</Text>

          <View>
            <TouchableHighlight onPress={() => handleShowPendiente()} style={styles.changePendientesBtn}>
              <Text style={styles.changePendientesTitle}>
                {showPendiente ? 'Ver Pendientes': 'Crear nuevo Pendiente'}
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.content}>
            {
              showPendiente ? (
                <>
                  <FormPendientes
                    pendientes={pendientes}
                    setPendientes={setPendientes}
                    setShowPendiente={setShowPendiente}
                  />
                </>
              ) : (
                  <>
                    <Text style={styles.positionTitle}>{
                      (pendientes.length > 0) ? 'Tus pendientes': 'Añade pendientes'
                    } </Text>

                    <FlatList
                      data={pendientes}
                      renderItem={({ item }) => <Pendientes pendientes={item} handleDeletePendiente={handleDeletePendiente} />}
                      keyExtractor={({ id }) => id}
                    />
                  </>
                )

            }
          </View>

        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF9274',
    flex: 1
  },
  titleApp: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  changePendientesBtn: {
    backgroundColor: '#ff746b',
    paddingVertical: 15,
    marginTop: 30
  },
  changePendientesTitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  positionTitle: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    marginHorizontal: '2.5%',
    flex: 0.9
  }
});

export default App;
