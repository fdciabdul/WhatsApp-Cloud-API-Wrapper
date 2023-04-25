/**
 * Represents the WhatsApp Cloud API base class.
 */
class WACLOUDAPI {
    /**
     * Creates a new instance of the WACLOUDAPI class.
     * @param {string} version - The API version.
     * @param {string} phoneNumberId - The phone number ID.
     * @param {string} accessToken - The API access token.
     */
    constructor(version, phoneNumberId, accessToken) {
        this.version = version;
        this.phoneNumberId = phoneNumberId;
        this.accessToken = accessToken;
        this.baseUrl = `https://graph.facebook.com/${version}`;
    }

    /**
     * Gets the authentication headers for API requests.
     * @returns {Object} An object containing the authentication headers.
     */
    getAuthHeaders() {
        return {
            'Authorization': `Bearer ${this.accessToken}`,
        };
    }
}

module.exports = WACLOUDAPI;
