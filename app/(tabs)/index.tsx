import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { RecordingBottomSheet } from '@/components/RecordingBottomSheet';
import { ConfirmationOverlay } from '@/components/ConfirmationOverlay';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useClaude } from '@/hooks/useClaude';

export default function RemindersScreen() {
  const [inputText, setInputText] = useState('');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [aiTasks, setAiTasks] = useState([]);
  
  const { isRecording, transcript, startRecording, stopRecording, cancelRecording } = useSpeechRecognition();
  const { processText, isProcessing, error } = useClaude();

  const handleStartRecording = async () => {
    setBottomSheetVisible(true);
    await startRecording();
  };

  const handleStopRecording = async () => {
    const finalTranscript = await stopRecording();
    setBottomSheetVisible(false);
    
    if (finalTranscript) {
      await processWithAI(finalTranscript);
    }
  };

  const handleCancelRecording = async () => {
    await cancelRecording();
    setBottomSheetVisible(false);
  };

  const handleSendText = async () => {
    if (inputText.trim().length > 0) {
      const textToProcess = inputText;
      setInputText('');
      await processWithAI(textToProcess);
    }
  };

  const processWithAI = async (text: string) => {
    const result = await processText(text);
    if (result && result.tasks) {
      setAiTasks(result.tasks);
      setConfirmationVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          {/* Decorative Circles */}
          <View style={[styles.decoCircle, { left: -20, top: -20, width: 80, height: 80, opacity: 0.12 }]} />
          <View style={[styles.decoCircle, { left: 30, top: -30, width: 60, height: 60, opacity: 0.08 }]} />
          <View style={[styles.decoCircle, { left: -5, top: 10, width: 24, height: 24, opacity: 0.15 }]} />
          <Text style={styles.title}>Reminders</Text>
        </View>

        {isProcessing && (
          <View style={styles.processingPill}>
            <ActivityIndicator size="small" color={Colors.light.primary} />
            <Text style={styles.processingText}>AI מעבד...</Text>
          </View>
        )}

        {error && (
          <View style={{padding: 10, backgroundColor: Colors.light.urgent, margin: 10, borderRadius: 8}}>
            <Text style={{color: 'white'}}>{error}</Text>
          </View>
        )}

        {/* Week Row */}
        <View style={styles.weekRow}>
          <TouchableOpacity style={styles.calBtnWrap}>
            <Text style={{ fontSize: 18 }}>📅</Text>
            <Text style={styles.calBtnText}>לוח שנה</Text>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekStrip}>
            {/* Dummy Days */}
            {[...Array(7)].map((_, i) => (
              <View key={i} style={[styles.dayPill, i === 2 && styles.dayPillActive]}>
                <Text style={[styles.dayName, i === 2 && styles.dayNameActive]}>יום א'</Text>
                <Text style={[styles.dayNum, i === 2 && styles.dayNumActive]}>{10 + i}</Text>
                <View style={[styles.dayDot, i === 2 && styles.dayDotActive]} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* List Content */}
        <ScrollView style={styles.listContainer}>
          {/* Placeholder for AI Processing or Cards */}
          <View style={styles.card}>
            <View style={styles.cardUrgentBorder} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>לקבוע תור לרופא</Text>
              <View style={styles.pillsRow}>
                <View style={[styles.pill, styles.pillTime]}><Text style={styles.pillTextTime}>14:00</Text></View>
                <View style={[styles.pill, styles.pillForce]}><Text style={styles.pillTextForce}>FORCE</Text></View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput 
            style={styles.aiInput}
            placeholder="המוח שלך הריץ משהו? תתפוס אותו"
            value={inputText}
            onChangeText={setInputText}
            textAlign="right"
          />
          <TouchableOpacity style={styles.micBtn} onPress={handleStartRecording}>
            <Ionicons name="mic" size={18} color="white" />
          </TouchableOpacity>
          {inputText.length > 0 && (
            <TouchableOpacity style={styles.sendBtn} onPress={handleSendText}>
              <Ionicons name="send" size={18} color="white" />
            </TouchableOpacity>
          )}
        </View>

        <RecordingBottomSheet 
          visible={isBottomSheetVisible}
          onCancel={handleCancelRecording}
          onStop={handleStopRecording}
          transcript={transcript}
          isRecording={isRecording}
        />

        <ConfirmationOverlay 
          visible={isConfirmationVisible}
          tasks={aiTasks}
          onConfirm={() => {
            setConfirmationVisible(false);
            // TODO: Save tasks to state
          }}
          onCancel={() => setConfirmationVisible(false)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.bgReminders,
  },
  processingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.light.gray100,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 99,
    marginVertical: 10,
    gap: 6,
  },
  processingText: {
    fontSize: 12,
    color: Colors.light.gray600,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.bgReminders,
  },
  header: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 8,
    alignItems: 'flex-end',
    position: 'relative',
    overflow: 'hidden',
  },
  decoCircle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: '#9B8EC4', // Approximate color from HTML rgba
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.light.textHeading,
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.light.secondary,
    backgroundColor: Colors.light.bgReminders,
  },
  calBtnWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    width: 60,
    borderRightWidth: 0.5,
    borderColor: Colors.light.gray200,
  },
  calBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.light.text,
    marginTop: 2,
  },
  weekStrip: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  dayPill: {
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  dayPillActive: {
    backgroundColor: Colors.light.primaryDark,
    borderRadius: 12,
  },
  dayName: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.light.gray600,
  },
  dayNameActive: {
    color: 'rgba(255,255,255,0.7)',
  },
  dayNum: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.light.textHeading,
    marginTop: 3,
  },
  dayNumActive: {
    color: '#fff',
    fontWeight: '700',
  },
  dayDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.light.urgent,
    marginTop: 2,
  },
  dayDotActive: {
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: Colors.light.surface,
    borderWidth: 0.5,
    borderColor: Colors.light.secondary,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#502800',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  cardUrgentBorder: {
    width: 3,
    backgroundColor: Colors.light.urgent,
  },
  cardContent: {
    flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 5,
    textAlign: 'left',
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  pill: {
    paddingVertical: 2,
    paddingHorizontal: 7,
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
  inputBar: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderColor: Colors.light.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.bgReminders,
  },
  aiInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Colors.light.gray200,
    backgroundColor: Colors.light.gray100,
    fontSize: 14,
    color: Colors.light.text,
    marginRight: 8,
  },
  micBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 3,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
