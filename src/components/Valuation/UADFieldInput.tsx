import React from 'react';
import { UADSaleType, UADFinancing, UADLocation, UADView, UADCondition } from '../../types/uad';

interface UADFieldInputProps {
  label: string;
  type: 'saleType' | 'financing' | 'location' | 'view' | 'condition' | 'number';
  value: any;
  onChange: (value: any) => void;
  className?: string;
}

export function UADFieldInput({ label, type, value, onChange, className = '' }: UADFieldInputProps) {
  const renderInput = () => {
    switch (type) {
      case 'saleType':
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Sale Type</option>
            <option value="ArmLth">Arms Length Sale</option>
            <option value="REO">REO Sale</option>
            <option value="Short">Short Sale</option>
            <option value="CrtOrd">Court Ordered Sale</option>
            <option value="Estate">Estate Sale</option>
            <option value="Relo">Relocation Sale</option>
            <option value="NonArm">Non-Arms Length Sale</option>
          </select>
        );

      case 'financing':
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Financing</option>
            <option value="FHA">FHA</option>
            <option value="VA">VA</option>
            <option value="Conv">Conventional</option>
            <option value="Cash">Cash</option>
            <option value="Seller">Seller</option>
            <option value="RH">USDA Rural Housing</option>
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        );
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {renderInput()}
    </div>
  );
}