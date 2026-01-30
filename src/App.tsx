import { BackgroundScreen } from './components/BackgroundScreen';

function LeftArrow() {
  return (
    <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7L7 1M1 7L7 13M1 7H22" stroke="#0c0e10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RightArrow() {
  return (
    <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 7L16 1M22 7L16 13M22 7H1" stroke="#0c0e10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Card({ question }: { question: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg p-8 w-full max-w-[262px] min-h-[374px]"
      style={{
        background: 'rgba(255, 255, 255, 0.5)',
        boxShadow: '0px 0px 13px 0px white',
      }}
    >
      <p
        className="text-center text-black text-xl"
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          lineHeight: '30.554px',
        }}
      >
        {question}
      </p>
    </div>
  );
}

function YesNoButtons() {
  return (
    <div className="flex items-end justify-between w-full px-3 mt-6">
      <button className="flex flex-col items-center gap-0.5 group cursor-pointer bg-transparent border-none">
        <div className="-scale-y-100 rotate-180">
          <LeftArrow />
        </div>
        <span
          className="text-[#0c0e10] text-[35px]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            textShadow: '0px 0px 9px rgba(255, 255, 255, 0.5)',
            transform: 'rotate(-7.45deg)',
            display: 'inline-block',
          }}
        >
          No
        </span>
      </button>

      <button className="flex flex-col items-center gap-0.5 group cursor-pointer bg-transparent border-none">
        <div>
          <RightArrow />
        </div>
        <span
          className="text-[#0c0e10] text-[35px]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            textShadow: '0px 0px 9px rgba(255, 255, 255, 0.5)',
            transform: 'rotate(14.24deg)',
            display: 'inline-block',
          }}
        >
          Yes
        </span>
      </button>
    </div>
  );
}

function OptionButton({ label }: { label: string }) {
  return (
    <button
      className="flex items-center justify-center w-full max-w-[334px] h-[44px] border border-[#0c0e10] cursor-pointer bg-transparent"
      style={{
        fontFamily: "'Instrument Serif', serif",
        fontStyle: 'italic',
        textShadow: '0px 0px 9px rgba(255, 255, 255, 0.5)',
      }}
    >
      <span className="text-[#0c0e10] text-xl">{label}</span>
    </button>
  );
}

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <BackgroundScreen />

      <div className="relative z-10 flex flex-col items-center w-full h-full px-6 pt-[120px] pb-10">
        <Card question="Is it a specific event or time period through out history?" />

        <YesNoButtons />

        <div className="flex flex-col items-center gap-[16px] mt-auto w-full">
          <OptionButton label="Sometimes" />
          <OptionButton label="Unsure" />
        </div>
      </div>
    </div>
  );
}

export default App;
