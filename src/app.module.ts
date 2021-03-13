import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { constantsConfig } from './config';

import { ItemsModule } from './custom/items/items.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            load: [constantsConfig],
            isGlobal: true,
        }),
        ItemsModule,
    ],
})
export class AppModule {}
