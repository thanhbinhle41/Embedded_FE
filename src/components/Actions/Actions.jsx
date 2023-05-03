import React from "react";
import styles from "./Actions.module.scss";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function Actions() {
  const onChangeTimePicker = (time, timeString) => {
    console.log(time, timeString);
  };

  const onChangeDatePicker = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="d-flex align-items-center form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="led"
          />
          <label
            className={`${styles.label} form-check-label ms-2 user-select-none`}
            role="button"
            htmlFor="led"
          >
            Toggle Led
          </label>
          <i
            className="fa-regular fa-lightbulb ms-2 font"
            style={{ fontSize: "20px" }}
          ></i>
        </div>
        <div className="d-flex align-items-center form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="pumb"
          />
          <label
            className={`${styles.label} form-check-label ms-2 user-select-none`}
            role="button"
            htmlFor="pumb"
          >
            Toggle Pump
          </label>
          <i
            className="fa-solid fa-shower ms-2"
            style={{ fontSize: "20px" }}
          ></i>
        </div>
        <div className="d-flex align-items-center form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="door"
          />
          <label
            className={`${styles.label} form-check-label ms-2 user-select-none`}
            role="button"
            htmlFor="door"
          >
            Toggle Door
          </label>
          <i
            className="fa-solid fa-person-through-window ms-2"
            style={{ fontSize: "20px" }}
          ></i>
        </div>
      </div>
      <div className="mt-4 d-flex flex-row align-items-center justify-content-between">
        <div>
          <label className={`me-2 ${styles.label}`}>Date: </label>
          <DatePicker onChange={onChangeDatePicker} />
        </div>
        <div>
          <label className={`me-2 ${styles.label}`}>Start time: </label>
          <TimePicker
            onChange={onChangeTimePicker}
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            className="ms-2"
          />
        </div>
        <div>
          <label className={`me-2 ${styles.label}`}>End time: </label>
          <TimePicker
            onChange={onChangeTimePicker}
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            className="ms-2"
          />
        </div>
        <button type="button" className="btn btn-secondary ms-2">
          Set time
        </button>
      </div>
    </div>
  );
}

export default Actions;
