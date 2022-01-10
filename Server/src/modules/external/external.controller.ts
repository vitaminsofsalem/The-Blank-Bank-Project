import { HttpService } from "@nestjs/axios";
import { Controller, Injectable, Get, Post, Body } from "@nestjs/common";
import { TransactionService } from "../transaction/transaction.service";
import { ExternalService } from "./external.service";
import { TransferDto } from "../transaction/dto/transfer.dto";
import { ExternalTransferDto } from "./dto/externalTransfer.dto";
import { AxiosResponse } from "axios";

@Controller("external")
@Injectable()
export class ExternalController {
  constructor(
    private transactionService: TransactionService,
    private externalService: ExternalService
  ) {}

  @Post("/transfer")
  async externalTransfer(@Body() dto: ExternalTransferDto): string {
    const res = await this.externalService.makeExternalTransfer(dto);
    return;
  }
}
