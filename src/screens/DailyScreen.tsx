import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from 'react-native';
import Header from '../components/Header';
import { getAllDailies, deleteDaily, createDaily, updateDaily } from '../services/dailyService';

interface Daily {
  _id?: string;
  title: string;
  description: string;
  date: string;
}

const DailyListScreen = () => {
  const [dailies, setDailies] = useState<Daily[]>([]);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [currentDaily, setCurrentDaily] = useState<Daily | null>(null);

    const loadDailies = async () => {
        try {
        setLoading(true);
        const data = await getAllDailies();
        setDailies(data);
        } catch (error: any) {
        Alert.alert('Erro', error.message || 'Erro ao carregar dailies');
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        loadDailies();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const result = await deleteDaily(id);
            loadDailies();
        } catch (error: any) {
            console.error('Erro ao excluir daily:', error);
        }
    };

    const handleSubmit = async () => {
        if (!currentDaily?.title || !currentDaily?.description || !currentDaily?.date) {
        Alert.alert('Preencha todos os campos');
        return;
        }

        try {
        if (currentDaily._id) {
            await updateDaily(currentDaily._id, currentDaily);
        } else {
            await createDaily(currentDaily);
        }
        setFormVisible(false);
        setCurrentDaily(null);
        loadDailies();
        } catch (error: any) {
        Alert.alert('Erro', error.message || 'Erro ao salvar daily');
        }
    };

    const openForm = (daily?: Daily) => {
        const currentDate = new Date().toISOString().split('T')[0];

        if (daily) {
        setCurrentDaily(daily);
        } else {
        setCurrentDaily({ title: '', description: '', date: currentDate });
        }
        setFormVisible(true);
    };

    return (
        <View style={styles.container}>
        <Header title="Início" />
        {formVisible && currentDaily ? (
            <View style={styles.form}>
            <Text style={styles.formTitle}>
                {currentDaily._id ? 'Editar Daily' : 'Criar Nova Daily'}
            </Text>
            <TextInput
                placeholder="Título"
                style={styles.input}
                value={currentDaily.title}
                onChangeText={(text) => setCurrentDaily({ ...currentDaily, title: text })}
            />
            <TextInput
                placeholder="Descrição"
                style={styles.input}
                value={currentDaily.description}
                onChangeText={(text) => setCurrentDaily({ ...currentDaily, description: text })}
            />
            <TextInput
                placeholder="Data"
                style={styles.input}
                value={currentDaily.date}
                onChangeText={(text) => setCurrentDaily({ ...currentDaily, date: text })}
            />
            <View style={styles.buttons}>
                <Button title="Salvar" onPress={handleSubmit} />
                <Button title="Cancelar" color="gray" onPress={() => setFormVisible(false)} />
            </View>
            </View>
        ) : (
            <Button title="Criar Nova Daily" onPress={() => openForm()} />
        )}

        {loading ? (
            <View style={styles.center}>
            <ActivityIndicator size="large" />
            </View>
        ) : (
            <FlatList
            data={dailies}
            keyExtractor={(item) => item._id!}
            renderItem={({ item }) => (
                <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <View style={styles.buttons}>
                    <Button title="Editar" onPress={() => openForm(item)} />
                    <Button title="Excluir" color="red" onPress={() => handleDelete(item._id!)} />
                </View>
                </View>
            )}
            />
        )}
        </View>
    );
};

export default DailyListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 16, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 },
  title: { fontWeight: 'bold', fontSize: 18 },
  date: { fontSize: 12, color: 'gray', marginTop: 5 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  form: {
    backgroundColor: '#e6e6e6',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  formTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 8,
    borderRadius: 4,
  },
});