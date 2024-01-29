import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.baby-bot.ui',
  appName: 'baby-bot-ui',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['google.com'],
    },
  },
};

export default config;
