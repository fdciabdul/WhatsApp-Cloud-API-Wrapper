const { Message, WAParser, WebhookServer } = require('./');

// Replace these values with your own credentials
const apiVersion = 'v16.0';
const phoneNumberId = '180841101787667';
const accessToken = 'EAALIUS8A2nsBO0H28Jgem4YVBgXZC59C3lyZCCO6mVE2AmZCuzNrp1ezmrV0nAKrY4JYJrvygYAHxlUmIPCvWISj0F8VwxsRjQiSMxLKgWTzU0AqPIQc9aCOeAaXnxlOm9guZCU2vhUb5xUpZCMdZAoYD8dOLtKZAKOweQh468Gmsi75DxksnhUbjUJdxX4U6r60STrudlTVZBr2RnC5gecZD';

// Create a Message instance
const message = new Message(apiVersion, phoneNumberId, accessToken);

// Send a text message
const recipientPhoneNumber = '6285162772731';
const messageContent = 'Hello from Whatsapp Cloud API Wrapper!';

// Create a WebhookServer instance
const port = 3000;
const useNgrok = true; // Set to true if you want to use ngrok
const ngrokAuthToken = '84dPm2QSQaqzrfGoJHMBn_2TnKgTwZ9WYKifyunAUMa'; // Add your ngrok auth token if you're using ngrok

const webhookServer = new WebhookServer(port, useNgrok, {
  ngrokAuthToken
});

// Add a listener for incoming messages
webhookServer.on('message', (data) => {
  console.log('Received message:', data);
  const parse = new WAParser(data);
  // parse message
  const parsedMessage = parse.parseMessage();
    console.log('Parsed message:', parsedMessage);
});

// Add a route for webhook verification
const callbackUrl = '/webhook';
const verificationToken = 'sa';
webhookServer.Verification(callbackUrl, verificationToken);

// Start the webhook server
webhookServer.start();
