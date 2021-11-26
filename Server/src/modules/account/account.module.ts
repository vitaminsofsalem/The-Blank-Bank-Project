import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';


@Module({
    exports: [AccountService],
    controllers: [AccountController],
    providers: [AccountService],
})

export class TransactionModule {}
