'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

type ExchangeRates = {
    [key: string]: number
}

const Converter = () => {
    const [amount, setAmount] = useState(1);
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('EUR');
    const [rates, setRates] = useState<ExchangeRates>({});
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get(
                    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
                );
                setRates(response.data.conversion_rates);
                setError('');
            } catch (err) {
                setError('Failed to fetch exchange rates:' + err);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, [baseCurrency, API_KEY]);

    const handleConvert = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const rate = rates[targetCurrency];
        setConvertedAmount(Number((Number(amount) * rate).toFixed(2)));
        window.gtag('event', 'currency_conversion', {
            from_currency: baseCurrency,
            to_currency: targetCurrency,
            amount: amount,
            converted_amount: convertedAmount
        });
    };

    const handleOnclick = () => {
        setBaseCurrency(targetCurrency)
        setTargetCurrency(baseCurrency)
        setConvertedAmount(0)
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-md mx-auto p-6 text-black bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleConvert}>
                <div className="mb-4">
                    <label className="block mb-2">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full p-2 border rounded"
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block mb-2">From</label>
                        <select
                            value={baseCurrency}
                            onChange={(e) => setBaseCurrency(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            {Object.keys(rates).map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div onClick={handleOnclick} className='flex justify-center items-center py-10 px-2'>
                        <ArrowPathIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2">To</label>
                        <select
                            value={targetCurrency}
                            onChange={(e) => setTargetCurrency(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            {Object.keys(rates).map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
                >
                    <ArrowPathIcon className="h-5 w-5" />
                    Convert
                </button>
            </form>

            {convertedAmount > 0 && (
                <div className="mt-4 text-xl font-semibold">
                    {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
                </div>
            )}
        </div>
    );
};

export default Converter;