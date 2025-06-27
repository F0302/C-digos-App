import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function AvisosScreen({ navigation }) {
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    const fetchAvisos = async () => {
      const querySnapshot = await getDocs(collection(db, 'avisos'));
      const dados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAvisos(dados);
    };
    fetchAvisos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meu Bairro</Text>
      <Text style={styles.subheader}>Quadro de Avisos</Text>
      <FlatList
        data={avisos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.aviso}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
          </View>
        )}
      />
      <Button title="Enviar Aviso" onPress={() => navigation.navigate('Formulario')} />
      <TouchableOpacity onPress={() => navigation.navigate('Eventos')}>
        <Text style={styles.link}>Ver Eventos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subheader: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  aviso: { padding: 10, backgroundColor: '#f9f9f9', borderBottomWidth: 1, borderBottomColor: '#eee' },
  titulo: { fontWeight: 'bold' },
  link: { color: '#1E90FF', textAlign: 'center', marginTop: 10 }
});
