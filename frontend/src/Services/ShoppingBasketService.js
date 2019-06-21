import HTTPService from './HTTPService';

class ShoppingBasketService {
    static async sendDataToWork({
        body
    }) {
        const token = window.localStorage.getItem('Authorization');
        return HTTPService.post({
            url: 'basket',
            body,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        });
    }
}

export default ShoppingBasketService;
