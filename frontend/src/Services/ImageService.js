import HTTPService from './HTTPService';

class ImageService {
    static async getGoodsImage({
        idGoods
    }) {
        return HTTPService.get({
            url: `images/goods/${idGoods}`
        });
    }
}

export default ImageService;
