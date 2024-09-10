import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL, KEY_TOKEN, apiGet } from '../../services/apiService';
import { toast } from 'react-toastify';

export default function AuthAdmin() {
    const nav = useNavigate();

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        const url = API_URL + '/users/checkToken';
        try {
            const data = await apiGet(url);
            if(data.role !== 'admin') {
                nav('/login');
                localStorage.removeItem(KEY_TOKEN);
                toast.error('!אינך מורשה גישה');
            }
            
        } catch (error) {
            console.log(error);
            nav('/');
            localStorage.removeItem(KEY_TOKEN);
            toast.error('התחבר שוב, תם הזמן לחיבור');
        }

    }

    return (
        <React.Fragment></React.Fragment>
    )
}
