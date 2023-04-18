class WhatsAppWebhookParser {
    constructor(webhookData) {
            this.webhookData = webhookData;
    }

    /** 
     *  @fdciabdul
     *  Get Type of text Message
     * @returns {any}
     */
    getMessage() {
            if (
                    this.webhookData.object === 'whatsapp_business_account' &&
                    this.webhookData.entry
            ) {
                    const entry = this.webhookData.entry[0];

                    if (entry.changes) {
                            const change = entry.changes[0];
                            const value = change.value;

                            if (
                                    value.messaging_product === 'whatsapp' &&
                                    value.messages &&
                                    value.messages[0].type === 'text'
                            ) {
                                    const SetType = entry.changes[0].value.messages[0];

                                    return {
                                            type: 'text',
                                            from: value.messages[0].from,
                                            text: value.messages[0].text.body,
                                            timestamp: value.messages[0].timestamp,
                                            senderName: value.contacts[0].profile.name,
                                            wa_id: value.contacts[0].wa_id,
                                            forwarded: SetType.context && SetType.context.forwarded ? true : false,
                                            quoted: SetType.context ? true : false,
                                    };
                            }
                    }
            }

            return null;
    }

    /**
     * Get Type of text Message with Security Notification
     * @returns {any}
     */
    getMessageWithSecurityNotification() {
            if (
                    this.webhookData.object === 'whatsapp_business_account' &&
                    this.webhookData.entry
            ) {
                    const entry = this.webhookData.entry[0];

                    if (entry.changes) {
                            const change = entry.changes[0];
                            const value = change.value;

                            if (
                                    value.messaging_product === 'whatsapp' &&
                                    value.messages &&
                                    value.messages[0].type === 'text' &&
                                    value.messages[0].identity
                            ) {
                                    return {
                                            type: 'text_with_security_notification',
                                            from: value.messages[0].from,
                                            text: value.messages[0].text.body,
                                            timestamp: value.messages[0].timestamp,
                                            senderName: value.contacts[0].profile.name,
                                            wa_id: value.contacts[0].wa_id,
                                            identity: {
                                                    acknowledged: value.messages[0].identity.acknowledged,
                                                    created_timestamp: value.messages[0].identity.created_timestamp,
                                                    hash: value.messages[0].identity.hash,
                                            },
                                    };
                            }
                    }
            }

            return null;
    }

    /**
     * Get Type Of Reaction Message
     * @returns {any}
     */
    getMessageWithReaction() {
            if (
                    this.webhookData.object === 'whatsapp_business_account' &&
                    this.webhookData.entry
            ) {
                    const entry = this.webhookData.entry[0];

                    if (entry.changes) {
                            const change = entry.changes[0];
                            const value = change.value;

                            if (
                                    value.messaging_product === 'whatsapp' &&
                                    value.messages &&
                                    value.messages[0].type === 'reaction'
                            ) {
                                    return {
                                            type: 'reaction',
                                            from: value.messages[0].from,
                                            timestamp: value.messages[0].timestamp,
                                            senderName: value.contacts[0].profile.name,
                                            wa_id: value.contacts[0].wa_id,
                                            reaction: {
                                                    emoji: value.messages[0].reaction.emoji,
                                                    message_id: value.messages[0].reaction.messsage_id,
                                            },
                                    };
                            }
                    }
            }

            return null;
    }

    /**
     * Get type of Image Message
     * @returns {any}
     */
    getImageMessage() {
            if (
                    this.webhookData.object === 'whatsapp_business_account' &&
                    this.webhookData.entry
            ) {
                    const entry = this.webhookData.entry[0];

                    if (entry.changes) {
                            const change = entry.changes[0];
                            const value = change.value;

                            if (
                                    value.messaging_product === 'whatsapp' &&
                                    value.messages &&
                                    value.messages[0].type === 'image'
                            ) {
                                    return {
                                            type: 'image',
                                            from: value.messages[0].from,
                                            timestamp: value.messages[0].timestamp,
                                            senderName: value.contacts[0].profile.name,
                                            wa_id: value.contacts[0].wa_id,
                                            image: {
                                                    caption: value.messages[0].image.caption,
                                                    mimeType: value.messages[0].image.mime_type,
                                                    sha256: value.messages[0].image.sha256,
                                                    id: value.messages[0].image.id,
                                            },
                                    };
                            }
                    }
            }

            return null;
    }

    /**
     * Get Type of Sticker Message
     * @returns {any}
     */
    getStickerMessage() {
            if (
                    this.webhookData.object === 'whatsapp_business_account' &&
                    this.webhookData.entry
            ) {
                    const entry = this.webhookData.entry[0];

                    if (entry.changes) {
                            const change = entry.changes[0];
                            const value = change.value;

                            if (
                                    value.messaging_product === 'whatsapp' &&
                                    value.messages &&
                                    value.messages[0].type === 'sticker'
                            ) {
                                    return {
                                            type: 'sticker',
                                            from: value.messages[0].from,
                                            timestamp: value.messages[0].timestamp,
                                            senderName: value.contacts[0].profile.name,
                                            wa_id: value.contacts[0].wa_id,
                                            sticker: {
                                                    id: value.messages[0].sticker.id,
                                                    animated: value.messages[0].sticker.animated,
                                                    mimeType: value.messages[0].sticker.mime_type,
                                                    sha256: value.messages[0].sticker.sha256,
                                            },
                                    };
                            }
                    }
            }

            return null;
    }

    /**
     * Get Contact Message
     * @returns {any}
     */
    getContactMessage() {
            if (
                    this.webhookData.object === 'whatsapp_business_account' &&
                    this.webhookData.entry
            ) {
                    const entry = this.webhookData.entry[0];

                    if (entry.changes) {
                            const change = entry.changes[0];
                            const value = change.value;

                            if (
                                    value.messaging_product === 'whatsapp' &&
                                    value.messages &&
                                    value.messages[0].contacts
                            ) {
                                    return {
                                            type: 'contact',
                                            from: value.messages[0].from,
                                            timestamp: value.messages[0].timestamp,
                                            senderName: value.contacts[0].profile.name,
                                            wa_id: value.contacts[0].wa_id,
                                            contact: value.messages[0].contacts[0],
                                    };
                            }
                    }
            }

            return null;
    }

    /**
     * Get Location Message
     * @returns {any}
     */
    getLocationMessage() {
            const message = this.webhookData.entry[0].changes[0].value.messages[0];
            const location = message.location;
            return {
                    type: 'location',
                    from: message.from,
                    id: message.id,
                    timestamp: message.timestamp,
                    location: {
                            latitude: location.latitude,
                            longitude: location.longitude,
                            name: location.name,
                            address: location.address,
                    },
            };
    }
    /**
     * Main Function to parse message
     * @param {any} webhookData
     * @param {any} webhookEvent
     * @param {any} webhookEventName
     * @param {any} webhookEventTime
     * @param {any} webhookEventSource
     * @returns {any}
     */
    parseMessage() {
            if (
                    this.webhookData.object === 'whatsapp_business_account' &&
                    this.webhookData.entry
            ) {
                    const entry = this.webhookData.entry[0];

                    if (entry.changes) {
                            const change = entry.changes[0];
                            const value = change.value;

                            if (value.messaging_product === 'whatsapp' && value.messages) {
                                    const message = value.messages[0];
                                    const messageType = message.type;

                                    if (messageType) {
                                            switch (messageType) {
                                                    case 'text':
                                                            return this.getMessage();
                                                    case 'text_with_security_notification':
                                                            return this.getMessageWithSecurityNotification();
                                                    case 'reaction':
                                                            return this.getMessageWithReaction();
                                                    case 'image':
                                                            return this.getImageMessage();
                                                    case 'sticker':
                                                            return this.getStickerMessage();
                                                    default:
                                                            return null;
                                            }
                                    } else if (message.contacts) {
                                            return this.getContactMessage();
                                    } else if (message.location) {
                                            return this.getLocationMessage();
                                    }
                            }
                    }
            }

            return null;
    }

}

module.exports = WhatsAppWebhookParser;