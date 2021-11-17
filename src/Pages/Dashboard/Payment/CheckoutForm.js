import React, { useEffect, useState } from 'react';
import { Alert, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = ({ appointment }) => {
    const { _id, patientName, price } = appointment;
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [creditProcessing, setCreditProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('https://obscure-retreat-51639.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if there is no stripe or elements then don't go forward
        if (!stripe || !elements) {
            return;
        }
        // Get a reference to a mounted CardElement. Elements knows how to find your CardElement because there can only ever be one of each type of element.
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        // Use your card Element with other Stripe.js APIs
        setCreditProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
            setSuccess('');
        }
        else {
            setError('');
            // console.log(paymentMethod);
        }

        // Payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: user.email
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess('');
        }
        else {
            setError('');
            setSuccess('Your payment processed successfully');
            // console.log(paymentIntent);
            setCreditProcessing(false);
            // save to database
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_secret')[0]
            };
            const url = `https://obscure-retreat-51639.herokuapp.com/appointments/${_id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ payment })
            })
                .then(res => res.json())
                .then(data => console.log(data));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {creditProcessing ? <CircularProgress /> : <Button
                    type="submit" style={{ backgroundColor: '#5CE7ED', color: 'black' }} variant="contained" disabled={!stripe || success}
                >Pay ${price}</Button>}
            </form>
            {
                error && <Alert severity="error">{error}</Alert>
            }
            {
                success && <Alert severity="success">{success}</Alert>
            }
        </div>
    );
};

export default CheckoutForm;