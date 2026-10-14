import { IProduct, ProductPayload } from '@app/contracts';
import { RpcNotFound } from '@app/contracts/filters/not-found.filter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductServiceService {
  private products: IProduct[] = [
    { id: 1, name: 'keyboard', price: 30_000, stock: 100, createdBy: 1 }, // fake a product
  ];
  private nextId = 0;
  constructor() {}

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new RpcNotFound(`Product ${id} not found!`);
    console.log('PRODUCT: ', product);
    return product;
  }

  create(data: ProductPayload) {
    this.products.push({
      id: ++this.nextId,
      createdBy: 1,
      ...data,
    });
  }
}
