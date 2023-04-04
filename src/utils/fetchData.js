function fetchData(url, options = {}) {
    const token = localStorage.getItem('token');
    const headers = Object.assign({}, options.headers, {
        Authorization: `Bearer ${token}`,
    });
    const newOptions = Object.assign({}, options, { headers });
    return fetch(url, newOptions);
}
export default fetchData