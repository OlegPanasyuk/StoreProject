import FetchRequests from './FetchRequests';

class HTTPService {
    static async post({
        url = '',
        body = {},
        headers = { 'Content-type': 'application/json' },
        query = {}
    }) {
        let response = null;
        try {
            const objToRequest = {
                url,
                body,
                method: 'POST',
                headers,
                query
            };
            const data = await FetchRequests.request(objToRequest);
            response = new Promise((resolved, reject) => {
                console.log('data ', data);
                if (data) {
                    resolved(data);
                } else {
                    reject(new Error('no data'));
                }
            });
        } catch (e) {
            console.error(e);
        }
        return response;
    }

    static async get({
        url = '',
        body = {},
        headers = { 'Content-type': 'application/json' },
        query = {}
    }) {
        let response = null;
        try {
            const objToRequest = {
                url,
                body,
                method: 'GET',
                headers,
                query
            };
            const data = await FetchRequests.request(objToRequest);
            response = new Promise((resolved) => {
                resolved(data);
            });
        } catch (e) {
            console.error(e);
        }
        return response;
    }

    static async put({
        url = '',
        body = {},
        headers = { 'Content-type': 'application/json' },
        query = {}
    }) {
        let response = null;
        try {
            const objToRequest = {
                url,
                body,
                method: 'PUT',
                headers,
                query
            };
            const data = await FetchRequests.request(objToRequest);
            response = new Promise((resolved) => {
                resolved(data);
            });
        } catch (e) {
            console.error(e);
        }
        return response;
    }

    static async delete({
        url = '',
        body = {},
        headers = { 'Content-type': 'application/json' },
        query = {}
    }) {
        let response = null;
        try {
            const objToRequest = {
                url,
                body,
                method: 'DELETE',
                headers,
                query
            };
            const data = await FetchRequests.request(objToRequest);
            response = new Promise((resolved) => {
                resolved(data);
            });
        } catch (e) {
            console.error(e);
        }
        return response;
    }
}

export default HTTPService;
