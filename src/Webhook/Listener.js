const express = require('express');
const ngrok = require('ngrok');
const EventEmitter = require('events');

/**
 *  Class WebhookServer
 * @param {any} port (required)
 * @param {any} useNgrok (optional)
 * @param {any} ngrokAuthToken (optional)
 * @returns {any}
 */
class WebhookServer extends EventEmitter {
    constructor(port, useNgrok, opts ={ ngrokAuthToken: null }) {
        super();
        this.port = port;
        this.useNgrok = useNgrok;
        this.ngrokAuthToken = opts.ngrokAuthToken;
        this.app = express();
        this.server = null;

        if (this.useNgrok && !this.ngrokAuthToken) {
            return 'ngrok authtoken is required when ngrok is enabled.';
        }
    }

    /**
     * Start the webhook server
     * @returns {any}
     */
    async start() {
        this.app.use(express.json()); // Add this line to use the JSON middleware

        this.server = this.app.listen(this.port, () => {
            console.log(`Webhook server listening on port ${this.port}`);
        });

        if (this.useNgrok) {
            await ngrok.authtoken(this.ngrokAuthToken);
            const url = await ngrok.connect(this.port);
            console.log(`Ngrok tunnel opened at ${url}`);
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
     */
    Verification(callbackUrl, verificationToken) {
        this.app.get(callbackUrl, (req, res) => {
          const token = req.query['hub.verify_token'];
          const challenge = req.query['hub.challenge'];
    
          if (token === verificationToken) {
            res.status(200).send(challenge);
          } else {
            res.sendStatus(403);
          }
        });
      }

    stop() {
        if (this.server) {
            this.server.close(() => {
                console.log('Webhook server stopped');
            });
        }
        if (this.useNgrok) {
            ngrok.disconnect();
            console.log('Ngrok tunnel closed');
        }
    }
}

module.exports = WebhookServer;
