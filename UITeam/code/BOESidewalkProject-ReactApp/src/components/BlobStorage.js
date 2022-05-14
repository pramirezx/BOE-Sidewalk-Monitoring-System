const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob")
// const fs = require('fs');

const account = 'swbotblob';
const sas = 'sv=2019-10-10&si=csulaswproject-17C19A6298B&sr=c&sig=xZ2soDIU1tHpJVeQVKnAYykG32Sggh3C5xNTnv1%2FB6Y%3D';

const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net?${sas}`);
// https://swbotblob.blob.core.windows.net/csulaswproject
const containerName = "csulaswproject";

async function main() {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient('images/GPFR1903.JPG')

    console.log(blobClient)
    // fs.open(file)
    // console.log(file)
    // blobClient.downloadToFile('GPFR1903.JPG')
    // var fs = require('fs');
    // fs.open(file)

    // let i = 1;
    // let blobs = containerClient.listBlobsFlat();
    // for await (const blob of blobs) {
    //     console.log(blob);
    // }
}
main()
