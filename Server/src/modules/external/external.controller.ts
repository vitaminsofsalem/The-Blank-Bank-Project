import { HttpService } from "@nestjs/axios";
import {
  Controller,
  Injectable,
  Get,
  Post,
  Body,
  UseGuards,
} from "@nestjs/common";
import { TransactionService } from "../transaction/transaction.service";
import { ExternalService } from "./external.service";
import { TransferDto } from "../transaction/dto/transfer.dto";
import { AxiosResponse } from "axios";
import { AuthGuard } from "@nestjs/passport";

@Controller("external")
@Injectable()
//@UseGuards(AuthGuard("jwt-external"))
export class ExternalController {
  constructor(
    private transactionService: TransactionService,
    private externalService: ExternalService
  ) {}

  @Post("/transfer")
  async externalTransfer(@Body() dto: TransferDto) {
    console.log("EXTERNAL TRANSFER");
    //const res = await this.externalService.makeExternalTransfer(dto);
    //return res.data;
    return "test";
  }
}
