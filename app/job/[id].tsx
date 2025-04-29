import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';

type JobParams = {
  id: string;
  company_name: string;
  title: string;
  place: string;
  salary: string;
  jobType: string;
  experience: string;
  qualification: string;
  whatsapp_no: string;
};

export default function JobDetailsScreen() {
  const {
    id,
    company_name,
    title,
    place,
    salary,
    jobType,
    experience,
    qualification,
    whatsapp_no,
  } = useLocalSearchParams() as JobParams;

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Job Description',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const openWhatsApp = () => {
    const phone = whatsapp_no?.replace(/\s+/g, '');
    Linking.openURL(`https://wa.me/${phone}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.companyName}>{company_name}</Text>
        <Text style={styles.jobTitle}>{title}</Text>

        <InfoRow icon="location-on" label="Location" value={place} />
        <InfoRow icon="attach-money" label="Salary" value={salary} />
        <InfoRow icon="work" label="Job Type" value={jobType} />
        <InfoRow icon="calendar-today" label="Experience" value={experience} />
        <InfoRow icon="school" label="Qualification" value={qualification} />

        <TouchableOpacity onPress={openWhatsApp} style={styles.whatsappRow}>
          <MaterialIcons name="phone" size={22} color="#0a7e4a" />
          <Text style={styles.detailLabel}> WhatsApp: </Text>
          <Text style={[styles.detailValue, { color: '#0a7e4a', textDecorationLine: 'underline' }]}>
            {whatsapp_no || 'N/A'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function InfoRow({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <MaterialIcons name={icon} size={20} color="#666" />
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value || 'N/A'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth:1,
    borderColor:'#000000'
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#444',
    marginLeft: 8,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  whatsappRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
});
