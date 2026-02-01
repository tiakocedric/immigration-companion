import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface PhoneInputProps {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneNumberChange: (phone: string) => void;
  required?: boolean;
  className?: string;
}

const countryCodes = [
  { code: '+1', country: 'CA/US', flag: '🇨🇦' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+237', country: 'CM', flag: '🇨🇲' },
  { code: '+225', country: 'CI', flag: '🇨🇮' },
  { code: '+221', country: 'SN', flag: '🇸🇳' },
  { code: '+32', country: 'BE', flag: '🇧🇪' },
  { code: '+41', country: 'CH', flag: '🇨🇭' },
  { code: '+212', country: 'MA', flag: '🇲🇦' },
  { code: '+213', country: 'DZ', flag: '🇩🇿' },
  { code: '+216', country: 'TN', flag: '🇹🇳' },
  { code: '+243', country: 'CD', flag: '🇨🇩' },
  { code: '+229', country: 'BJ', flag: '🇧🇯' },
  { code: '+228', country: 'TG', flag: '🇹🇬' },
  { code: '+226', country: 'BF', flag: '🇧🇫' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
];

export default function PhoneInput({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  required = false,
  className = '',
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCountry = countryCodes.find(c => c.code === countryCode) || countryCodes[0];

  const handlePhoneChange = (value: string) => {
    // Remove spaces and special characters, keep only digits
    const cleaned = value.replace(/[^\d]/g, '');
    onPhoneNumberChange(cleaned);
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-3 py-3.5 bg-background border border-border rounded-lg text-txt-primary hover:border-primary/50 transition-all min-w-[100px]"
        >
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-sm">{selectedCountry.code}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
        
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <div className="absolute top-full left-0 mt-1 w-48 bg-surface border border-border rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
              {countryCodes.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onCountryCodeChange(country.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-left ${
                    countryCode === country.code ? 'bg-primary/10 text-primary' : 'text-txt-primary'
                  }`}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm font-medium">{country.code}</span>
                  <span className="text-xs text-muted-foreground">{country.country}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => handlePhoneChange(e.target.value)}
        required={required}
        placeholder="677334686"
        className="flex-1 px-4 py-3.5 bg-background border border-border rounded-lg text-txt-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
      />
    </div>
  );
}
