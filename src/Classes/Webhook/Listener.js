const express = require('express');
const ngrok = require('ngrok');
const EventEmitter = require('events');
const Banner = require('../../utils/Banner');
const WaSpinner =require('../../utils/Spinner')
const spinner = new WaSpinner();
/**
 *  Class WebhookServer
 * @param {any} port (required)
 * @param {any} useNgrok (optional)
 * @param {any} ngrokAuthToken (optional)
 * @returns {any}
 * @constructor
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
     * @memberof WebhookServer
     */
    async start() {
        this.app.use(express.json()); // Add this line to use the JSON middleware
        process.stdout.write("\u001b[1;32m"+Banner.SHOW+"\u001b[0m")
        this.server = this.app.listen(this.port, () => {
           spinner.add('listener', {text:`Webhook server listening on port [${this.port}]`,color:"yellow"});
        });

        if (this.useNgrok) {
            try {
            await ngrok.authtoken(this.ngrokAuthToken);
            const url = await ngrok.connect(this.port);
            spinner.add('ngrok', {text:`Ngrok tunnel opened at ${url}`,color:"greenBright"});
        } catch (error) {  
            spinner.add('ngrok', {text:`Ngrok tunnel Failed , Check your Auth token!`,color:"red"});
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
            this.emit('verification', "Webhook verified");
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
                spinner.fail('listener', {text:`Webhook server stopped`,color:"red"});
            });
        }
        if (this.useNgrok) {
            ngrok.disconnect();
            spinner.add('ngrok', {text:`Ngrok tunnel closed`,color:"red"});
        }
        
    }
}

module.exports = WebhookServer;
