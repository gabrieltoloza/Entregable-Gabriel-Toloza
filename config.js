import * as url from 'url'



// Constante de configuraciones globales:
export const config = {
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    
    get UPLOAD_DIR() {
        return `${this.DIRNAME}\public\\uploads`
    }
}