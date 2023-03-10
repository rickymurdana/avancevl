import { useCallback, useState } from "react";
import checked from "../assets/checked.png";
import unchecked from "../assets/unchecked.png";
import left from "../assets/left.png";
import right from "../assets/right.png";
import dayjs from "dayjs";
import { generateDate, generateYear, months } from "../utils/calendar";
import cn from "../utils/cn";

function ExamCompOne() {
  const [pass, setPass] = useState('');
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [length, setLength] = useState(false);
  const [date, setDate] = useState('');
  const [calendar, setCalendar] = useState(false);

  const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPass(newPassword);
    setUppercase(/[A-Z]/.test(newPassword));
    setLowercase(/[a-z]/.test(newPassword));
    setNumber(/\d/.test(newPassword));
    setSpecial(/[^a-zA-Z\d]/.test(newPassword));
    setLength(newPassword.length > 8 ? true : false);
  }

  function DatePicker() {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const currentDate = dayjs();
    const currentYear = dayjs().year();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
    const [selectYear, setSelectYear] = useState(false);
    const [years, setYears] = useState(currentYear);
  
    // const handleCancel = useCallback(() => {
    //   setCalendar(false)
    // }, [])
  
    // const handleOk = useCallback(() => {
    //   setCalendar(false);
    //   setDate(selectDate);
    // }, [])
  
    return (
      <div className="grid p-2 w-full rounded-md bg-[#242424] mt-2 gap-y-2">
        <span>Text</span>
        <span className="text-2xl font-bold">{months[today.month()]}, {today.year()}</span>
        { selectYear ?
          <>
            <div className="flex justify-between">
              <div className="w-2 h-2 m-2" 
                onClick={() => {
                  setToday(today.year(today.year() - 1));
              }}>
                <img src={left} alt="left" />
              </div>
              <span className="font-medium" onClick={() => setSelectYear(false) }>{today.year()}</span>
              <div className="w-2 h-2 m-2"
              onClick={() => {
                setToday(today.year(today.year() + 1));
              }}>
                <img src={right} alt="right" />
              </div>
            </div>
            <div className="grid grid-cols-4">
              {generateYear(today.year()).map(
                ({ year, currentYear }, index) => {
                  return (
                    <div
                      key={index}
                      className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                    >
                      <h1
                        className={cn(
                          currentYear
                            ? "border rounded-full border-blue-500 text-white"
                            : "",
                          years ===
                            year
                            ? "bg-blue-500 text-white"
                            : "text-white",
                          "h-10 w-10 rounded-full grid place-content-center hover:bg-white hover:text-black transition-all cursor-pointer select-none"
                        )}
                        onClick={() => {
                          setYears(year);
                        }}
                      >
                        {year}
                      </h1>
                    </div>
                  );
                }
              )}
            </div> 
          </> 
          : 
          <>
            <div className="flex justify-between">
              <div className="w-2 h-2 m-2" 
                onClick={() => {
                  setToday(today.month(today.month() - 1));
              }}>
                <img src={left} alt="left" />
              </div>
              <span className="font-medium" onClick={() => setSelectYear(true) }>{months[today.month()]}, {today.year()}</span>
              <div className="w-2 h-2 m-2"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}>
                <img src={right} alt="right" />
              </div>
            </div>
            <div className="grid grid-cols-7">
              {days.map((day, index) => {
                return (
                  <h1
                    key={index}
                    className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
                  >
                    {day}
                  </h1>
                );
              })}
            </div>
            <div className="grid grid-cols-7">
              {generateDate(today.month(), today.year()).map(
                ({ date, currentMonth, today }, index) => {
                  return (
                    <div
                      key={index}
                      className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                    >
                      <h1
                        className={cn(
                          currentMonth ? "" : "text-gray-700",
                          today
                            ? "border rounded-full border-blue-500 text-white"
                            : "",
                          selectDate
                            .toDate()
                            .toDateString() ===
                            date.toDate().toDateString()
                            ? "bg-blue-500 text-white"
                            : "text-white",
                          "h-10 w-10 rounded-full grid place-content-center hover:bg-white hover:text-black transition-all cursor-pointer select-none"
                        )}
                        onClick={() => {
                          setSelectDate(date);
                        }}
                      >
                        {date.date()}
                      </h1>
                    </div>
                  );
                }
              )}
            </div>
          </>
        }
        <div className="flex w-1/3 justify-between ml-auto mr-2 p-4">
            <button className="text-sm text-white font-medium" onClick={() => setCalendar(false)}>Cancel</button>
            <button className="text-sm text-white font-medium" onClick={() => { setCalendar(false); setDate(dayjs(selectDate).format('DD/MM/YYYY')) }}>OK</button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="pt-28 flex items-center justify-center">
      <form className="w-1/2">
        <div className="relative mb-2">
          <label className="block absolute left-2 bg-zinc-900 px-1">Name</label>
          <input type="text" placeholder="Name" className="w-full px-2 py-2 mt-2 placeholder:text-sm bg-zinc-900 border-2 rounded-md border-white/50 hover:border-white focus:outline-none focus:border-blue-500"></input>
        </div>
        <div className="relative mb-2">
          <label className="block absolute left-2 bg-zinc-900 px-1">Birth of date</label>
          <input type="text" placeholder="mm/dd/yyyy" value={date} onClick={() => setCalendar(true)} className="w-full px-2 py-2 mt-2 placeholder:text-sm bg-zinc-900 border-2 rounded-md border-white/50 hover:border-white focus:outline-none focus:border-blue-500"></input>
          {calendar && <DatePicker />}
        </div>
        <div className="relative mb-2">
          <label className="block absolute left-2 bg-zinc-900 px-1">Username</label>
          <input type="text" placeholder="Username" className="w-full px-2 py-2 mt-2 placeholder:text-sm bg-zinc-900 bg-zinc-900 border-2 rounded-md border-white/50 hover:border-white focus:outline-none focus:border-blue-500"></input>
        </div>
        <div className="relative mb-2">
          <label className="block absolute left-2 bg-zinc-900 px-1">Password</label>
          <input type="password" placeholder="Password" value={pass} onChange={handlePassChange} className="w-full px-2 py-2 mt-2 placeholder:text-sm bg-zinc-900 border-2 rounded-md border-white/50 hover:border-white focus:outline-none focus:border-blue-500"></input>
          { pass && <div className="w-full rounded-md px-1 py-2 bg-[#242424] mt-2">
            <div className="flex p-1">
              <div className="mr-2 text-sm">{uppercase ? <img src={checked} alt="checked" /> : <img src={unchecked} alt="unchecked" />}</div>
              <span className="text-sm">Have at least one uppercase letter</span>
            </div>
            <div className="flex p-1">
              <div className="mr-2 text-sm">{lowercase ? <img src={checked} alt="checked" /> : <img src={unchecked} alt="unchecked" /> }</div>
              <span className="text-sm">Have at least one lowercase letter</span>
            </div>
            <div className="flex p-1">
              <div className="mr-2 text-sm">{number ? <img src={checked} alt="checked" /> : <img src={unchecked} alt="unchecked" /> }</div>
              <span className="text-sm">Have at least one number</span>
            </div>
            <div className="flex p-1">
              <div className="mr-2 text-sm">{special ? <img src={checked} alt="checked" /> : <img src={unchecked} alt="unchecked" /> }</div>
              <span className="text-sm">Have at least one special character (!@#$...etc)</span>
            </div>
            <div className="flex p-1">
              <div className="mr-2 text-sm">{length ? <img src={checked} alt="checked" /> : <img src={unchecked} alt="unchecked" /> }</div>
              <span className="text-sm">Longer than 8 character</span>
            </div>
          </div>}
        </div>
        <div className="relative mb-2">
          <button className="w-full px-2 py-2 rounded-md bg-blue-500 text-white" onClick={() => alert('Berhasil')}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default ExamCompOne;
