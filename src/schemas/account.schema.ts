import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Mongoose, ObjectId, SchemaTypes, Types } from "mongoose";

export type AccountDocument = Account & Document;

@Schema()
export class Account {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' , required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    openDate: Date;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    balance: number;

}

export const TransactionSchema = SchemaFactory.createForClass(Account);