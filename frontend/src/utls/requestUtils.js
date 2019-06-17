export const queryObjToString = (queryObj) => {
    const arrStr = [];
    Object.keys(queryObj).forEach(el => arrStr.push(`${el}=${queryObj[el]}`));
    return `${arrStr.length > 0 ? '?' : ''}${arrStr.join('&')}`;
};

export default {
    queryObjToString
};
