import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Mongoose, ObjectId, SchemaTypes, Types } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
