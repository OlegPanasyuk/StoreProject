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
            response = await FetchRequests.request(objToRequest);
        } catch (e) {
            throw new Error(e);
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
            response = await FetchRequests.request(objToRequest);
        } catch (e) {
            throw new Error(e);
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
            response = await FetchRequests.request(objToRequest);
        } catch (e) {
            throw new Error(e);
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
            response = await FetchRequests.request(objToRequest);
        } catch (e) {
            throw new Error(e);
        }
        return response;
    }
}

export default HTTPService;
