import HTTPService from './HTTPService';

class AuthService {
    static async registration({
        body
    }) {
        return HTTPService.post({
            url: 'reg',
            body
        });
    }

    static async login({
        body
    }) {
        return HTTPService.post({
            url: 'login',
            body
        });
    }

    static async loginToken() {

    }
}

export default AuthService;
