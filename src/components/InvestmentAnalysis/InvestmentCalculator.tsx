import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, TrendingUp } from 'lucide-react';

interface CalculatorInputs {
  purchasePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent: number;
  propertyTax: number;
  insurance: number;
  maintenance: number;
  vacancy: number;
}

export function InvestmentCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    purchasePrice: 400000,
    downPayment: 20,
    interestRate: 4.5,
    loanTerm: 30,
    monthlyRent: 2500,
    propertyTax: 1.2,
    insurance: 1200,
    maintenance: 2400,
    vacancy: 5
  });

  const calculateMortgage = () => {
    const principal = inputs.purchasePrice * (1 - inputs.downPayment / 100);
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numberOfPayments = inputs.loanTerm * 12;
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment;
  };

  const calculateROI = () => {
    const monthlyMortgage = calculateMortgage();
    const annualRent = inputs.monthlyRent * 12;
    const annualTax = inputs.purchasePrice * (inputs.propertyTax / 100);
    const annualExpenses = annualTax + inputs.insurance + inputs.maintenance;
    const vacancyLoss = annualRent * (inputs.vacancy / 100);
    
    const annualCashFlow = annualRent - (monthlyMortgage * 12) - annualExpenses - vacancyLoss;
    const initialInvestment = inputs.purchasePrice * (inputs.downPayment / 100);
    
    return (annualCashFlow / initialInvestment) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Calculator className="h-6 w-6 text-indigo-600 mr-2" />
        Investment Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Purchase Price</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                value={inputs.purchasePrice}
                onChange={(e) => setInputs({ ...inputs, purchasePrice: Number(e.target.value) })}
                className="pl-8 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Down Payment (%)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Percent className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                value={inputs.downPayment}
                onChange={(e) => setInputs({ ...inputs, downPayment: Number(e.target.value) })}
                className="pl-8 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Rent</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                value={inputs.monthlyRent}
                onChange={(e) => setInputs({ ...inputs, monthlyRent: Number(e.target.value) })}
                className="pl-8 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-medium mb-4">Investment Summary</h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Monthly Mortgage Payment</p>
              <p className="text-xl font-semibold text-gray-900">
                ${calculateMortgage().toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimated ROI</p>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                <p className="text-xl font-semibold text-green-600">
                  {calculateROI().toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}