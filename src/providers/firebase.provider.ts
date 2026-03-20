import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export const FIREBASE_CONNECTION = 'FIREBASE_CONNECTION';

export const FirebaseProvider: Provider = {
  provide: FIREBASE_CONNECTION,
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = configService.get('firebase');
    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: firebaseConfig.projectId,
          privateKey: firebaseConfig.privateKey,
          clientEmail: firebaseConfig.clientEmail,
        }),
      });
    }
    return admin.firestore();
  },
  inject: [ConfigService],
};
