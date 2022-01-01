import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, ObjectId, Types } from "mongoose";
import { User } from './user.schema';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' , required: true })
    userID: User;

    @Prop({ required: true })
    accountNo: Number;

    @Prop({ required: true })
    balance: Number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
