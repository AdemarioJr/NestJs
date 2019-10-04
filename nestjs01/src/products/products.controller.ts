import { ProductsService } from './products.service';
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Post()
    addProduct(
        @Body('title') title: string,
        @Body('description') desc: string,
        @Body('price') price: number, 
    ): any {
        return this.productsService.insertProduct(title, desc, price);
    }

    @Get()
    getAllProducts(): any {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getOneProduct(@Param('id') id: number): any {
        return this.productsService.getOneProduct(id);
    }

    @Put(':id')
    updateProduct(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('description') desc: string,
        @Body('price') price: number, 
    ): any {
        return this.productsService.updateProduct(id, title, desc, price);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.productsService.deleteProduct(id);
    }
}
