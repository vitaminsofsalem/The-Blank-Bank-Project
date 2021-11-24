import { Controller, Get, Param } from '@nestjs/common';
import { isMongoId, IsMongoId } from 'class-validator';
import { ObjectId, Types } from 'mongoose';
import { Transaction } from 'src/schemas/transaction.schema';
import { TransactionResponseDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {

  constructor(private readonly TransactionService: TransactionService) {}

  @Get('/:accountId')
  async getAllTransByAccountId(
    @Param('accountId') accountId: Types.ObjectId
  ): Promise<Transaction[]>{
    return await this.TransactionService.getAllTransByAccountId(accountId)
  }
}
