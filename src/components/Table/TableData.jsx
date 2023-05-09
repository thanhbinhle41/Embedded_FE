import React from "react";
import { Table } from "antd";

function TableData({ keyData, data, time }) {
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Data",
      key: keyData,
      dataIndex: keyData,
    },
  ];
  const dataTable = [];

  data.forEach((item, index) => {
    dataTable.push({
      key: index,
      stt: index,
      time: time[index],
      [keyData]: item,
    })
  })
  
  return (
    <div>
      <Table columns={columns} dataSource={dataTable} />
    </div>
  );
}

export default TableData;
