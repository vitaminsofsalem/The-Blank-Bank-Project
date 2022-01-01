import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Types } from "mongoose";
import mongodb from "mongodb";
import {
  Transaction,
  TransactionDocument,
} from "src/schemas/transaction.schema";
import { TransactionResponseDto } from "./dto/transaction.dto";
import { Account, AccountDocument } from "src/schemas/account.schema";
import * as mongoose from 'mongoose'

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private TransactionModel: Model<TransactionDocument>,
    @InjectModel(Account.name) private AccountModel: Model<AccountDocument>
  ) {}

  async getAllTransByAccountId(
    accountId: string,
    // userId: string
  ): Promise<Transaction[]> {
    // await this.ensureIsUserAccount(accountId, userId);
    const TransOfAccId = await this.TransactionModel.find({
      accountId
    }).populate('balance', 'balance').exec();
    return TransOfAccId;
  }
  // * * HOW The Create Transaction works:
  // it takes @params(senderAccountID, dto(body coming from frontend))
  // ! Assumes that amount is sent from frontend as dto.debit
  // it calls an updateBalance function that updates balances of both sender and receiver in database
  // it calls addTransToDB function that adds a transaction to the database.

  async createTransByAccountId(accountId: string, dto: TransactionResponseDto) {
      // Change accountId string to Types.ObjectId to be accepted by mongoose in dto schema
      var convertedAccountId = new mongoose.Types.ObjectId(accountId)

      await this.updateBalance(accountId, dto.accountId, dto.debit)
      // Changing dto accountId, balance, debit to sender's ID, balance, credit
      await this.addTransToDB({ ...dto, accountId: convertedAccountId ,debit: dto.debit, balance: convertedAccountId});
      // Setting debitAmount to receiver's credit and subtracting the debit from itself to zero it out ( resolves credit: 50, debit: 50 issue in database)
      await this.addTransToDB({...dto, credit: dto.debit, debit: dto.debit - dto.debit});

  }

  // * * How adding transaction to database
  // takes the spread out dto and uses insertMany to insert the array of trans ( transaction field )
  // Checks if the first object is there ( if array is empty ) and raises an exception if it is
  // returns transaction object

  private async addTransToDB(trans: Transaction) {
    const result = await this.TransactionModel.insertMany([trans])

    if (!result[0]) {
      console.log("Failed to add transaction", trans);
      throw new HttpException(
        "Failed to add transaction",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return result[0]
  }
  // * * How updating balance works:
  // We fetch sender and receiver accounts from database using their input IDs @params(senderAccountId, ReceiverAccountId, debitAmount ( amount to transfer ))
  // Check if the bank account balance has enough funds to initiate transfer, raise exception otherwise
  // Update the balances of both the sender and receiver to perform the transaction

  private async updateBalance(senderAccountId: string, receiverAccountId: Types.ObjectId, debitAmount: number) {    
    // Find account from database
      const senderAccount = await this.AccountModel.findOne({
        _id: senderAccountId
      });
      const receiverAccount = await this.AccountModel.findOne({
        _id: receiverAccountId
      });

      // check if user's account has sufficient funds to complete transaction 
      if (senderAccount.balance < debitAmount) {
        throw new HttpException (
          "Insufficient Funds",
          HttpStatus.BAD_REQUEST
        )
      } else {
      // update sender & receiver account balances
        await this.AccountModel.updateOne({_id: senderAccountId}, {$set: {"balance": senderAccount.balance.valueOf() - debitAmount}});
        await this.AccountModel.updateOne({_id: receiverAccountId}, {$set: {"balance": receiverAccount.balance.valueOf() + debitAmount}})
      }
  }
  // Check that account is linked to a userID
  private async ensureIsUserAccount(accountId: string, userId: string) {
    const account = await this.AccountModel.findOne({
      _id: accountId,
    });
    if (account.userID.toString() !== userId) {
      throw new UnauthorizedException();
    }
  }
}
