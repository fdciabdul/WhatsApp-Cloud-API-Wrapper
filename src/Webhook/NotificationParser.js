/**
 * Description : WhatsApp Notification Parser Main Class
 * @fdciabdul : 2023-04-19
 * @param {any} webhookData
 * @returns {any}
 */
class NotificationParser {
    constructor(notificationData) {
            this.notificationData = notificationData;
    }

    /**
     *  Get Message Status Update
     * @returns {any}
     * @memberof NotificationParser
     */
    getMessageStatusUpdate() {
       
        if (
            this.notificationData &&
            this.notificationData.entry &&
            this.notificationData.entry[0] &&
            this.notificationData.entry[0].changes &&
            this.notificationData.entry[0].changes[0] &&
            this.notificationData.entry[0].changes[0].value &&
            this.notificationData.entry[0].changes[0].value.statuses &&
            this.notificationData.entry[0].changes[0].value.statuses[0]
        ) {
            const status = this.notificationData.entry[0].changes[0].value.statuses[0];
            return {
                id: status.id,
                status: status.status,
                timestamp: status.timestamp,
                recipient_id: status.recipient_id,
            };
        }
        
        return {};
    }

    /**
     * Get Quick Reply Button Click Notification
     * @returns {any}
     * @memberof NotificationParser
     */
    getQuickReplyButtonClick() {
            const buttonMessage = this.notificationData.entry[0].changes[0].value.messages[0];
            return {
                    context: {
                            from: buttonMessage.context.from,
                            id: buttonMessage.context.id,
                    },
                    from: buttonMessage.from,
                    id: buttonMessage.id,
                    timestamp: buttonMessage.timestamp,
                    type: buttonMessage.type,
                    button: {
                            text: buttonMessage.button.text,
                            payload: buttonMessage.button.payload,
                    },
            };
    }

    /**
     * Get user initiated message sent
     * @returns {any}
     * @memberof NotificationParser
     */
    getUserInitiatedMessageSent() {
            const userInitiatedStatus = this.notificationData.entry[0].changes[0].value.statuses[0];
            return {
                    id: userInitiatedStatus.id,
                    recipient_id: userInitiatedStatus.recipient_id,
                    status: userInitiatedStatus.status,
                    timestamp: userInitiatedStatus.timestamp,
                    conversation: {
                            id: userInitiatedStatus.conversation.id,
                            expiration_timestamp: userInitiatedStatus.conversation.expiration_timestamp,
                            origin: {
                                    type: userInitiatedStatus.conversation.origin.type,
                            },
                    },
                    pricing: {
                            pricing_model: userInitiatedStatus.pricing.pricing_model,
                            billable: userInitiatedStatus.pricing.billable,
                            category: userInitiatedStatus.pricing.category,
                    },
            };
    }

    /**
     * Get Business Initiated Message Sent
     * @returns {any}
     * @memberof NotificationParser
     */
    getMessageSentBusinessInitiated() {
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
                                    value.statuses &&
                                    value.statuses[0].conversation &&
                                    value.statuses[0].conversation.origin &&
                                    value.statuses[0].conversation.origin.type === 'business_initated'
                            ) {
                                    return {
                                            id: value.statuses[0].id,
                                            recipient_id: value.statuses[0].recipient_id,
                                            status: value.statuses[0].status,
                                            timestamp: value.statuses[0].timestamp,
                                            conversation_id: value.statuses[0].conversation.id,
                                            expiration_timestamp: value.statuses[0].conversation.expiration_timestamp,
                                            pricing: value.statuses[0].pricing,
                                    };
                            }
                    }
            }

            return null;
    }

    /**
     * Get Message Deleted
     * @returns {any}
     * @memberof NotificationParser
     */
    getMessageDeleted() {
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
                                    value.messages[0].type === 'unsupported' &&
                                    value.messages[0].errors &&
                                    value.messages[0].errors[0].code === 131051
                            ) {
                                    return {
                                            from: value.messages[0].from,
                                            id: value.messages[0].id,
                                            timestamp: value.messages[0].timestamp,
                                            error: {
                                                    code: value.messages[0].errors[0].code,
                                                    details: value.messages[0].errors[0].details,
                                                    title: value.messages[0].errors[0].title,
                                            },
                                            type: value.messages[0].type,
                                            senderName: value.contacts[0].profile.name,
                                            wa_id: value.contacts[0].wa_id,
                                    };
                            }
                    }
            }

            return null;
    }

    /**
     * Get Message Received Order
     * @returns {any}
     * @memberof NotificationParser
     */
    getReceivedOrderMessage() {
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
                                    value.messages[0].type === 'order'
                            ) {
                                    const message = value.messages[0];
                                    const order = message.order;
                                    const productItems = order.product_items.map(item => ({
                                            product_retailer_id: item.product_retailer_id,
                                            quantity: item.quantity,
                                            item_price: item.item_price,
                                            currency: item.currency,
                                    }));

                                    return {
                                            from: message.from,
                                            id: message.id,
                                            order: {
                                                    catalog_id: order.catalog_id,
                                                    product_items: productItems,
                                                    text: order.text,
                                            },
                                            context: message.context,
                                            timestamp: message.timestamp,
                                            type: message.type,
                                            senderName: value.contacts[0].profile.name,
                                            wa_id: value.contacts[0].wa_id,
                                    };
                            }
                    }
            }

            return null;
    }

    /**
     * Main Function to parse the notification
     * @returns {any}
     * @memberof NotificationParser
     */
    parseNotification() {
            const messageStatusUpdate = this.getMessageStatusUpdate();
            if (messageStatusUpdate) {
                    return {
                            type: 'message_status_update',
                            data: messageStatusUpdate
                    };
            }

            const quickReplyButtonClick = this.getQuickReplyButtonClick();
            if (quickReplyButtonClick) {
                    return {
                            type: 'quick_reply_button_click',
                            data: quickReplyButtonClick
                    };
            }

            const userInitiatedMessageSent = this.getUserInitiatedMessageSent();
            if (userInitiatedMessageSent) {
                    return {
                            type: 'user_initiated_message_sent',
                            data: userInitiatedMessageSent
                    };
            }

            const messageSentBusinessInitiated = this.getMessageSentBusinessInitiated();
            if (messageSentBusinessInitiated) {
                    return {
                            type: 'message_sent_business_initiated',
                            data: messageSentBusinessInitiated
                    };
            }

            const messageDeleted = this.getMessageDeleted();
            if (messageDeleted) {
                    return {
                            type: 'message_deleted',
                            data: messageDeleted
                    };
            }

            const receivedOrderMessage = this.getReceivedOrderMessage();
            if (receivedOrderMessage) {
                    return {
                            type: 'received_order_message',
                            data: receivedOrderMessage
                    };
            }

            return {
                    type: 'unknown',
                    data: null
            };
    }
}

module.exports = NotificationParser;