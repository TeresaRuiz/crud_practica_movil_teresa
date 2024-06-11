// Función que maneja las peticiones fetch
export default async function fetchData(filename, action, form = null) {
    // Variable que guarda la ip para importarla en la ruta general del servidor
    const ip = `192.168.2.124`; // Define la dirección IP del servidor
    
    // URL base del servidor
    const SERVER_URL = `http://${ip}/coffeeshop/api/`; // Construye la URL base del servidor
    
    // Opciones para la petición fetch
    const OPTIONS = {
        method: form ? 'POST' : 'GET', // Decide si usar POST o GET basado en si se proporciona un formulario
        ...(form && { body: form }) // Agrega el cuerpo de la solicitud si se proporciona un formulario
    };
 
    try {
        // Construcción de la URL con los parámetros necesarios
        const PATH = new URL(SERVER_URL + filename); // Construye la URL completa con el nombre del archivo
        PATH.searchParams.append('action', action); // Agrega el parámetro 'action' a la URL
        
        // Realización de la petición fetch
        const RESPONSE = await fetch(PATH.href, OPTIONS); // Realiza la solicitud fetch con la URL y opciones definidas
 
        // Verificación del estado de la respuesta
        if (!RESPONSE.ok) { // Verifica si la respuesta es exitosa
            throw new Error(`HTTP error! status: ${RESPONSE.status}`); // Lanza un error si la respuesta no es exitosa
        }
 
        // Parseo del JSON de la respuesta
        const DATA = await RESPONSE.json(); // Parsea la respuesta como JSON
        console.log('RESPONSE', DATA); // Imprime en la consola los datos recibidos
        return DATA; // Retorna los datos obtenidos
 
    } catch (error) {
        console.error('Fetch error:', error); // Maneja cualquier error ocurrido durante el proceso de la solicitud
        throw error; // Lanza el error para que pueda ser manejado externamente
    }
};
