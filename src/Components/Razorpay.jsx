import React, { useState } from 'react';

function Razorpay() {
    const [amount, setAmount] = useState('');

    const handlePayment = (e) => {
        e.preventDefault();

        if (amount === "") {
            alert("Please enter the amount");
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        var options = {
            key: "rzp_test_NWjWpUbPDPq9r2", 
            key_secret:"m0EOLQKczoedjxFdQHLsTyQH",
            amount: amount * 100, 
            currency: "INR",
            name: "TEXTILE_SHOP",
            description: "For testing purpose",
            handler: function (response) {
                alert(`Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name: "Madhan",
                email: "madhans28803@gmail.com",
                contact: "7667886627"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: '#F37254'
            }
        };

        var pay = new window.Razorpay(options);
        pay.open();
    };

    return (
        <div>
            <input
                type='text'
                placeholder='Enter the amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePayment}>Pay</button>
        </div>
    );
}

export default Razorpay;
