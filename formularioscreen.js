import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function FormularioScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const enviar = async () => {
    try {
      await addDoc(collection(db, 'avisos'), { titulo, descricao });
      alert('Aviso enviado!');
      navigation.navigate('Avisos');
    } catch (e) {
      console.error("Erro ao enviar:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meu Bairro</Text>
      <Text style={styles.subheader}>Enviar Aviso</Text>
      <TextInput placeholder="Título" style={styles.input} value={titulo} onChangeText={setTitulo} />
      <TextInput placeholder="Descrição" style={styles.input} value={descricao} onChangeText={setDescricao} multiline />
      <Button title="Enviar" onPress={enviar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subheader: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 }
});
