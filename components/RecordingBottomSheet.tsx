import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Animated } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onStop: () => void;
  transcript?: string;
  isRecording?: boolean;
}

export function RecordingBottomSheet({ visible, onCancel, onStop, transcript, isRecording }: Props) {
  // Simple pulsing animation for the recording dot
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible && isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 0.3, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [visible, isRecording]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handleWrap}>
            <View style={styles.handle} />
          </View>

          {/* Decorative Sparkles (Static for now) */}
          <Text style={[styles.sparkle, { top: 14, left: 16, fontSize: 22, opacity: 0.42 }]}>✦</Text>
          <Text style={[styles.sparkle, { top: 8, left: 36, fontSize: 13, opacity: 0.28 }]}>✦</Text>
          
          <View style={styles.header}>
            <Text style={styles.title}>דבר. נטפל בשאר.</Text>
            <Text style={styles.subtitle}>דבר בחופשיות — ה-AI יסדר הכל</Text>
          </View>

          {/* Waveform Placeholder */}
          <View style={styles.waveformContainer}>
             <Text style={{color: Colors.light.gray500}}>Waveform Animating...</Text>
          </View>

          {/* Transcript Box */}
          <View style={styles.transcriptBox}>
            <View style={styles.recordingStatus}>
              <Animated.View style={[styles.recDot, { opacity: pulseAnim }]} />
              <Text style={styles.recText}>מקליט...</Text>
            </View>
            <Text style={styles.transcriptText}>
              {transcript || 'מחכה לדיבור...'}
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>ביטול</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.stopBtn} onPress={onStop}>
               <View style={styles.stopSquare} />
            </TouchableOpacity>
            
            <View style={{ width: 80 }} /> {/* Spacer to center the stop button */}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(232, 228, 222, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.light.bgReminders,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 10,
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: 12,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#C4A880',
    borderRadius: 2,
    opacity: 0.5,
  },
  sparkle: {
    position: 'absolute',
    color: '#B070A0',
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#3D2010',
    textAlign: 'left', // RTL flips this visually
  },
  subtitle: {
    fontSize: 12,
    color: '#A08060',
    marginTop: 4,
    textAlign: 'left',
  },
  waveformContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transcriptBox: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    minHeight: 100,
  },
  recordingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  recDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.light.urgent,
  },
  recText: {
    fontSize: 12,
    color: '#B09878',
    fontWeight: '500',
  },
  transcriptText: {
    fontSize: 15,
    color: '#6B4A30',
    lineHeight: 24,
    textAlign: 'left',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 14,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#C8A870',
    borderRadius: 20,
  },
  cancelText: {
    fontSize: 13,
    color: '#8B6040',
    fontWeight: '600',
  },
  stopBtn: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: Colors.light.primary, // Approximate gradient
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 8,
  },
  stopSquare: {
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
});
