


// Funcion para lograr id autoincremental.
export const idController = (objectsArray) => {
    
    try {
        let maxId;
        if(objectsArray.length === 0) {
            maxId = 1;
            return maxId
        } else {
            maxId = objectsArray.reduce((max, obj) => {
                const firstPropValue = Object.values(obj)[0] // Obtener el valor de la primera propiedad
                return firstPropValue > max ? firstPropValue : max;
            }, Object.values(objectsArray[0])[0]) // Usar el valor de la primera propiedad del primer objeto como inicial
        }
        const newId = maxId + 1;
    
        return newId
    } catch(error) {
        throw new Error("Ocurrio un error inesperado al controlar el ID-autoincremental")
    }

}

