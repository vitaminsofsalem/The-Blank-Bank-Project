import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { TransferDto } from "../transaction/dto/transfer.dto";
import { AxiosResponse } from "axios";

const THIRD_PARTY_ENDPOINTS = [
  //test APIS
  "http://localhost:5000/success",
  "http://localhost:5000/invalidtoken",
  "http://localhost:5000/missingfields",
  "http://localhost:5000/usernotfound",
  "http://localhost:5000/amountexceeded",
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
