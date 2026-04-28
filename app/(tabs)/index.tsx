import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { deletarDoador, Doador, listarDoadores } from '@/service/doador.service';
import { Button } from '@react-navigation/elements';
import { useCallback, useEffect, useState } from 'react';

export default function HomeScreen() {
  
  const [listaDoadores, setDoadores] = useState<Doador[]>([]);

  async function deletar(id) {
      await Promise.all([deletarDoador(id)]);
      carregar();
  }

  const carregar = useCallback(async () => {
    try {
      const [doadores] = await Promise.all([listarDoadores()]);
      setDoadores(doadores ?? [])
    } catch (e: any) {
      // setError(e?.message ?? 'Erro ao carregar dados');
    } finally {
  
    }
  }, []);
  

  useEffect(() => {
      carregar();
    }, [carregar]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Doadores</ThemedText>
      </ThemedView>
      
        {listaDoadores.map((item) => (
          <ThemedView key={item.id} style={styles.stepContainer}>
            <ThemedText type="defaultSemiBold">{item.id}</ThemedText>
            <ThemedText type="default">{item.nome}</ThemedText>
            <Button 
              title="Ação"               
              onPress={() => deletar(item.id)} 
            />
          </ThemedView>
        ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
