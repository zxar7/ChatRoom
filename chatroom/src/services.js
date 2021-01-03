const callApi = async (url, params, additionalHeaders) => {
    const options = {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Content-Type": 'application/json;charset=utf-8',
            ...additionalHeaders,
        },
        body: JSON.stringify(params)
    }
    const response = await fetch(url, options).then(res => res.json());
    if (!response)
        throw new Error(`No Response at ${url}`);
    return response;
}

const fetchApi = async (url) => {
    const response = await fetch(url);
    return response;
}


export const checkActiveUser = () => {
    return fetchApi('/api/user/').then(res => res.json());
}

export const confirmUserPresence = () => {
    return fetchApi('/api/confirmUserPresence').then(res => res.text());
}

export const selectActiveUser = (params, headers) => {
    return callApi('/api/selectUser', params, headers);
}

export const saveUserMessage = (params, headers) => {
    return callApi('/api/saveMessage', params, headers);
}

