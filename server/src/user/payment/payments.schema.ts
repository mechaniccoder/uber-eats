import { SchemaFactory } from "@nestjs/mongoose";

export class Payment {}

export const paymentSchema = SchemaFactory.createForClass(Payment)