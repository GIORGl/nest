import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProducsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProduct(
    @Body() completeBody: { title: string; price: number; description: string },
  ): Product {
    return this.productsService.insertProduct(
      completeBody.title,
      completeBody.price,
      completeBody.description,
    );
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Product {
    return this.productsService.getSingleProduct(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() completeBody: { title: string; price: number; description: string },
  ) {
    this.productsService.updateProduct(
      id,
      completeBody.title,
      completeBody.price,
      completeBody.description,
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string):Product {
  return  this.productsService.deleteProduct(id);
  }
}
