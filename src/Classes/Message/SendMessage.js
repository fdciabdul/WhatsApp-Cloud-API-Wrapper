const axios = require('axios');
/**
 * Wrapper for Whatsapp Cloud API
 *  Source : https://www.postman.com/meta/workspace/whatsapp-business-platform/
 *  Docs : https://developers.facebook.com/docs/whatsapp/api/messages
 *  Wrapped by : fdciabdul
 * @param {string} version
 * @param {string} phoneNumberId
 * @param {string} accessToken
 * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
 */
class Message  {
    constructor(version, phoneNumberId, accessToken) {
        this.version = version;
        this.phoneNumberId = phoneNumberId;
        this.accessToken = accessToken;
        this.baseUrl = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
    }
    /**
     *  Request Facebook API
     * @param {string} url - API URL
     * @param {string} payload
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     * @memberof Message
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
 * @memberof Message
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
     * @param {string} recipientPhoneNumber
     * @param {string} messageId
     * @param {string} messageContent
     * @param {string} previewUrl=false
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     * @memberof Message
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
     * @param {string} recipientPhoneNumber
     * @param {string} messageId
     * @param {string} emoji
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     * @memberof Message
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
     * @param {string} recipientPhoneNumber
     * @param {string} imageUrl
     * @param {string} caption=''
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     * @memberof Message
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
     * @param {string} recipientPhoneNumber
     * @param {string} imageUrl
     * @param {string} caption=""
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     * @memberof Message
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
     * @param {string} recipientPhoneNumber
     * @param {string} previousMessageId
     * @param {string} imageUrl
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     * @memberof Message
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
     * @param {string} recipientPhoneNumber
     * @param {string} audioUrl
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     * @memberof Message
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
     * @param {string} recipientPhoneNumber
     * @param {string} documentUrl
     * @param {string} caption
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     * @memberof Message
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

    /**
     *  Send Message list to Recipent Number
     * @param {string} recipientPhoneNumber (e.g. 447123456789)
     * @param {string} headerText (e.g. 'Your order is on the way')
     * @param {string} bodyText  (text to be displayed in the body of the list)
     * @param {string} footerText (text to be displayed in the footer of the list)
     * @param {string} buttonText (text to be displayed on the button)
     * @param {string} sectionData (array of objects containing the list items)
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     * @memberof Message
     */
    async  sendListMessage(recipientPhoneNumber, headerText, bodyText, footerText, buttonText, sectionData) {
        const url = `${this.baseUrl}`;
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'interactive',
            interactive: {
                type: 'list',
                header: {
                    type: 'text',
                    text: headerText,
                },
                body: {
                    text: bodyText,
                },
                footer: {
                    text: footerText,
                },
                action: {
                    button: buttonText,
                    sections: sectionData,
                },
            },
        };
        const response = await this.APIRequest(url, payload);
        return response;
    }

    /**
     * Sending product message to recipient number
     * @param {string} recipientPhoneNumber (required)
     * @param {string} catalogId (required)
     * @param {string} productRetailerId (required)
     * @param {string} bodyText='' (optional)
     * @param {string} footerText='' (optional)
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     * @memberof Message
     */
    async  sendProductMessage(recipientPhoneNumber, catalogId, productRetailerId, bodyText = '', footerText = '') {
        const url = `${this.baseUrl}`;
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'interactive',
            interactive: {
                type: 'product',
                body: {
                    text: bodyText,
                },
                footer: {
                    text: footerText,
                },
                action: {
                    catalog_id: catalogId,
                    product_retailer_id: productRetailerId,
                },
            },
        };
        const response = await this.APIRequest(url, payload);
        return response;
    }
    
    /**
     * Send Template Message to WhatsApp Number
     * @param {string} recipientPhoneNumber
     * @param {string} templateName
     * @param {string} languageCode
     * @param {array} components (Array of objects)
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs. return response
     * @memberof Message
     */
    async sendTemplateMessage(recipientPhoneNumber, templateName, languageCode, components) {
        const url = `${this.baseUrl}`;
    
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'template',
            template: {
                name: templateName,
                language: {
                    code: languageCode
                },
                components: components
            }
        };
    
        try {
            const response = await this.APIRequest(url, payload);
            return response;
        } catch (error) {
            console.error('Error sending template message:', error);
            return null;
        }
    }
    
    /**
     * Send Template Message to WhatsApp Number
     * @param {string} recipientPhoneNumber (WhatsApp number)
     * @param {string} templateName (Name of the template)
     * @param {string} languageCode (ISO 639-1 language code)
     * @param {string} imageUrl (URL of the image)
     * @param {array} components (Array of objects)
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs. return response
     * @memberof Message
     */
    async sendTemplateMessageWithMedia(recipientPhoneNumber, templateName, languageCode, imageUrl, components) {
        const url = `${this.baseUrl}`;
    
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'template',
            template: {
                name: templateName,
                language: {
                    code: languageCode
                },
                components: [
                    {
                        type: 'header',
                        parameters: [
                            {
                                type: 'image',
                                image: {
                                    link: imageUrl
                                }
                            }
                        ]
                    },
                    ...components
                ]
            }
        };
    
        try {
            const response = await this.APIRequest(url, payload);
            return response;
        } catch (error) {
            console.error('Error sending template message with media:', error);
            return null;
        }
    }
    
    /**
     * Send Interactive Template Message to WhatsApp Number
     * @param {string} recipientPhoneNumber
     * @param {string} templateName
     * @param {string} languageCode
     * @param {string} imageUrl
     * @param {string} bodyParameters
     * @param {string} quickReplyButtons
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     * @memberof Message
     */
    async sendInteractiveTemplateMessage(recipientPhoneNumber, templateName, languageCode, imageUrl, bodyParameters, quickReplyButtons) {
        const url = `${this.baseUrl}`;
    
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipientPhoneNumber,
            type: 'template',
            template: {
                name: templateName,
                language: {
                    code: languageCode
                },
                components: [
                    {
                        type: 'header',
                        parameters: [
                            {
                                type: 'image',
                                image: {
                                    link: imageUrl
                                }
                            }
                        ]
                    },
                    {
                        type: 'body',
                        parameters: bodyParameters
                    },
                    ...quickReplyButtons.map((button, index) => {
                        return {
                            type: 'button',
                            sub_type: 'quick_reply',
                            index: index.toString(),
                            parameters: [
                                {
                                    type: 'payload',
                                    payload: button.payload
                                }
                            ]
                        };
                    })
                ]
            }
        };
    
        try {
            const response = await this.APIRequest(url, payload);
            return response;
        } catch (error) {
            console.error('Error sending interactive template message:', error);
            return null;
        }
    }
    /**
     * Mark Message As Read
     * @param {string} recipientPhoneNumber
     * @param {string} wa_id
     * @return {Promise<Object>} The response data from the Facebook Graph API, or null if an error occurs.
     * @memberof Message
     */
    async MarkMessageAsRead(wa_id){
        try {
            let payload = {
                messaging_product: "whatsapp",
                status: "read",
                message_id: wa_id
            }
            const response = await axios.put(url, payload, {
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

}

module.exports = Message;