import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import LinearGradient from "react-native-linear-gradient";

export default function App({ navigation }) {

  const [email, onChangeTextEmail] = React.useState('');
  const [senha, onChangeTextSenha] = React.useState('');

  const registrar = () => {
    navigation.navigate('Registrar');
  }

  const acessar = () => {

    //TESTE
    console.log("\n");
    console.log("email: ", email);
    console.log("senha: ", senha);
    //TESTE

    fetch('http://rocketi.atwebpages.com/autenticar_rn.php', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        if (responseJson == "Verification success"){
          console.log("responseJson: ", responseJson);  //TESTE
          navigation.navigate('Home',{
            email: email
          });
        }
        else {
          console.log("responseJson: ", responseJson);  //TESTE
          Alert.alert('http://rocketi.atwebpages.com:', responseJson);
        }

      })
      .catch((error) => {
        console.error(error);
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
        <Text style={styles.titulo}>Solução em</Text>
        <Text style={styles.titulo}>Rastreamento</Text></View>

      <TextInput style={styles.entrada}
        placeholder="Digite seu E-MAIL"
        onChangeText={text => onChangeTextEmail(text)}
        value={email} />

      <TextInput style={styles.entrada}
        secureTextEntry={true}
        placeholder="Digite sua SENHA"
        onChangeText={text => onChangeTextSenha(text)}
        value={senha} />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.botao}
        onPress={() => acessar()}>
        <Text style={styles.botaoText}>Acessar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.botao}
        onPress={() => registrar()}>
        <Text style={styles.botaoText}>novo usuário</Text>
      </TouchableOpacity>


      <View style={styles.barraTxtProjeto}>
        <Text style={styles.txtProjeto}>PRO-8 é uma Solução em Rastreamento desenvolvido pela 
        Faculdade de Tecnologia de Itu, sob a orientação da Profª. Ms. Angelina Vitorino de 
        Souza Melaré. {"\n"}
        O projeto oferece além da plataforma para monitoramento, aplicação para 
        transformar um smartphone em um rastreador, possibilitando monitoramento logístico, 
        de cargas, monitoramento de pessoas como crianças e idosos, e muito mais. {"\n"}
        Registre-se e conheça a plataforma, é gratuito!
        </Text>
      </View>

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

  barraTxtProjeto: {
    backgroundColor: '#E8E8E8',
    marginTop: 20,
    marginBottom: 0,
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

  entrada: {
    backgroundColor: 'aliceblue',
    color: 'gray',
    marginTop: 10,
    justifyContent: "center",
    width: 250,
    padding: 6,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 5
  },
  botao: {
    width: 250,
    height: 38,
    marginTop: 10,
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