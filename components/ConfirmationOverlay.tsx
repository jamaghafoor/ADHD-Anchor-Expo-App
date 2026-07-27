import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Task {
  title: string;
  time?: string;
  isForce?: boolean;
  type: string;
}

interface Props {
  visible: boolean;
  tasks: Task[];
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationOverlay({ visible, tasks, onConfirm, onCancel }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>AI הבין:</Text>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.cancelText}>ביטול</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.list}>
            {tasks.map((task, idx) => (
              <View key={idx} style={styles.card}>
                <Text style={styles.cardTitle}>{task.title}</Text>
                <View style={styles.pills}>
                  {task.time && <View style={[styles.pill, styles.pillTime]}><Text style={styles.pillTextTime}>{task.time}</Text></View>}
                  {task.isForce && <View style={[styles.pill, styles.pillForce]}><Text style={styles.pillTextForce}>FORCE</Text></View>}
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
            <Text style={styles.confirmText}>אשר הכל ✓</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(245, 237, 224, 0.78)',
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3D2010',
  },
  cancelText: {
    fontSize: 14,
    color: '#A08060',
    fontWeight: '500',
  },
  list: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0D0BC',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3D2010',
    textAlign: 'right',
    marginBottom: 6,
  },
  pills: {
    flexDirection: 'row-reverse',
    gap: 4,
  },
  pill: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 99,
  },
  pillTime: {
    backgroundColor: '#E1F5EE',
  },
  pillTextTime: {
    fontSize: 11,
    color: Colors.light.primaryDark,
  },
  pillForce: {
    backgroundColor: '#FFF0E6',
  },
  pillTextForce: {
    fontSize: 11,
    color: '#B35000',
  },
  confirmBtn: {
    backgroundColor: Colors.light.primary,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  confirmText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
