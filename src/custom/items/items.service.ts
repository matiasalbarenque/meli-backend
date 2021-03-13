import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class ItemsService {
    constructor(private httpService: HttpService) {}

    async items(query: string): Promise<any> {

        let error = false;

        try {
            const { data }: { data: any } = await this.httpService.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`).toPromise();
            return data;
        } catch {
            error = true;
        } finally {
            if (error) {
                return {
                    results: [],
                    filters: [],
                }
            }
        }
    }

    async itemData(id: string): Promise<any> {
        try {
            const { data }: { data: any } = await this.httpService.get(`https://api.mercadolibre.com/items/${id}`).toPromise();
            return data.id ? data : null;
        } catch {
            return null;
        }
    }

    async itemDescription(id: string): Promise<string> {
        try {
            const { data }: { data: any } = await this.httpService.get(`https://api.mercadolibre.com/items/${id}/description`).toPromise();
            return data?.plain_text || null;
        } catch {
            return null;
        }
    }

}
