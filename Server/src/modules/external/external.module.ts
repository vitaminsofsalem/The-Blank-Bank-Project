import { Module } from "@nestjs/common";
import { ExternalService } from "./external.service";
import { ExternalController } from "./external.controller";
import { HttpModule } from "@nestjs/axios";
import { TransactionModule } from "../transaction/transaction.module";

@Module({
  providers: [ExternalService],
  controllers: [ExternalController],
  imports: [
    TransactionModule,
    HttpModule.register({
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.EXTERNAL_TRANSFER_JWT,
      },
    }),
  ],
  exports: [ExternalService],
})
export class ExternalModule {}
