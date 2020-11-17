import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from "react-native-linear-gradient";

export default function Home({ route, navigation }) {

  const { email } = route.params;

  const habilitarRastreador = () => {
    navigation.navigate('HabilitarRastreador', {
      email: email
    });
  }

  const sair = () => {
    navigation.navigate('Login', {
      //email: email
    });
  }

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
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['white', 'darkblue']}
        style={styles.barraDegrade}></LinearGradient>

      <View style={styles.barraTitulo}>
        <Text style={styles.titulo}>Bem Vindo</Text>
        <Text style={styles.tituloEmail}>{email}</Text>
      </View>

      <View style={styles.barraTxtProjeto}>
        <Text style={styles.txtProjeto}>Seja Bem Vindo ao aplicativo do projeto{"\n"} 
        PRO 8 - Solução em Rastreamento. {"\n"}
        Utilize o botão "Habilitar Rastreador" e conceda a permissão para que seu smartphone envie 
        dados de rastreamento para o sistema. 
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.botao}
        onPress={() => habilitarRastreador()}>
        <Text style={styles.botaoText}>habilitar Rastreador</Text>
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
    height: 18
  },
  barraLogo: {
    backgroundColor: 'forestgreen',
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: "center"
  },
  tinyLogo: {
    width: 178,
    height: 43,
  },
  barraDegrade: {
    height: 6,
    width: '100%'
  },
  barraTitulo: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: "center"
  },
  titulo: {
    color: 'white',
    fontSize: 32
  },
  tituloEmail: {
    color: 'white',
    fontSize: 24
  },

  barraTxtProjeto: {
    backgroundColor: '#E8E8E8',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: "center"
  },
  txtProjeto: {
    color: '#1C1C1C',
    fontSize: 17,
    margin: 5,
    textAlign: "center"
  },

  botao: {
    width: 250,
    height: 38,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 5
  },
  botaoText: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'aliceblue'
  }
});