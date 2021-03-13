import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

declare const module: any;

const port = 3030;

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.use(helmet());
    app.enableCors();

    await app.listen(port);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
