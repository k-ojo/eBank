
import { useState, useEffect } from "react";

const CurrencyTicker = () => {
  const [rates, setRates] = useState({
    USD: 1.00, // USD is base currency (1.00)
    EUR: 0.85, // EUR rate against USD
    GBP: 0.75, // GBP rate against USD
    CAD: 1.28, // CAD rate against USD
  });

  // Simulate small random changes to make it look active
  useEffect(() => {
    const interval = setInterval(() => {
      setRates(prev => ({
        USD: 1.00, // Always 1.00 as it's the base currency
        EUR: +(prev.EUR + (Math.random() * 0.02 - 0.01)).toFixed(2),
        GBP: +(prev.GBP + (Math.random() * 0.02 - 0.01)).toFixed(2),
        CAD: +(prev.CAD + (Math.random() * 0.02 - 0.01)).toFixed(2),
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-bank-dark text-white overflow-hidden py-2">
      <div className="ticker-container relative">
        <div className="flex space-x-8 animate-ticker whitespace-nowrap">
          <span>USD: 1 = USD {rates.USD.toFixed(2)}</span>
          <span>EUR: 1 = USD {(1/rates.EUR).toFixed(2)}</span>
          <span>GBP: 1 = USD {(1/rates.GBP).toFixed(2)}</span>
          <span>CAD: 1 = USD {(1/rates.CAD).toFixed(2)}</span>
          <span>USD: 1 = USD {rates.USD.toFixed(2)}</span>
          <span>EUR: 1 = USD {(1/rates.EUR).toFixed(2)}</span>
          <span>GBP: 1 = USD {(1/rates.GBP).toFixed(2)}</span>
          <span>CAD: 1 = USD {(1/rates.CAD).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyTicker;
