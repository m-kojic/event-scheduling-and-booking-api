import { Inject, Injectable } from '@nestjs/common';
import { FIREBASE_CONNECTION } from '../../providers/firebase.provider';
import { firestore } from 'firebase-admin';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  private collectionStr = 'users';

  constructor(
    @Inject(FIREBASE_CONNECTION)
    private readonly firestore: firestore.Firestore,
  ) {}

  async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const docRef = this.firestore.collection(this.collectionStr).doc();
    const newUser = {
      id: docRef.id,
      ...user,
      createdAt: new Date(),
    };
    await docRef.set(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.firestore
      .collection(this.collectionStr)
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return doc.data() as User;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.firestore.collection(this.collectionStr).doc(id).get();
    return doc.exists ? (doc.data() as User) : null;
  }
}
