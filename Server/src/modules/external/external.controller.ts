import { HttpService } from "@nestjs/axios";
import {
  Controller,
  Injectable,
  Get,
  Request,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
  Param,
  HttpException,
} from "@nestjs/common";
import { TransactionService } from "../transaction/transaction.service";
import { ExternalService } from "./external.service";
import { TransferDto } from "../transaction/dto/transfer.dto";
import { AxiosResponse } from "axios";
import { AuthGuard } from "@nestjs/passport";
import { ParseObjectIdPipe } from "src/pipes/parseObjectId.pipe";

@Controller("external")
@Injectable()
//@UseGuards(AuthGuard("jwt-external"))
export class ExternalController {
  constructor(
    private transactionService: TransactionService,
    private externalService: ExternalService
  ) {}

  @Post("/transferout")
  @HttpCode(201)
  async externalTransferOut(
    @Request() req: any,
    @Body() dto: TransferDto,
    @Param("accountId", new ParseObjectIdPipe()) accountId: string
  ) {
    const userID = req.user.id;
    const res = await this.externalService.makeExternalTransfer(dto);
    if (res.status == 201) {
      this.transactionService.createTransByAccountId(accountId, dto, userID);
    }

    return res;
  }

  @Post("/transfer")
  @HttpCode(201)
  async externalTransferIn(@Body() dto: any) {
    if (!dto.receiverAccountNumber || !dto.amount || !dto.description)
      throw new HttpException("missing fields", HttpStatus.BAD_REQUEST);

    const userId = this.transactionService.findUserIdByAccountId(
      dto.receiverAccountNumber
    );

    if (!userId)
      throw new HttpException(
        "account number not found",
        HttpStatus.BAD_REQUEST
      );

    return;
  }
}
