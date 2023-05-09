import React, { useEffect, useState } from "react";
import { mqttConnect, mqttPublish, mqttSub } from "../../services/mqttUtil";
import { getTimeNow } from "../../utils/utils";
import Clock from "../Clock/Clock";
import Weather from "../Weather/Weather";
import Actions from "../Actions/Actions";
import Information from "../Infomation/Information";
import ChartContainer from "../Chart/ChartContainer";

const Main = () => {
  const [clientMqtt, setClientMqtt] = useState(null);
  const [measureData, setMeasureData] = useState({
    temperature: 0,
    air_humidity: 0,
    water: 0,
    soil: 0,
    light: 0,
  });
  const [listMeasureData, setListMeasureData] = useState([]);
  const [listLabelsChart, setListLabelsChart] = useState([]);

  const [isLed, setIsLed] = useState(true);
  const [isPumb, setIsPumb] = useState(true);

  const [auto, setAuto] = useState({
    isAuto: false,
    light: false,
    pump: false,
  });

  useEffect(() => {
    const host = "broker.emqx.io";
    const port = 8084;
    const client = mqttConnect(host, port);
    setClientMqtt(client);
  }, []);

  useEffect(() => {
    if (clientMqtt) {
      const subscription = {
        topic: "web_arduino_client_topic",
        qos: 0,
      };
      mqttSub(clientMqtt, subscription);
      const context = {
        topic: "web_arduino_client_topic",
        qos: 0,
        payload: {
          type: "measure_sequence",
        },
      };
      mqttPublish(clientMqtt, context);
      context["payload"]["type"] = "measure_continuous";
      mqttPublish(clientMqtt, context);
    }
    // eslint-disable-next-line
  }, [clientMqtt]);

  const onMessageHandle = (topic, message) => {
    const payload = JSON.parse(message);
    switch (payload?.type) {
      case "measure":
        setListLabelsChart((oldvalue) => [...oldvalue, getTimeNow()]);
        setListMeasureData((oldvalue) => [...oldvalue, payload]);
        setMeasureData(payload);

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (auto.isAuto) {
      const context = {
        topic: "web_arduino_client_topic",
        qos: 0,
        payload: {
          type: "turn_on",
          device: "Light",
        },
      };
      if (auto.light) {
        context.payload.device = "Light";
        if (measureData.light >= 2700 && !isLed) {
          setIsLed(true);
          context.payload.type = "turn_on";
          console.log(context);
          mqttPublish(clientMqtt, context);
        } else if (measureData.light < 2700 && isLed) {
          setIsLed(false);
          context.payload.type = "turn_off";
          mqttPublish(clientMqtt, context);
        }
      } else if (auto.pump) {
        context.payload.device = "Pump";
        if (measureData.soil > 800 && !isPumb) {
          setIsPumb(true);
          context.payload.type = "turn_on";
          console.log(context);
          mqttPublish(clientMqtt, context);
        } else if (measureData.soil <= 800 && isPumb) {
          setIsPumb(false);
          context.payload.type = "turn_off";
          mqttPublish(clientMqtt, context);
        }
      }
    }
  }, [auto, clientMqtt, isLed, isPumb, measureData]);

  useEffect(() => {
    if (clientMqtt) {
      clientMqtt.on("connect", () => {
        console.log("connected");
      });
      clientMqtt.on("error", (err) => {
        console.error("Connection error: ", err);
        clientMqtt.end();
      });
      clientMqtt.on("reconnect", () => {
        console.log("reconnecting");
      });
      clientMqtt.on("message", (topic, message) => {
        onMessageHandle(topic, message);
      });
    }
    // eslint-disable-next-line
  }, [clientMqtt]);

  // MEASURE FUNCTIONS
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (clientMqtt) {
        const context = {
          topic: "web_arduino_client_topic",
          qos: 0,
          payload: {
            type: "measure_sequence",
          },
        };
        mqttPublish(clientMqtt, context);
        context["payload"]["type"] = "measure_continuous";
        mqttPublish(clientMqtt, context);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [clientMqtt]);

  // EVNET FUNCTIONS
  const onToggleDevice = (device, value) => {
    const context = {
      topic: "web_arduino_client_topic",
      qos: 0,
      payload: {
        type: value ? "turn_on" : "turn_off",
        device: device,
      },
    };
    mqttPublish(clientMqtt, context);
  };

  const onAutoDevice = (device, value) => {
    const tmpAuto = structuredClone(auto);
    tmpAuto.isAuto = value;
    if (device === "Light" && value) {
      tmpAuto.light = true;
    } else if (device === "Light" && !value) {
      tmpAuto.light = false;
    }

    if (device === "Pump" && value) {
      tmpAuto.pump = true;
    } else if (device === "Light" && !value) {
      tmpAuto.pump = false;
    }
    console.log(tmpAuto);
    setAuto(tmpAuto);
  };

  const onSetTimeToSend = (device, status) => {
    const context = {
      topic: "web_arduino_client_topic",
      qos: 0,
      payload: {
        type: status ? "turn_off" : "turn_on",
        device: device,
      },
    };
    switch (device) {
      case "Light":
        setIsLed(!status);
        break;
      case "Pump":
        setIsPumb(!status);
        break;
      default:
        break;
    }
    console.log(context);
    mqttPublish(clientMqtt, context);
  };

  return (
    <div className="container my-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between">
        <Clock></Clock>
        <Weather></Weather>
      </div>
      {/* ACTIONS */}
      <div className="border w-100 mt-4 p-4">
        <Actions
          onToggleDevice={onToggleDevice}
          onAutoDevice={onAutoDevice}
          isPumb={isPumb}
          setIsPumb={setIsPumb}
          setIsLed={setIsLed}
          isLed={isLed}
          onSetTimeToSend={onSetTimeToSend}
        />
      </div>

      <div className="mt-4">
        <Information measureData={measureData} />
      </div>

      {/* Chart */}
      <div className="my-4">
        <ChartContainer data={listMeasureData} labels={listLabelsChart} />
      </div>
    </div>
  );
};

export default Main;
