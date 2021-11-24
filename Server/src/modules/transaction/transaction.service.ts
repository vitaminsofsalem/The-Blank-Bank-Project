import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import mongodb from 'mongodb'
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { TransactionResponseDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  
    constructor(@InjectModel(Transaction.name) private TransactionModel: Model<TransactionDocument>) {}

    async getAllTransByAccountId(accountId: string): Promise<Transaction[]> {
        const TransOfAccId = await this.TransactionModel.find({accountId: accountId}).exec()

        return TransOfAccId
    }

}
