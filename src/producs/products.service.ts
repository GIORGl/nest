import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { clearConfigCache } from 'prettier';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);

    const product = this.products[productIndex];

    return [product, productIndex];
  }

  async insertProduct(
    title: string,
    price: number,
    description: string,
  ): Promise<Product> {
    const newProduct = new this.productModel({
      title,
      price,
      description,
    });

    const result = await newProduct.save();

    return newProduct;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getSingleProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);

    if (!product) {
      throw new NotFoundException('couldnt find product');
    }

    return product;
  }

  async updateProduct(
    productId: string,
    title: string,
    price: number,
    description: string,
  ): Promise<Product> {
    let updatedProduct = await this.productModel.findById(productId);

    if (title) {
      updatedProduct.title = title;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (description) {
      updatedProduct.description = description;
    }

    if (!updatedProduct) {
      throw new NotFoundException('couldnt find product');
    }

    await updatedProduct.save();

    return updatedProduct;
  }

  async deleteProduct(id): Promise<Product> {
    let product = await this.productModel.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundException("couldn't find the product");
    }

    return product;
  }
}
