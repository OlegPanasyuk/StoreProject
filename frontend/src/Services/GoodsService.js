import HTTPService from './HTTPService';

class GoodsService {
    static async getGoods({
        id,
        id_catalogue
    }) {
        const query = {};
        if (id) {
            Object.assign(query, { id });
        }
        if (id_catalogue) {
            Object.assign(query, { id_catalogue });
        }
        return HTTPService.get({
            url: 'goods',
            query
        });
    }
}

export default GoodsService;
