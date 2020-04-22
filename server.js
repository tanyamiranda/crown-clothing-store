const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors()); // CORS = Cross Origin Request Service

if (process.env.NODE_ENV === 'production') {
    app.use(compression());
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build','index.html'));
    })
}

console.log('Setting up Listener...');

app.listen(port, error => {
    if(error) throw error;
    console.log('Server started. Listening on port: ' + port);
});

console.log('Setting up Service Worker...');

// Redirect requests to the actual file.
// Only required here because we are running server & client inside one app
app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build','service-worker.js'));
})

console.log('Setting up Stripe Payment Route...')

// Setup Stripe Payment Route
app.post('/payment', (req, res) => {

    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'  // this can be passed in aswell
        
    }

    console.log('Processing Payment...');

    stripe.charges.create(body, (stripeErr, stripeRes) => {

        if (stripeErr) {
            console.log("Payment Processing Error.");
            res.status(500).send({ error: stripeErr});
        }
        else {
            console.log("Payment Processing Successful.");
            res.status(200).send({ success: stripeRes});
        }
    });

});
