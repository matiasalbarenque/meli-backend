import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

declare const module: any;

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.use(helmet());
    app.enableCors();

    await app.listen(process.env.PORT || 3030);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
