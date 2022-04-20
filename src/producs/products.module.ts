import { Module } from "@nestjs/common";
import { ProducsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./product.model";
@Module({
    imports:[MongooseModule.forFeature([{name: 'Product',schema: ProductSchema}])],
    controllers: [ProducsController],
    providers: [ProductsService]
})
export class ProductsModule {

}