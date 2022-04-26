import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000).then(() => console.log('server runnin')).catch(err => console.log(err));
}
bootstrap();
