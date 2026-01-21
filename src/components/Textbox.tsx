import { useState, useRef, useEffect } from 'react';

interface TextboxProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const imgPaperPlaneTilt = "http://localhost:3845/assets/615239b11cc41278b1beb08c0172cc4baf017f99.svg";
const img = "http://localhost:3845/assets/95f58799f11584bdcd6a0bc420a98bbfeec4786f.svg";
const img1 = "http://localhost:3845/assets/2b8813480f2070b76707b61b55713d59a209609f.svg";

export const Textbox = ({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = '',
  className = '',
  disabled = false
}: TextboxProps) => {
  const [internalValue, setInternalValue] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSubmit?.(value);
      if (!isControlled) {
        setInternalValue('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`h-[56px] relative w-[343px] ${className}`} data-name="textbox">
      {/* White glow effect */}
      <div 
        className="absolute bg-[#d9d9d9] inset-[8.93%_1.17%] shadow-[0px_0px_18px_12px_rgba(255,255,255,0.25)] opacity-50"
        data-name="input-box-glow"
      />
      
      {/* Main input box */}
      <div 
        className="absolute bg-[#33335c] border-2 border-[#8a8aa7] border-solid inset-0 rounded-[8px] flex items-center"
        data-name="input-box"
      >
        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-white text-[18px] font-['Inter',sans-serif] placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        />
        
        {/* Cursor indicator (shown when input is focused and empty) */}
        {!value && showCursor && inputRef.current === document.activeElement && (
          <p 
            className="absolute left-4 text-[18px] text-white pointer-events-none"
            data-name="cursor"
          >
            |
          </p>
        )}
      </div>

      {/* Send button */}
      <button
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        className="absolute bg-[#33335c] border-2 border-[#8a8aa7] border-solid border-l-0 content-stretch flex inset-[0_0_0_83.67%] items-center justify-center p-[12px] rounded-br-[8px] rounded-tr-[8px] hover:bg-[#3d3d6c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#33335c]"
        data-name="icon-btn"
        type="button"
      >
        <div className="relative shrink-0 size-[32px]" data-name="PaperPlaneTilt">
          <img 
            alt="Send" 
            className="block max-w-none size-full" 
            src={imgPaperPlaneTilt}
            draggable={false}
          />
          <div className="absolute inset-[37.5%_37.5%_42.19%_42.19%]" data-name="Vector">
            <div className="absolute inset-[-15.38%]">
              <img 
                alt="" 
                className="block max-w-none size-full" 
                src={img}
                draggable={false}
              />
            </div>
          </div>
          <div className="absolute inset-[12.5%_12.5%_6.25%_6.25%]" data-name="Vector">
            <div className="absolute inset-[-3.85%]">
              <img 
                alt="" 
                className="block max-w-none size-full" 
                src={img1}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
