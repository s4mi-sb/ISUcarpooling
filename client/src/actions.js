"use server"

import {S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3'

import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

const fileName = new Date().getTime();

const s3 = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials:{
        accessKeyId: import.meta.env.VITE_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_SECRET_KEY
    },
})

const maxFilesize = 1024 * 1024 * 2;

export async function getSignedURL(name, size, type){
    if(size > maxFilesize){
        return "File is too large"
    }
    const putObjectCommand = new PutObjectCommand({
        Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        Key: fileName + name,
        ContentType: type,
        ContentLength: size,
    })
    const signedURL = await getSignedUrl(s3,putObjectCommand, {expiresIn: 60})
    const getObjcommand = new GetObjectCommand({
        Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        Key: fileName + name,
    })
    const downloadUrl = await getSignedUrl(s3,getObjcommand);
    return {success: {url: signedURL}, download: {url: downloadUrl}};
}