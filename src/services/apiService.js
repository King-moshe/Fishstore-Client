import axios from 'axios';
// export const API_URL = 'http://localhost:3002';
export const API_URL = 'https://fishstore-server.onrender.com';
export const KEY_TOKEN = 'fish_store';


const apiGet = async (url, body) => {
    try {
        let { data } = await axios({
            method: 'GET',
            url,
            data: body,
            headers: {
                'x-api-key': localStorage[KEY_TOKEN]
            },
        })
        return data;
    }
    catch (error) {
        throw error;
    }
}

const apiPost = async (url, body) => {
    try {
        let { data } = await axios({
            method: 'POST',
            url,
            data: body,
            headers: {
                'x-api-key': localStorage[KEY_TOKEN]
            },
        })
        return data;
    }
    catch (error) {
        throw error;
    }
}

const apiPut = async (url, body) => {
    try {
        let { data } = await axios({
            method: 'PUT',
            url,
            data: body,
            headers: {
                'x-api-key': localStorage[KEY_TOKEN]
            },
        })
        return data;
    }
    catch (error) {
        throw error;
    }
}

const apiPatch = async (url, body) => {
    try {
        let { data } = await axios({
            method: 'PATCH',
            url,
            data: body,
            headers: {
                'x-api-key': localStorage[KEY_TOKEN]
            },
        })
        return data;
    }
    catch (error) {
        throw error;
    }
}

const apiDelete = async (url, body) => {
    try {
        let { data } = await axios({
            method: 'DELETE',
            url,
            data: body,
            headers: {
                'x-api-key': localStorage[KEY_TOKEN]
            },
        })
        return data;
    }
    catch (error) {
        throw error;
    }
}


export { apiGet, apiPost, apiPut, apiPatch, apiDelete }