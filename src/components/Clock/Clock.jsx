import React, { useEffect, useState } from "react";
import styles from "./Clock.module.scss";

function Clock() {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [clockState, setClockState] = useState(new Date().toLocaleTimeString().split(" ")[0]);

	const [day, setDay] = useState("");
	const [date, setDate] = useState("");

  const [amPM, setAmPm] = useState(new Date().toLocaleTimeString().split(" ")[1]);

  useEffect(() => {
    const d = new Date();
		setDate(d.toLocaleDateString())
		setDay(weekday[d.getDay()])

    const setTimeFunc = setInterval(() => {
			const d2 = new Date();
      const dateStr = d2.toLocaleTimeString().split(" ");
      setAmPm(dateStr[1]);
      setClockState(dateStr[0]);
    }, 1000);
    return () => {
      clearInterval(setTimeFunc);
    };
  }, [weekday]);

  return (
    <div className={styles.container}>
      <div className="d-flex flex-row align-items-center">
        <span className={styles.time}>{clockState}</span>
        <span className={styles.ampm}>{amPM}</span>
				<div className="d-flex flex-column ms-3 justify-content-center">
					<span className={styles.time}>{day.substring(0, 3)}</span>
					<span className={styles.ampm}>{date}</span>
				</div>
      </div>
    </div>
  );
}

export default Clock;
