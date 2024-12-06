import { useState, useEffect } from 'react';
import { getTeaches } from '@services/teach.service.js';

const useTeaches = () => {
    const [teaches, setTeaches] = useState([]);

    const fetchTeaches = async () => {
        try {
            const response = await getTeaches();
            const formattedData = response.map(teaches => ({
                
            }));
            dataLogged(formattedData);
            setTeaches(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchTeaches();
    }, []);

    const dataLogged = (formattedData) => {
        try {
            const { rut } = JSON.parse(sessionStorage.getItem('usuario'));
            for(let i = 0; i < formattedData.length ; i++) {
                if(formattedData[i].rut === rut) {
                    formattedData.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    };

    return { teaches, fetchTeaches, setTeaches };
};

export default useTeaches;