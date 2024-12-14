import { useState , useEffect } from "react";
import { getResources } from "@services/resource.service.js";

const useGetResources = () => {

    const [resources, setResources] = useState([]);
    const fetchResources = async () => {
        try {
            const response = await getResources();

            // console.log("Respuesta:" + response[1].nombre);

            // if (response && response.data) {
            //     // setElementsToReserve(response.data); // Solo guardamos los datos, no el resto
            //     console.log('Recursos:', response.data); // Ver los datos de recursos
            // }       

            // if( resource.estad)
            
            const formattedResources = response.data.map(resource => ({
                id: resource.id,
                nombre: capitalizeFirstLetter(resource.nombre),
                estado: resource.estado.toUpperCase(),
                idManager: resource.idManager,
                createdAt: resource.createdAt
            }));

            // console.log("Recursos: ", formattedResources);
            dataLogged(formattedResources);
            setResources(formattedResources);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        fetchResources();
    }, []);

    const dataLogged = (formattedData) => {
        try {
            const { id } = JSON.parse(sessionStorage.getItem('resource'));
            for(let i=0; i < formattedData.length ; i++){
                if(formattedData[i].id === id){
                    formattedData.splice(i,1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return { resources , fetchResources , setResources };
}   

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export default useGetResources;