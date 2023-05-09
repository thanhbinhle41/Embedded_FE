import { DatePicker, TimePicker } from "antd";
import styles from "./Actions.module.scss";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const Timer = ({ device, onSetTimeToSend, status }) => {
  const [dateString, setDateString] = useState("");
  const [startTimeString, setStartTimeString] = useState("");
  const [endTimeString, setEndTimeString] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [isSet, setIsSet] = useState(false);

  const onChangeStartTime = (_, timeString) => {
    setStartTimeString(timeString);
  };

  const onChangeEndTime = (_, timeString) => {
    setEndTimeString(timeString);
  };

  const onChangeDatePicker = (_, dateString) => {
    setDateString(dateString);
  };

  const onClickSetTime = () => {
    const dateParts = dateString.split("-");
    const startTimeParts = startTimeString.split(":");
    const endTimeParts = endTimeString.split(":");

    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // month is zero-indexed
    const day = parseInt(dateParts[2], 10);
    const startHour = parseInt(startTimeParts[0], 10);
    const startMinute = parseInt(startTimeParts[1], 10);
    const startSecond = parseInt(startTimeParts[2], 10);
    const endHour = parseInt(endTimeParts[0], 10);
    const endMinute = parseInt(endTimeParts[1], 10);
    const endSecond = parseInt(endTimeParts[2], 10);

  
    const newStartDate = new Date(year, month, day, startHour, startMinute, startSecond)
    const newEndDate = new Date(year, month, day, endHour, endMinute, endSecond)

    setStartDate(
      new Date(year, month, day, startHour, startMinute, startSecond)
    );
    setEndDate(new Date(year, month, day, endHour, endMinute, endSecond));
    console.log(newStartDate, newEndDate);
    setIsSet(false)
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (startDate === null || endDate === null || isSet === null) 
      return  
    if (currentTime >= startDate && isSet === false) {
      console.log("start time");
      setIsSet(true)
      onSetTimeToSend(device, status)
    } else if (currentTime >= endDate && isSet === true) {
      console.log("end time");
      setIsSet(null);
      onSetTimeToSend(device, status)
    }
  }, [currentTime, startDate, endDate, device, status, onSetTimeToSend, isSet]);


  return (
    <div className="d-flex flex-column align-items-start justify-content-start">
      <div className="mt-4">
        <label className={`me-2 ${styles.label}`} style={{ width: "150px" }}>
          Date:{" "}
        </label>
        <DatePicker onChange={onChangeDatePicker} />
      </div>
      <div className="mt-3">
        <label className={`me-2 ${styles.label}`} style={{ width: "150px" }}>
          Start time:{" "}
        </label>
        <TimePicker
          onChange={onChangeStartTime}
          defaultValue={dayjs("00:00:00", "HH:mm:ss")}
          style={{ width: "149px" }}
        />
      </div>
      <div className="mt-3">
        <label className={`me-2 ${styles.label}`} style={{ width: "150px" }}>
          End time:{" "}
        </label>
        <TimePicker
          onChange={onChangeEndTime}
          defaultValue={dayjs("00:00:00", "HH:mm:ss")}
          style={{ width: "149px" }}
        />
      </div>
      <div className="d-flex justify-content-center w-100  mt-4">
        <button
          onClick={onClickSetTime}
          type="button"
          className="btn btn-secondary"
        >
          Set time
        </button>
      </div>
    </div>
  );
};
