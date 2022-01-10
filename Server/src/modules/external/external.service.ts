import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { TransferDto } from "../transaction/dto/transfer.dto";
import { AxiosResponse } from "axios";
import { ExternalTransferDto } from "./dto/externalTransfer.dto";

@Injectable()
export class ExternalService {
  constructor(private httpService: HttpService) {}

  async makeExternalTransfer(
    transferDto: ExternalTransferDto
  ): Promise<AxiosResponse<any>> {
    return await this.httpService
      .post(transferDto.thirdPartyEndPoint, transferDto)
      .toPromise();
  }
}
