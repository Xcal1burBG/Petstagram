exports.paymentMethods = function(currentPaymentMethod) {

    const paymentMethods = [
        { key: 'crypto-wallet', label: 'Crypto Wallet', selected: false },
        { key: 'credit-card', label: 'Credit Card', selected: false },
        { key: 'debit-card', label: 'Debit Card', selected: false },
        { key: 'paypal', label: 'Paypal', selected: false },

    ];

    const result = paymentMethods.map(x => x.key === currentPaymentMethod ? { ...x, selected: true } : x );
    return result;
};

