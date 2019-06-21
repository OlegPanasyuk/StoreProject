import HTTPService from './HTTPService';

class UserService {
    static async getUserHistoryOfShopping() {
        const token = window.localStorage.getItem('Authorization');
        return HTTPService.get({
            url: 'basket/users/history',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

export default UserService;
