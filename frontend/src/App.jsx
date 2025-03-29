import { useState } from "react";
import { assets } from "./assets/assets";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });

  const calculateAge = () => {
    if (!day || !month || !year) return;

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    if (birthDate > today) {
      setAge({ years: "--", months: "--", days: "--" });
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for -ve days
    if (days < 0) {
      const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += prevMonthDays;
      months--;
    }

    // Adjust for -ve months
    if (months < 0) {
      months += 12;
      years--;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f0f0] p-4">
      <div className="flex w-full max-w-xl flex-col gap-12 rounded-[15px] rounded-br-[120px] p-6 bg-white shadow-md md:p-12">
        
        {/* Input Fields */}
        <div className="flex w-full justify-between gap-4">
          <div className="flex flex-col w-full max-w-[110px]">
            <label className="font-bold text-gray-500">DAY</label>
            <input
              type="number"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="h-14 w-full rounded-lg bg-gray-200 px-3 text-lg font-bold outline-none focus:border focus:border-gray-400 transition-all"
            />
          </div>

          <div className="flex flex-col w-full max-w-[110px]">
            <label className="font-bold text-gray-500">MONTH</label>
            <input
              type="number"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="h-14 w-full rounded-lg bg-gray-200 px-3 text-lg font-bold outline-none focus:border focus:border-gray-400 transition-all"
            />
          </div>

          <div className="flex flex-col w-full max-w-[130px]">
            <label className="font-bold text-gray-500">YEAR</label>
            <input
              type="number"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="h-14 w-full rounded-lg bg-gray-200 px-3 text-lg font-bold outline-none focus:border focus:border-gray-400 transition-all"
            />
          </div>
        </div>

        {/* Button */}
        <div className="relative flex items-center w-full">
          <div className="bg-gray-300 h-[2px] flex-grow"></div>
          <button
            onClick={calculateAge}
            className="absolute right-0 bg-[#854dff] p-5 rounded-full hover:bg-[#6d3ed8] transition-all md:p-6 md:static md:self-end"
          >
            <img src={assets.icon_arrow} alt="arrow" className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>

        {/* Age Display */}
        <div className="flex flex-col text-left">
          <p className="text-5xl font-extrabold italic text-[#141414] md:text-6xl">
            <span className="text-[#854dff]">{age.years}</span> years
          </p>
          <p className="text-5xl font-extrabold italic text-[#141414] md:text-6xl">
            <span className="text-[#854dff]">{age.months}</span> months
          </p>
          <p className="text-5xl font-extrabold italic text-[#141414] md:text-6xl">
            <span className="text-[#854dff]">{age.days}</span> days
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
