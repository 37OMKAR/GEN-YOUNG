import React, { useState } from 'react';
import { X, QrCode, Loader2, CheckCircle2 } from 'lucide-react';
import { useBanking } from '../../context/BankingContext';
import { useToast } from '../../context/ToastContext';
import { playPaymentSuccessChime } from '../../utils/soundEffects';

export interface UpiTransferModalProps {
  isOpen: boolean;
  initialMode?: 'send' | 'scan';
  onClose: () => void;
}

export const UpiTransferModal: React.FC<UpiTransferModalProps> = ({
  isOpen,
  initialMode = 'send',
  onClose,
}) => {
  const { account, executeUpiPayment } = useBanking();
  const { showToast } = useToast();

  const [mode, setMode] = useState<'send' | 'scan'>(initialMode);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState<'input' | 'pin' | 'processing' | 'success'>('input');
  const [txId, setTxId] = useState('');

  if (!isOpen) return null;

  const quickAmounts = [100, 200, 500, 1000];
  const sampleMerchants = [
    { name: 'Campus Canteen', vpa: 'canteen@okaxis', amount: 140, note: 'Tea & Snacks' },
    { name: 'University Bookstore', vpa: 'books@oksbi', amount: 450, note: 'Semester Notebooks' },
    { name: 'Metro Recharge', vpa: 'metro@paytm', amount: 200, note: 'Transit Pass' },
  ];

  const handleSelectMerchant = (m: (typeof sampleMerchants)[0]) => {
    setRecipient(m.vpa);
    setAmount(m.amount.toString());
    setNote(m.note);
    setStep('pin');
  };

  const handleProceedToPin = () => {
    const numAmount = Number(amount);
    if (!recipient.trim()) {
      showToast('Please enter a valid UPI ID or phone number', 'error');
      return;
    }
    if (!numAmount || numAmount <= 0) {
      showToast('Please enter an amount greater than ₹0', 'error');
      return;
    }
    if (numAmount > account.balance) {
      showToast(`Insufficient balance! Available: ₹${account.balance.toLocaleString('en-IN')}`, 'error');
      return;
    }
    if (account.virtualCard.isFrozen) {
      showToast('Card & payments are currently frozen. Unfreeze to proceed.', 'error');
      return;
    }
    if (numAmount > account.virtualCard.onlineLimit) {
      showToast(`Amount exceeds daily limit of ₹${account.virtualCard.onlineLimit.toLocaleString('en-IN')}`, 'error');
      return;
    }
    setStep('pin');
  };

  const handleConfirmPayment = async () => {
    if (pin.length !== 4) {
      showToast('Please enter your 4-digit UPI PIN (Demo: 1234)', 'error');
      return;
    }

    setStep('processing');

    const generatedTxId = `UPI${Date.now().toString().slice(-8)}`;
    setTxId(generatedTxId);

    const result = await executeUpiPayment({
      recipient,
      recipientUpiId: recipient,
      recipientName: recipient,
      amount: Number(amount),
      note: note || 'Transfer',
      txId: generatedTxId,
    });

    if (result.success) {
      playPaymentSuccessChime();
      setStep('success');
      showToast('Payment successful!', 'success');
    } else {
      setStep('input');
      showToast(result.errorMessage || 'Payment failed', 'error');
    }
  };

  const handleResetAndClose = () => {
    setStep('input');
    setRecipient('');
    setAmount('');
    setNote('');
    setPin('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="upi-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full shadow-2xl p-5 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white" id="upi-modal-title">
              Simulated UPI Transfer
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-mono border border-emerald-500/30">
              NPCI Fast
            </span>
          </div>
          <button onClick={handleResetAndClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* STEP 1: INPUT OR SCAN */}
        {step === 'input' && (
          <div className="mt-4 space-y-4">
            {/* Mode Switcher */}
            <div className="grid grid-cols-2 p-1 bg-slate-800 rounded-xl">
              <button
                onClick={() => setMode('send')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  mode === 'send' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-300'
                }`}
              >
                Enter UPI ID
              </button>
              <button
                onClick={() => setMode('scan')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  mode === 'scan' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-300'
                }`}
              >
                Scan QR Simulator
              </button>
            </div>

            {mode === 'send' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Recipient UPI ID or Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. friend@oksbi or 9876543210"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Amount (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 text-sm font-bold">₹</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-lg font-bold focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                  {/* Quick Chips */}
                  <div className="flex gap-1.5 mt-2">
                    {quickAmounts.map((q) => (
                      <button
                        key={q}
                        onClick={() => setAmount(q.toString())}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60 font-mono"
                      >
                        +₹{q}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Optional Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Canteen lunch"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  onClick={handleProceedToPin}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-sm transition-all mt-2"
                >
                  Proceed to Pay
                </button>
              </div>
            ) : (
              /* SCAN QR SIMULATOR */
              <div className="space-y-3">
                <div className="relative w-full h-44 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center overflow-hidden">
                  {/* Laser Scan Animation Line */}
                  <div className="absolute inset-x-4 top-2 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse" />
                  <QrCode size={64} className="text-slate-600 opacity-60" />
                  <span className="text-xs text-slate-400 mt-2 font-medium">
                    Tap a simulated merchant QR code below
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                    Available Merchant Presets:
                  </span>
                  {sampleMerchants.map((m, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectMerchant(m)}
                      className="w-full p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 flex items-center justify-between transition-colors text-left"
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">{m.name}</span>
                        <span className="text-[10px] text-slate-400">{m.note}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        ₹{m.amount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: PIN PAD */}
        {step === 'pin' && (
          <div className="mt-4 space-y-4 text-center">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <span className="text-xs text-slate-400 block">Paying</span>
              <span className="text-2xl font-extrabold text-white font-mono block mt-0.5">
                ₹{Number(amount).toFixed(2)}
              </span>
              <span className="text-xs text-emerald-400 font-medium block mt-1">To: {recipient}</span>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-2">
                Enter 4-Digit UPI PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                className="w-32 mx-auto text-center tracking-[1em] text-2xl font-bold py-2 bg-slate-800 border border-slate-700 rounded-xl text-emerald-400 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Demo Security PIN: <code className="text-emerald-400">1234</code>
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep('input')}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
              >
                Back
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 active:scale-95"
              >
                Authorize Payment
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PROCESSING */}
        {step === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <Loader2 size={36} className="text-emerald-400 animate-spin" />
            <span className="text-sm font-semibold text-white">Communicating with NPCI UPI...</span>
            <span className="text-xs text-slate-400">Zero surcharge guaranteed</span>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 'success' && (
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="text-lg font-bold text-white">Payment Successful!</h4>
            <div className="text-2xl font-mono font-extrabold text-emerald-400">
              ₹{Number(amount).toFixed(2)}
            </div>
            <p className="text-xs text-slate-300">
              Paid to <span className="font-semibold text-white">{recipient}</span>
            </p>
            <div className="text-[10px] text-slate-400 font-mono">
              Ref ID: {txId} • Simulated Instant Settlement
            </div>
            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 mt-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
