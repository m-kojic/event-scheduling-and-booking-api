import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { FirebaseProvider } from '../../providers/firebase.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [UsersService, UsersRepository, FirebaseProvider],
  exports: [UsersService],
})
export class UsersModule {}
