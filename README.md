# ADHD Anchor

**ADHD Anchor** is a zero-friction reminder app (built with Expo React Native) designed specifically for people with ADHD and dopamine deficiency. The core philosophy of the app is that the moment between having a thought and capturing it must be exactly zero.

It features a warm, friendly design with original illustrated characters in soft browns, greens, and purples to create a calming and encouraging experience.

## Features

- **Zero-Friction Voice Capture**: Tap the mic on the home screen widget, speak your thought, and the integrated Claude AI auto-schedules everything for you.
- **Smart Widgets**:
  - Voice-to-task capture widget.
  - Next reminder widget featuring a semantic emoji.
- **Critical Reminders**: Force notifications with full-screen takeover, vibration, and a smart snooze feature to ensure important tasks are never missed.
- **Social Connection Tracker**: A dedicated Social tab tracks the days since your last call per contact via your call log, helping you stay in touch with friends and family.
- **Comprehensive Organization**: 4 main tabs (Reminders, Todo, Social, Guide) for full life management.
- **RTL Support**: Full RTL Hebrew interface support built-in.

## Installation

1. **Clone the repository** (if not already done):

   ```bash
   git clone <your-repo-url>
   cd ADHD-Anchor
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Required Permissions Setup (Android First)**:
   The app requires the following permissions to function correctly:
   - Microphone (for voice widgets)
   - `READ_CALL_LOG` (3 months back + self-log from install)
   - `READ_CONTACTS`
   - `POST_NOTIFICATIONS`
   - `SCHEDULE_EXACT_ALARM`
   - `VIBRATE`
   - `RECEIVE_BOOT_COMPLETED`

4. **Environment Variables**:
   _You will need to set up your Claude API keys in an `.env` file (refer to `.env.example` if available)._

## Usage

1. **Start the development server**:

   ```bash
   npx expo start
   ```

2. **Run on Android**:
   Press `a` in the terminal to open the app in an Android emulator, or scan the QR code with the Expo Go app on your physical Android device.

## 👤 Built by

**Abdul Ghafoor**
- GitHub: [@jamaghafoor](https://github.com/jamaghafoor)
- Email: [abdulghafoor1525@gmail.com](mailto:abdulghafoor1525@gmail.com)
- Portfolio: [https://dummyportfolio.com](https://dummyportfolio.com)
