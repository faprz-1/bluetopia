export default interface FileToUpload {
    encodedFileContainer?: string;
    base64File: string;
    uri?: string;
    fileName?: string;
    resize: boolean;
    fileExtention: string;
}
