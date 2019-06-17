import { queryObjToString } from '../utls/requestUtils';

class FetchRequests {
    static request({
        url,
        method,
        body,
        query,
        headers
    }) {
        return new Promise((resolve, reject) => {
            if (fetch) {
                const queryStr = queryObjToString(query);
                const myHeaders = new Headers();
                Object.keys(headers).forEach((el) => {
                    myHeaders.append(el, headers[el]);
                });
                const bodyR = Object.assign({}, body);
                const myInit = {
                    method,
                    headers: myHeaders,
                    body: JSON.stringify(bodyR)
                };
                fetch(`${
                    process.env.REACT_APP_API_HOST
                }:${
                    process.env.REACT_APP_API_PORT
                }/${
                    url
                }${
                    queryStr
                }`, myInit)
                    .then((res) => {
                        console.log(res);
                        const { status, statusText } = res;
                        if (res.ok) {
                            res.json().then((data) => {
                                resolve({
                                    status,
                                    statusText,
                                    data
                                });
                            });
                        } else {
                            res.text().then((data) => {
                                resolve({
                                    status,
                                    statusText,
                                    data
                                });
                            });
                        }
                    });
            } else {
                reject(new Error('Your Browser don\'t support fetch requests'));
            }
        });
    }
}

export default FetchRequests;
