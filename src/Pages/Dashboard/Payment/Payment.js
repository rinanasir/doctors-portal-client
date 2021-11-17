import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51JwSxaKw2nSyyFxtBZqWVjy3CsL5RcL4DypcNRea63sRnlZgNp3HcCLDrK2VkDMIc7JkwXM47dUx7PjHZtyG4fmV00Wr4oC0t8');

const Payment = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        fetch(`https://obscure-retreat-51639.herokuapp.com/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    }, [appointmentId])

    return (
        <div>
            <h2 style={{ color: '#5CE7ED' }}>{appointment.patientName}, Please pay for {appointment.serviceName}</h2>
            <h4 style={{ color: 'red' }}>Pay: ${appointment.price}</h4>
            {appointment?.price && <Elements stripe={stripePromise}>
                <CheckoutForm
                    appointment={appointment}
                />
            </Elements>}
        </div>
    );
};

export default Payment;

/*
1. Install stripe and stripe-react
2. Set publishable key
3. Elements
4. Chekout Form
--------------------------------------
5. Create payment method
6. Server create payment Intent api
7. Load client secret
8. ConfirmCard payment
9. Handle user error
*/