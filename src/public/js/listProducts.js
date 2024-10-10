const containerList = document.querySelector('#list-products')


const socketClient = io();



socketClient.on('connect', () => {
    console.log("Conectado al servidor WebSocket/Products", );
    socketClient.emit('client_connect', 'Cliente conectado al endpoint "/realtimeproducts"')
});


socketClient.on('new_product', data => {
    renderNewProduct(data)
    socketClient.emit('success_new_product', 'Nuevo producto agregado al registro')
})





function renderNewProduct(productObj) {
    const newdiv = document.createElement('div')
    newdiv.classList.add('w-full' ,'max-w-sm' ,'p-4' ,'bg-white', 'border' ,'border-gray-200' ,'rounded-lg', 'shadow' ,'sm:p-8', 'dark:bg-gray-800', 'dark:border-gray-700')
    newdiv.innerHTML = `
                    <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400"> ${productObj.title} </h5>
            <div class="flex items-baseline text-gray-900 dark:text-white">
                <span class="text-3xl font-semibold">$</span>
                <span class="text-5xl font-extrabold tracking-tight"> ${productObj.price} </span>
            </div>

            <ul role="list" class="space-y-5 my-7">
                <li class="flex items-center">
                    <svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Descripcion: ${productObj.description} </span>
                </li>
                <li class="flex">
                    <svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Categoria: ${productObj.category} </span>
                </li>
                <li class="flex">
                    <svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Codigo: ${productObj.code} </span>
                </li>
                <li class="flex decoration-gray-500">
                    <svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span class="text-base font-normal leading-tight text-gray-500 ms-3">Stock: ${productObj.stock} </span>
                </li>

            </ul>
            <button type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
                Comprar
            </button>
    `;
    containerList.append(newdiv)
}



socketClient.on('deleted_product', data => {
    renderUpdateProducts(data)
    socketClient.emit('success_deleted_product', 'Se ha borrado un producto en el registro')
})



function renderUpdateProducts(objectArray){
    containerList.innerHTML = '';
    objectArray.forEach(product => {
        const newdiv = document.createElement('div')
        newdiv.classList.add('w-full' ,'max-w-sm' ,'p-4' ,'bg-white', 'border' ,'border-gray-200' ,'rounded-lg', 'shadow' ,'sm:p-8', 'dark:bg-gray-800', 'dark:border-gray-700')
        newdiv.innerHTML = `
                        <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400"> ${product.title} </h5>
                <div class="flex items-baseline text-gray-900 dark:text-white">
                    <span class="text-3xl font-semibold">$</span>
                    <span class="text-5xl font-extrabold tracking-tight"> ${product.price} </span>
                </div>
    
                <ul role="list" class="space-y-5 my-7">
                    <li class="flex items-center">
                        <svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Descripcion: ${product.description} </span>
                    </li>
                    <li class="flex">
                        <svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Categoria: ${product.category} </span>
                    </li>
                    <li class="flex">
                        <svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Codigo: ${product.code} </span>
                    </li>
                    <li class="flex decoration-gray-500">
                        <svg class="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="text-base font-normal leading-tight text-gray-500 ms-3">Stock: ${product.stock} </span>
                    </li>
    
                </ul>
                <button type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
                    Comprar
                </button>
        `;
        containerList.append(newdiv)
    })
}