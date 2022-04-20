import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './producs/products.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ProductsModule,MongooseModule.forRoot('mongodb+srv://kichi:kichi>@cluster0.3iomj.mongodb.net/nestapp?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
