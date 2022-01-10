import { HttpService } from "@nestjs/axios";
import {
  Controller,
  Injectable,
  Get,
  Request,
  Res,
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

const BANK_SERVICES_ACCOUNT = "411363528409";

@Controller("external")
@Injectable()
//@UseGuards(AuthGuard("jwt-external"))
export class ExternalController {
  constructor(
    private transactionService: TransactionService,
    private externalService: ExternalService
  ) {}

  @Post("/transferout/:accountId")
  @HttpCode(201)
  @UseGuards(AuthGuard("jwt"))
  async externalTransferOut(
    @Request() req: any,
    @Body() dto: TransferDto,
    @Param("accountId", new ParseObjectIdPipe()) accountId: string
  ) {
    console.log("transfer out initiated");
    const userID = req.user.id;
    const res = await this.externalService.makeExternalTransfer(dto);
    if (res.status == 201) {
      this.transactionService.createTransByAccountId(accountId, dto, userID);
    }

    return res;
  }

  @Post("/transfer")
  @HttpCode(201)
  async externalTransferIn(@Body() dto: any, @Res() res) {
    if (!dto.receiverAccountNumber || !dto.amount || !dto.description)
      return res.json({ error: "missing fields" }).status(400);

    console.log(dto.receiverAccountNumber);
    const userId = await this.transactionService.findUserIdByAccountNo(
      dto.receiverAccountNumber
    );
    console.log(userId);

    if (!userId)
      return res.json({ error: "account number not found" }).status(400);

    this.transactionService.createTransByAccountId(
      BANK_SERVICES_ACCOUNT,
      dto as TransferDto,
      userId.toString()
    );

    //TODO : limit amount to 50 and external fees

    return res.json({ msg: "done" }).status(201);
  }
}
