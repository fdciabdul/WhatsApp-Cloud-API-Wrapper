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
        parseStatus() {
                if (this.notificationData.entry) {
                        const entry = this.notificationData.entry[0];

                        if (entry.changes) {
                                const change = entry.changes[0];
                                const value = change.value;

                                if (
                                        value.messaging_product === "whatsapp" &&
                                        value.statuses &&
                                        value.statuses[0]
                                ) {
                                        const status = value.statuses[0];
                                        return {
                                                id: status.id,
                                                status: status.status,
                                                timestamp: status.timestamp,
                                                recipient_id: status.recipient_id,
                                        };
                                }
                        }
                }

                return null;
        }

}

module.exports = NotificationParser;