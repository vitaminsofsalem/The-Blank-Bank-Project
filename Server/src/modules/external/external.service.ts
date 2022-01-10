import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { TransferDto } from "../transaction/dto/transfer.dto";
import { AxiosResponse } from "axios";

const THIRD_PARTY_ENDPOINTS = [
  //test APIS
  "http://fht-rpi4.ddns.net/success",
  "http://fht-rpi4.ddns.net/invalidtoken",
  "http://fht-rpi4.ddns.net/missingfields",
  "http://fht-rpi4.ddns.net/usernotfound",
  "http://fht-rpi4.ddns.net/amountexceeded",
];

@Injectable()
export class ExternalService {
  constructor(private httpService: HttpService) {}

  // async makeExternalTransfer(
  //   transferDto: TransferDto
  // ): Promise<AxiosResponse<any>> {
  //   const results: Promise<AxiosResponse<any>>[] = [];

  //   for (const b of THIRD_PARTY_ENDPOINTS) {
  //     results.push(this.httpService.post(b, transferDto).toPromise());
  //   }

  //   const resultsResolved = await Promise.all(results);

  //   return resultsResolved[0];
  // }
}
