import React, { useState } from "react";
import styles from "./Actions.module.scss";
import { Timer } from "./Timer";

function Actions({ onToggleDevice, onAutoDevice, setIsLed, isLed, isPumb, setIsPumb, onSetTimeToSend }) {
  const [isDoor, setIsDoor] = useState(true);

  const [auto, setAuto] = useState({
    led: false,
    pump: false,
  });

  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="d-flex flex-column border-right">
          <div className="d-flex align-items-center form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="led"
              checked={isLed}
              disabled={auto.led}
              onChange={(e) => {
                onToggleDevice("Light", e.target.checked);
                setIsLed(e.target.checked);
              }}
            />
            <label
              className={`${styles.label} form-check-label ms-2 user-select-none`}
              role="button"
              htmlFor="led"
            >
              Light
            </label>
            <i
              className="fa-regular fa-lightbulb ms-2 font"
              style={{ fontSize: "20px" }}
            ></i>
          </div>
          <div className="mt-2 d-flex align-items-center form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="led_auto"
              checked={auto.led}
              onChange={(e) => {
                onAutoDevice("Light", e.target.checked);
                setAuto({ ...auto, led: e.target.checked });
              }}
            />
            <label
              className={`${styles.label} form-check-label ms-2 user-select-none`}
              role="button"
              htmlFor="led_auto"
            >
              Auto control light
            </label>
          </div>
          <Timer device={"Light"} onSetTimeToSend={onSetTimeToSend} status={isLed}/>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="pumb"
              checked={isPumb}
              disabled={auto.pump}
              onChange={(e) => {
                onToggleDevice("Pump", e.target.checked);
                setIsPumb(e.target.checked);
              }}
            />
            <label
              className={`${styles.label} form-check-label ms-2 user-select-none`}
              role="button"
              htmlFor="pumb"
            >
              Pump
            </label>
            <i
              className="fa-solid fa-shower ms-2"
              style={{ fontSize: "20px" }}
            ></i>
          </div>
          <div className="mt-2 d-flex align-items-center form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="pumb_auto"
              checked={auto.pump}
              onChange={(e) => {
                setAuto({ ...auto, pump: e.target.checked });
                onAutoDevice("Pump", e.target.checked);
              }}
            />
            <label
              className={`${styles.label} form-check-label ms-2 user-select-none`}
              role="button"
              htmlFor="pumb_auto"
            >
              Auto control pumb
            </label>
          </div>
          <Timer device={"Pump"} onSetTimeToSend={onSetTimeToSend} status={isPumb}/>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="door"
              checked={isDoor}
              onChange={(e) => {
                onToggleDevice("Servo", e.target.checked);
                setIsDoor(e.target.checked);
              }}
            />
            <label
              className={`${styles.label} form-check-label ms-2 user-select-none`}
              role="button"
              htmlFor="door"
            >
              Door
            </label>
            <i
              className="fa-solid fa-person-through-window ms-2"
              style={{ fontSize: "20px" }}
            ></i>
          </div>
          <Timer device={"Door"} onSetTimeToSend={onSetTimeToSend} status={isDoor}/>
        </div>
      </div>
    </div>
  );
}

export default Actions;
