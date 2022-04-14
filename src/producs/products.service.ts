import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);

    const product = this.products[productIndex];

    return [product, productIndex];
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
    const product = this.findProduct(productId)[0];

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
    let product = this.findProduct(productId)[0];

    const index = this.findProduct(productId)[1];
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (description) {
      updatedProduct.description = description;
    }
    this.products[index] = updatedProduct;

    if (!product) {
      throw new NotFoundException('couldnt find product');
    }

    return updatedProduct;
  }

  deleteProduct(id) : Product {

    let [product, index] = this.findProduct(id);
    
    if(!product) {
        throw new NotFoundException("couldn't find the product")
    }

    this.products.splice(index,1)

     return {...product};
  }
}
