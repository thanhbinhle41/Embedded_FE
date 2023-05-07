import { useEffect, useState } from "react";
import "./App.css";
import Actions from "./components/Actions/Actions";
import ChartContainer from "./components/Chart/ChartContainer";
import Clock from "./components/Clock/Clock";
import Weather from "./components/Weather/Weather";
import { mqttConnect, mqttPublish, mqttSub } from "./services/mqttUtil";

function App() {

  const [clientMqtt, setClientMqtt] = useState(null);

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
    }
    // eslint-disable-next-line
  }, [clientMqtt]);

  const onMessageHandle = (topic, message) => {
    try {
      const payload = JSON.parse(message);
      switch (payload?.type) {
        case "continuous":
          break;
        case "sequence":
          break
        default:
          break
      }
    } catch (err) {
      console.log(err);
    }
  }

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
      });
      clientMqtt.on("message", (topic, message) => {
        onMessageHandle(topic, message);
      });
    }
    // eslint-disable-next-line
  }, [clientMqtt]);

  // EVNET FUNCTIONS
  const onChangeLed = (value) => {
      const context = {
        topic: "web_arduino_client_topic",
        qos: 0,
        payload: {
          "type": value ? "turn_on" : "turn_off",
          "device": "Light"
        }
      };
      mqttPublish(clientMqtt, context);
    
  }
  
  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between">
        <Clock></Clock>
        <Weather></Weather>
      </div>
      {/* ACTIONS */}
      <div className="border w-100 mt-4 p-4">

        <Actions
          onChangeLed={onChangeLed}
        />
      </div>

      {/* Chart */}
      <div className="mt-4">
        <ChartContainer></ChartContainer>
      </div>
      <div className="mt-4">
        <ChartContainer></ChartContainer>
      </div>
      <div className="mt-4">
        <ChartContainer></ChartContainer>
      </div>

      
    </div>
  );
}

export default App;
