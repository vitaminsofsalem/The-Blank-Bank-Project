import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { TransactionResponseDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  
    constructor(@InjectModel(Transaction.name) private TransactionModel: Model<TransactionDocument>) {}

    async getAllTransByAccountId(accountId: Types.ObjectId): Promise<Transaction[]> {
        const TransOfAccId = await this.TransactionModel.find({}).exec()

        return TransOfAccId.filter(trans => {
            return trans.accountId === accountId
        });
    }

}
