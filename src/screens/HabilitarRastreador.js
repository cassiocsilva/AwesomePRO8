import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';

export default function HabilitarRastreador({route, navigation}) {

  const {email} = route.params;

  const rastreadorHabilitado = () => {
    navigation.navigate('RastreadorHabilitado', {
      email: email,
    });
  };

  const voltar = () => {
    navigation.navigate('Home', {
      email: email,
    });
  };

  const sair = () => {
    navigation.navigate('Login', {
    });
  };

  var watchID;
  var geoLoc;

  function showLocation(position) {
    console.log('\n');

    const timestampToDate = new Date(position.timestamp);
    console.log('position.timestamp: ' + position.timestamp);
    console.log('timestampToDate: ' + timestampToDate);

    const jsDate = new Date();
    console.log('jsDate: ' + jsDate);
    
    const positionJSON = JSON.stringify(position);
    const jsonCompleto = JSON.stringify({
      login: email,
      position: position,
      timestampToDate: timestampToDate,
      jsDate: jsDate,      
    });

    console.log('\n');
    console.log('jsonCompleto: ' + jsonCompleto);

    fetch('http://rocketi.atwebpages.com/rastrear_rn.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },

      body: JSON.stringify({
        login: email,
        position: position,
        timestampToDate: timestampToDate,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson: ', responseJson);
        Alert.alert('http://rocketi.atwebpages.com: ', 'Posição Registrada!!');
        rastreadorHabilitado();

      })
      .catch((error) => {
        console.error(error);
      });
  }

  function errorHandler(err) {
    if (err.code == 1) {
      alert('Error: Access is denied!');
    } else if (err.code == 2) {
      alert('Error: Position is unavailable!');
    }
  }

  const requestLocationRuntimePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'AwesomePRO8 Location Permission',
          message: 'O app AwesomePRO8 App precisa acessar a sua localização',
          buttonNeutral: 'Mais tarde',
          buttonNegative: 'Negar',
          buttonPositive: 'Permitir',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        var options = {   //desmarcar options abaixo quando usando getCurrentPosition
          //timeout: 5000, 
          //maximumAge: 1000, 
          //enableHighAccuracy: true, 
          //distanceFilter: 3, // watchPosition
          //useSignificantChanges: false, // watchPosition
        };

        geoLoc = navigator.geolocation;
        watchID = Geolocation.getCurrentPosition( //utilizar getCurrentPosition() ou watchPosition()
          showLocation,
          errorHandler,
          options,
        );
      } else {
        console.log('Location Permission Denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  return (
    <View style={styles.conteiner}>
      <View style={styles.barraTopo}></View>
      <View style={styles.barraLogo}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/logo_pro8.png')}
        />
      </View>
      <View style={styles.barraTopo}></View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['white', 'darkblue']}
        style={styles.barraDegrade}></LinearGradient>

      <View style={styles.barraTitulo}>
        <Text style={styles.titulo}>Habilitar Rastreador</Text>
        <Text style={styles.tituloEmail}>{email}</Text>
      </View>

      <View style={styles.barraVisaoGeral}>
        <Image
          style={styles.tinyVisaoGeral}
          source={require('../assets/Visão_Geral_do_Sistema_3.0-removebg-preview.png')}
        />
      </View>

      <View style={styles.barraTxtProjeto}>
        <Text style={styles.txtProjeto}>
          Você poderá acessar e verificar os dados armazenados acessando a
          página do projeto:{"\n"} 
          <Text
            style={{color: 'blue'}}
            onPress={() => Linking.openURL('http://rocketi.atwebpages.com/')}> 
             www.rocketi.atwebpages.com
          </Text>
          .
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.botao}
        onPress={() => requestLocationRuntimePermission()}>
        <Text style={styles.botaoText}>iniciar Rastreamento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.botao}
        onPress={() => voltar()}>
        <Text style={styles.botaoText}>voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.botao}
        onPress={() => sair()}>
        <Text style={styles.botaoText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  barraTopo: {
    height: 18,
  },
  barraLogo: {
    backgroundColor: 'forestgreen',
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 178,
    height: 43,
  },
  barraDegrade: {
    height: 6,
    width: '100%',
  },
  barraTitulo: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: 'white',
    fontSize: 32,
  },
  tituloEmail: {
    color: 'white',
    fontSize: 24,
  },

  barraVisaoGeral: {
    backgroundColor: '#E8E8E8',
    marginTop: 10,
    //marginBottom: 10,
    width: '100%',
    height: 233,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyVisaoGeral: {
    //100% = 398 x 423 pixels
    width: 219,
    height: 233,
  },

  barraTxtProjeto: {
    backgroundColor: '#E8E8E8',
    //marginTop: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtProjeto: {
    color: '#1C1C1C',
    fontSize: 17,
    margin: 5,
    textAlign: 'center',
  },

  botao: {
    width: 250,
    height: 38,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  botaoText: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'aliceblue',
  },
});
