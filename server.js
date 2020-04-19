const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const path = require('path');

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
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build','index.html'));
    })
}

console.log('Setting up Listener...')

app.listen(port, error => {
    if(error) throw error;
    console.log('Server started. Listening on port: ' + port);
});

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

//setup success redirect
app.use((req, res, next) => {
    req.user = { id: 'asdfasdfasdfasdf' };
    next();
  });