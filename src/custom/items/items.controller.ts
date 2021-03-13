import { Controller, Get, Query, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { HelpersService } from 'common/helpers/helpers.service';
import { itemInterface, apiItemsResponseInterface, apiItemResponseInterface } from './interfaces/items.interface';

@Controller('items')
export class ItemsController {
    constructor(
        private itemsService: ItemsService,
        private helpersService: HelpersService,
        ) {}

    // Defino el autor de la api
    private author = this.helpersService.getApiAuthor();

    @Get()
    async items(@Query('q') query: string): Promise<apiItemsResponseInterface> {

        // Obtiene los datos de la api externa
        const { results, filters } = await this.itemsService.items(query);

        const items: itemInterface[] = [];

        // Limito los resultados para que sean únicamente 4
        const limitedResults = results.slice(0, 4);

        limitedResults.forEach((item) => {
            items.push({
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: Math.floor(item.price),
                    decimals: parseFloat((item.price - Math.floor(item.price)).toPrecision(2)),
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
            });
        });

        // Preparo las categorias
        const categories = filters[0]?.values[0]?.path_from_root.map(item => item.name);

        return {
            author: this.author,
            categories,
            items,
        };
    }

    @Get(':id')
    async item(@Param() { id }): Promise<apiItemResponseInterface> {

        let itemData: any;
        let description: string;

        // Obtiene los datos de la api externa
        await Promise.all([
            this.itemsService.itemData(id),
            this.itemsService.itemDescription(id),
        ])
            .then((resp) => {
                [itemData, description] = resp;
            });

        let item: itemInterface = null;
        if (itemData && description) {
            item = {
                id: itemData.id,
                title: itemData.title,
                price: {
                    currency: itemData.currency_id,
                    amount: Math.floor(itemData.price),
                    decimals: parseFloat((itemData.price - Math.floor(itemData.price)).toPrecision(2)),
                },
                picture: itemData.pictures[0].url,
                condition: itemData.condition,
                free_shipping: itemData.shipping.free_shipping,
                sold_quantity: itemData.sold_quantity,
                description: description.replace(/\n/g, '<br>'),
            };
        }

        return {
            author: this.author,
            item,
        };
    }
}