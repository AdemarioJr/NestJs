import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    products: Product[] = [];
    id = 0;

    insertProduct(title: string, desc: string, price: number) {
        this.id += 1;
        const newProduct = new Product(this.id, title, desc, price)
        this.products.push(newProduct);
        return newProduct;
    }

    getAllProducts() {
        return this.products;
    }

    getOneProduct(id: number) {
        const product = this.findProductById(id)[0]
        return { ...product };
    }

    updateProduct(id: number, title: string, desc: string, price: number) {
        const index = this.findProductById(id)[1];
        const product = new Product(id, title, desc, price)
        this.products[index] = product;
        return this.products[index];

    }

    deleteProduct(id: number) {
        const index = this.findProductById(id)[1];
        this.products.splice(index, 1);
        return 'Product Removed';
    }

    private findProductById(id: number): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id.toString() === id.toString());
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not found product')
        }
        return [product, productIndex];
    }
}
