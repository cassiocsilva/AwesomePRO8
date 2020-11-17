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

  const [nome, onChangeTextNome] = React.useState('');
  const [cpf, onChangeTextCpf] = React.useState('');
  const [email, onChangeTextEmail] = React.useState('');
  const [senha, onChangeTextSenha] = React.useState('');
  const [user_level] = '1';

  const registrar_usuario = () => {

    //TESTE
    console.log("\n");
    console.log("nome: ", nome);
    console.log("cpf: ", cpf);
    console.log("email: ", email);
    console.log("senha: ", senha);
    console.log("user_level: ", user_level);
    //TESTE

    fetch('http://rocketi.atwebpages.com/registrar_rn.php', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        cpf: cpf,
        email: email,
        password: senha,
        user_level: user_level,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        console.log("responseJson: ", responseJson);
        
        if (responseJson == "Registrado com sucesso"){
          console.log("responseJson: ", responseJson);  //TESTE
          Alert.alert('http://rocketi.atwebpages.com:', responseJson);
          navigation.navigate('Login');
        }
        else {
          Alert.alert('http://rocketi.atwebpages.com:', responseJson);
        }

      })
      .catch((error) => {
        console.log("error: ", error); //terminal linux
        console.error(error); //android
      });
  }

  const voltar = () => {
    navigation.navigate('Login');
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
        <Text style={styles.titulo}>Registrar</Text>
        <Text style={styles.titulo}>novo usuário</Text></View>


      <TextInput style={styles.entrada}
        placeholder="Digite seu NOME COMPLETO"
        onChangeText={text => onChangeTextNome(text)}
        value={nome} />

      <TextInput style={styles.entrada}
        placeholder="Digite seu CPF"
        onChangeText={text => onChangeTextCpf(text)}
        value={cpf} />

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
        onPress={() => registrar_usuario()}>
        <Text style={styles.botaoText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.botao}
        onPress={() => voltar()}>
        <Text style={styles.botaoText}>voltar</Text>
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