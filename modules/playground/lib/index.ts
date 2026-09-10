
/** 
@param file
@param rootFolder
@returns 
*/

import { TemplateFile, TemplateFolder } from "./path-to-json";

export const generateFileId = (file:TemplateFile , rootFolder:TemplateFolder):string =>{
         const path = findFilePath(file,rootFolder)?.replace(/^\+/,'')||''

         const extension= file.fileExtension?.trim();
         const extensionSuffix=extension?`.${extension}`: ''

         return path 
           ?`${path}/${file.filename}${extensionSuffix}`
           : `${file.filename}${extensionSuffix}`
}