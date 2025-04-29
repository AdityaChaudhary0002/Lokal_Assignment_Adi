// bookmark.tsx
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

interface Bookmark {
  id: number;
  company_name: string;
  title: string;
  primary_details: {
    Place?: string;
    Salary?: string;
  };
  whatsapp_no?: string;
}

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem('bookmarks');
      if (storedBookmarks) {
        const parsedBookmarks: Bookmark[] = JSON.parse(storedBookmarks);
        if (Array.isArray(parsedBookmarks)) {
          setBookmarks(parsedBookmarks);
        }
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBookmarks();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchBookmarks();
    }, [])
  );

  const renderItem = ({ item }: { item: Bookmark }) => (
    <View style={styles.card}>
      <Text style={styles.companyName}>{item.company_name}</Text>
      <Text style={styles.jobTitle}>{item.title}</Text>

      <View style={styles.detailRow}>
        <MaterialIcons name="location-on" size={16} color="#666" />
        <Text style={styles.detailText}>{item.primary_details?.Place || 'N/A'}</Text>
      </View>

      <View style={styles.detailRow}>
        <MaterialIcons name="attach-money" size={16} color="#666" />
        <Text style={styles.detailText}>{item.primary_details?.Salary || 'N/A'}</Text>
      </View>

      <View style={styles.detailRow}>
        <MaterialIcons name="phone" size={16} color="#666" />
        <Text style={styles.detailText}>{item.whatsapp_no || 'N/A'}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 8, color: '#666' }}>Loading bookmarks...</Text>
      </View>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <View style={styles.centered}>
        <MaterialIcons name="bookmark-border" size={48} color="#ccc" />
        <Text style={styles.emptyText}>You haven’t saved any jobs yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookmarks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id?.toString()}
      contentContainerStyle={styles.flatListContent}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  jobTitle: {
    fontSize: 16,
    color: '#555',
    marginVertical: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  flatListContent: {
    paddingBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#888',
  },
});