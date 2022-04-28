import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProducsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtGuard)
  @Post()
  addProduct(
    @Body() completeBody: { title: string; price: number; description: string },
  ): Promise<Product> {
    return this.productsService.insertProduct(
      completeBody.title,
      completeBody.price,
      completeBody.description,
    );
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getSingleProduct(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() completeBody: { title: string; price: number; description: string },
  ) {
    return this.productsService.updateProduct(
      id,
      completeBody.title,
      completeBody.price,
      completeBody.description,
    );
  }
 
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.deleteProduct(id);
  }
}
