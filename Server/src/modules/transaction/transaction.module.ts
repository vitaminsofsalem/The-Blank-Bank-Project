import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transaction.service';
import { Mongoose } from 'mongoose';
import { Transaction, TransactionSchema } from '../../schemas/transaction.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Transaction.name, schema: TransactionSchema}])],
  exports: [TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}