const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
let sharpAvailable = false;
let sharp;

try {
    sharp = require('sharp');
    sharpAvailable = true;
} catch (err) {
    console.warn("Warning: sharp module is not installed. Please install the sharp module (npm install sharp) to use the uploadSticker function.");
}
/**
 * Media class to handle media-related actions using Facebook Graph API.
 */
class Media {
    /**
     * Create a Media instance.
     * @param {string} version - The version of the Facebook Graph API.
     * @param {string} phoneNumberId - The phone number ID used for WhatsApp messaging.
     * @param {string} accessToken - The access token for the Facebook Graph API.
     */
    constructor(version, phoneNumberId, accessToken) {
        this.version = version;
        this.phoneNumberId = phoneNumberId;
        this.accessToken = accessToken;
        this.baseUrl = `https://graph.facebook.com/${version}/${phoneNumberId}/media`;
    }

    /**
     * Upload an image to be used in a WhatsApp message.
     * @param {string} filePath - The local file path of the image to be uploaded.
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     */
    async uploadImage(filePath) {
        const url = `${this.baseUrl}`;

        const formData = new FormData();
        formData.append('messaging_product', 'whatsapp');
        formData.append('file', fs.createReadStream(filePath));

        const headers = {
            ...formData.getHeaders(),
            'Authorization': `Bearer ${this.accessToken}`
        };

        const config = {
            method: 'post',
            url: url,
            headers: headers,
            data: formData
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            console.error('Error in API request:', error);
            return null;
        }
    }

    /**
 * Upload a sticker to be used in a WhatsApp message.
 * @param {string} filePath - The local file path of the sticker to be uploaded.
 * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
 */
    async uploadSticker(filePath) {
        if (!sharpAvailable) {
            console.error("Error: sharp module is not installed. Please install the sharp module (npm install sharp) to use the uploadSticker function.");
            return null;
        }
    const fileExtension = filePath.split('.').pop().toLowerCase();

    // Check if the input file is already in webp format
    const isWebp = fileExtension === 'webp';

    // If the input file is not in webp format, convert it to webp
    if (!isWebp) {
        filePath = await this.convertToWebp(filePath);
        if (!filePath) {
            console.error('Error: Could not convert the input file to webp format.');
            return null;
        }
    }

    const url = `${this.baseUrl}`;

    const formData = new FormData();
    formData.append('messaging_product', 'whatsapp');
    formData.append('file', fs.createReadStream(filePath));

    const headers = {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${this.accessToken}`
    };

    const config = {
        method: 'post',
        url: url,
        headers: headers,
        data: formData
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('Error in API request:', error);
        return null;
    }
}

/**
 * Convert an image to webp format.
 * @param {string} inputFilePath - The local file path of the image to be converted.
 * @return {Promise<string>} The file path of the converted webp image, or null if an error occurs.
 */
async convertToWebp(inputFilePath) {
    const outputFilePath = `${inputFilePath}.webp`;

    try {
        await sharp(inputFilePath).webp().toFile(outputFilePath);
        return outputFilePath;
    } catch (error) {
        console.error('Error in image conversion:', error);
        return null;
    }
}

}
