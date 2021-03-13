import { authorInterface } from 'common/helpers/helpers.interface';

interface responseItemsPriceInterface {
    currency: string; 
    amount: number; 
    decimals: number; 
}

export interface apiItemsResponseInterface {
    author: authorInterface;
    categories?: string[];
    items: itemInterface[];
}

export interface apiItemResponseInterface {
    author: authorInterface;
    item: itemInterface;
}

export interface itemInterface {
    id: string;
    title: string;
    price: responseItemsPriceInterface;
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity?: number;
    description?: string;
}