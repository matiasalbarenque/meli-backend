import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authorInterface } from './helpers.interface';

@Injectable()
export class HelpersService {
    constructor(private configService: ConfigService) {}

    getApiAuthor(): authorInterface {
        return {
            name: this.configService.get<string>('constants.authorName'),
            lastname: this.configService.get<string>('constants.authorLastname'),
        };
    }

}
