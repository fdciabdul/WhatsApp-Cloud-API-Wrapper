const express = require('express');
const ngrok = require('ngrok');
const EventEmitter = require('events');

/**
 * Class WebhookServer
 * @param {any} port (required)
 * @param {any} useNgrok (optional)
 * @param {any} ngrokAuthToken (optional)
 * @returns {any}
 * @constructor
 */
class WebhookServer extends EventEmitter {
    constructor(port, useNgrok, opts = { ngrokAuthToken: null }) {
        super();
        this.port = port;
        this.useNgrok = useNgrok;
        this.ngrokAuthToken = opts.ngrokAuthToken;
        this.app = express();
        this.server = null;
        if (this.useNgrok && !this.ngrokAuthToken) {
            console.error('ngrok authtoken is required when ngrok is enabled.');
        }
    }

    /**
     * Start the webhook server
     * @returns {any}
     * @memberof WebhookServer
     */
    async start() {
        this.app.use(express.json());
        this.server = this.app.listen(this.port, () => {
            console.log('\x1b[33m%s\x1b[0m', `Webhook server listening on port [${this.port}]`);
        });

        if (this.useNgrok) {
            try {
                await ngrok.authtoken(this.ngrokAuthToken);
                const url = await ngrok.connect(this.port);
                console.log('\x1b[32m%s\x1b[0m', `Ngrok tunnel opened at ${url}`);
            } catch (error) {
                console.error('\x1b[31m%s\x1b[0m', 'Ngrok tunnel Failed, Check your Auth token!');
            }
        }

        this.app.post('/webhook', (req, res) => {
            this.emit('message', req.body);
            res.sendStatus(200);
        });

        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
    }

    /**
     * Add verification route
     * @param {any} callbackUrl
     * @param {any} verificationToken
     * @returns {any}
     * @memberof WebhookServer
     */
    Verification(callbackUrl, verificationToken) {
        this.app.get(callbackUrl, (req, res) => {
            const token = req.query['hub.verify_token'];
            const challenge = req.query['hub.challenge'];

            if (token === verificationToken) {
                this.emit('verification', 'Webhook verified');
                res.status(200).send(challenge);
            } else {
                res.sendStatus(403);
            }
        });
    }

    /**
     * Stop the webhook server
     * @returns {any}
     * @memberof WebhookServer
     */
    stop() {
        if (this.server) {
            this.server.close(() => {
                console.error('\x1b[31m%s\x1b[0m', 'Webhook server stopped');
            });
        }
        if (this.useNgrok) {
            ngrok.disconnect();
            console.log('\x1b[31m%s\x1b[0m', 'Ngrok tunnel closed');
        }
    }
}

module.exports = WebhookServer;
