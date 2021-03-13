import { Module, HttpModule } from '@nestjs/common';

import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

import { HelpersModule } from 'common/helpers/helpers.module';
import { HelpersService } from 'common/helpers/helpers.service';

@Module({
    imports: [HttpModule, HelpersModule],
    controllers: [ItemsController],
    providers: [ItemsService, HelpersService],
})
export class ItemsModule {}
