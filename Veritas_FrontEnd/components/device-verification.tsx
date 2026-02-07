'use client';

import React from 'react';
import { Smartphone } from 'lucide-react';
import { OTPInput } from './otp-input';

export interface DeviceVerificationProps {
  otp: string;
  onOtpChange: (value: string) => void;
  onVerify: () => void;
  onResend: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function DeviceVerification({
  otp,
  onOtpChange,
  onVerify,
  onResend,
  loading,
  disabled,
}: DeviceVerificationProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Smartphone className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-black mb-2">Device Verification Required</h2>
        <p className="text-gray-600">
          Enter the verification code sent to your university email to authorize this device.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-4">Enter 6-digit Code</label>
        <OTPInput value={otp} onChange={onOtpChange} disabled={disabled || loading} />
      </div>

      <button
        onClick={onVerify}
        disabled={otp.length !== 6 || loading || disabled}
        className="w-full bg-black text-white rounded-full px-4 py-2 font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Verifying Device...' : 'Verify Device'}
      </button>

      <button
        onClick={onResend}
        disabled={loading || disabled}
        className="w-full text-black text-sm hover:text-gray-600 transition disabled:opacity-50"
      >
        Didn't receive code? Resend
      </button>
    </div>
  );
}
