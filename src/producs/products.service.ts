import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  private findProduct(id: string) {
    const product = this.products.find((prod) => prod.id === id);

    return { ...product };
  }

  insertProduct(title: string, price: number, description: string): Product {
    const newProduct = new Product(
      Math.random().toString(),
      title,
      price,
      description,
    );

    this.products.push(newProduct);

    return newProduct;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getSingleProduct(productId: string): Product {
    const product = this.findProduct(productId);

    if (!product) {
      throw new NotFoundException('couldnt find product');
    }

    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    price: number,
    description: string,
  ): Product {

    let product = this.findProduct(productId);
    if (!product) {
      throw new NotFoundException('couldnt find product');
    }

    

    return;
  }
}
