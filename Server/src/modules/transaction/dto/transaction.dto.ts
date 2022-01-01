import { ObjectId, Types } from "mongoose";
import { Transaction } from "src/schemas/transaction.schema";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Account } from "../../../schemas/account.schema"

export class TransactionResponseDto {
    @IsNotEmpty()
    accountId: Types.ObjectId;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    debit: number;

    @IsNotEmpty()
    credit: number;

    @IsNotEmpty()
    balance: Types.ObjectId;
}