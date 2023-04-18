const axios = require('axios');

class Message {
    constructor(version, phoneNumberId, accessToken) {
        this.version = version;
        this.phoneNumberId = phoneNumberId;
        this.accessToken = accessToken;
        this.baseUrl = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
    }

    /**
     *  Request Facebook API
     * @param {any} url
     * @param {any} payload
     * @returns {Array}
     */
    async APIRequest(url, payload) {
        try {
            const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
   
            return error?.response?.data;
        }
    }

/**
 * Sends a text message to the specified recipient.
 *
 * @param {string} recipientPhoneNumber - The recipient's phone number.
 * @param {string} messageContent - The content of the message.
 * @param {boolean} [previewUrl=false] - Whether to include a preview URL in the message.
 * @returns {Promise<Object>} A promise that resolves to the API response.
 */
    async sendTextMessage(recipientPhoneNumber, messageContent, previewUrl = false) {
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'text',
            text: {
                preview_url: previewUrl,
                body: messageContent,
            },
        };

        return await this.APIRequest(this.baseUrl, payload);
    }

    /**
     * Send Reply to Text Message
     * @param {any} recipientPhoneNumber
     * @param {any} messageId
     * @param {any} messageContent
     * @param {any} previewUrl=false
     * @returns {Array}
     */
    async sendReplyToTextMessage(recipientPhoneNumber, messageId, messageContent, previewUrl = false) {

        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            context: {
                message_id: messageId
            },
            type: 'text',
            text: {
                preview_url: previewUrl,
                body: messageContent,
            },
        };
            return await this.APIRequest(this.baseUrl, payload);      
    }

    /**
     * Send Reaction Message to Message ID
     * @param {any} recipientPhoneNumber
     * @param {any} messageId
     * @param {any} emoji
     * @returns {Array}
     */
    async sendReactionMessage(recipientPhoneNumber, messageId, emoji) {
        const url = `${this.baseUrl}`;
    
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'reaction',
            reaction: {
                message_id: messageId,
                emoji: emoji,
            },
        };
    
        try {
            const response = await this.APIRequest(url, payload);
            return response;
        } catch (error) {
            console.error('Error sending reaction message:', error);
            return null;
        }
    }

    /**
     *  Send Image Message to WhatsApp Number by ID 
     * @param {any} recipientPhoneNumber
     * @param {any} imageUrl
     * @param {any} caption=''
     * @returns {Array}
     */
    async sendImageMessageByID(recipientPhoneNumber, imageObjectId , caption = "") {
        const url = `${this.baseUrl}`;
    
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'image',
            image: {
                id: imageObjectId,
                caption: caption,
            },
        };
    
        try {
            const response = await this.APIRequest(url, payload);
            return response;
        } catch (error) {
            console.error('Error sending image message:', error);
            return null;
        }
    }

    /**
     * Send Image Message to WhatsApp Number by URL
     * @param {any} recipientPhoneNumber
     * @param {any} imageUrl
     * @param {any} caption=""
     * @returns {Array}
     */
    async sendImageMessageByUrl(recipientPhoneNumber, imageUrl , caption = "") {
        const url = `${this.baseUrl}`;
    
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'image',
            image: {
                link: imageUrl,
                caption: caption,
            },
        };
    
        try {
            const response = await this.APIRequest(url, payload);
            return response;
        } catch (error) {
            console.error('Error sending image message by URL:', error);
            return null;
        }
    }


    /**
     * Send Reply to Image Message by URL
     * @param {any} recipientPhoneNumber
     * @param {any} previousMessageId
     * @param {any} imageUrl
     * @returns {Array}
     */
    async sendReplyToImageMessageByUrl(recipientPhoneNumber, previousMessageId, imageUrl) {
        const url = `${this.baseUrl}`;
    
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            context: {
                message_id: previousMessageId,
            },
            type: 'image',
            image: {
                link: imageUrl,
            },
        };
    
        try {
            const response = await this.APIRequest(url, payload);
            return response;
        } catch (error) {
            console.error('Error sending reply to image message by URL:', error);
            return null;
        }
    }


    /**
     * Send Audio Message to WhatsApp Number by URL
     * @param {any} recipientPhoneNumber
     * @param {any} audioUrl
     * @returns {Array}
     */
    async sendAudioMessageByUrl(recipientPhoneNumber, audioUrl) {
        const url = `${this.baseUrl}`;
    
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'audio',
            audio: {
                link: audioUrl,
            },
        };
    
        try {
            const response = await this.APIRequest(url, payload);
            return response;
        } catch (error) {
            console.error('Error sending audio message by URL:', error);
            return null;
        }
    }


    /**
     * Send Document   by URL
     * @param {any} recipientPhoneNumber
     * @param {any} documentUrl
     * @param {any} caption
     * @returns {array}
     */
    async sendDocumentMessageByUrl(recipientPhoneNumber, documentUrl, caption) {
        const url = `${this.baseUrl}`;
    
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'document',
            document: {
                link: documentUrl,
                caption: caption,
            },
        };
    
        try {
            const response = await this.APIRequest(url, payload);
            return response;
        } catch (error) {
            console.error('Error sending document message by URL:', error);
            return null;
        }
    }
}

module.exports = Message;