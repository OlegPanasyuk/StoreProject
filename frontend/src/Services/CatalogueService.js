import HTTPService from './HTTPService';

class CatalogueService {
    static async getCatalogue(id) {
        const query = {};
        if (id) {
            Object.assign(query, { id });
        }
        return HTTPService.get({
            url: 'catalogue',
            query
        });
    }
}

export default CatalogueService;
