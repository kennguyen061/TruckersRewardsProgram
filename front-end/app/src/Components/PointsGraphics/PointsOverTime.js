import "./PointsOverTime.css";
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

//changed var to let
// var should never be used as it is bad syntax in new version of javascript like we are using

function PointsOverTime() {
  let YearValue = 0;

  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("id");
  const sid = window.localStorage.getItem("sid");

  const [ReturnListData, setReturnedListData] = useState([]);

  const url = new URL("http://18.235.52.212:8000/points/history");

  url.searchParams.append("id", id);
  url.searchParams.append("sid", sid);

  const AllPointHandler = (item) => {
    setReturnedListData(item);
  };

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "points/json" },
    })
      .then((response) => response.json())
      .then((info) => {
        AllPointHandler(info);
      });
  }, []);

  let everything = new Map();
  let temp1 = 0;
  useEffect(() => {
    ReturnListData.map((item) => (temp1 = item.Point_Update[0]));
  }, []);
  useEffect(() => {
    const fuck = Array.from(ReturnListData.values());
    console.log(fuck);
  }, []);

  //temp1 = 4000;
  let temp2 = 5000;
  let temp3 = 3000;
  let temp4 = 2000;
  let temp5 = 1000;
  let temp6 = 3500;

  let data = [
    {
      name: "Jan",
      Points: temp1,
    },
    {
      name: "March",
      Points: temp2,
    },
    {
      name: "May",
      Points: temp3,
    },
    {
      name: "July",
      Points: temp4,
    },
    {
      name: "October",
      Points: temp5,
    },
    {
      name: "December",
      Points: temp6,
    },
  ];

  return (
    <div className="Graph">
      <div className="dropdown">
        <select className="year">
          <option Yearvalue="2022">2022</option>
          <option Yearvalue="2021">2021</option>
          <option YearValue="2020">2020</option>
        </select>
      </div>
      <h3>Points Over Time</h3>
      <ResponsiveContainer width="90%" aspect={3}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid horizontal="true" vertical="" stroke="#fff" />
          <XAxis dataKey="name" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            cursor={false}
          />
          <Line
            type="monotone"
            dataKey="Points"
            stroke="#709dff"
            strokeWidth="5"
            dot={{ fill: "#2e4355", stroke: "#709dff", strokeWidth: 2, r: 5 }}
            activeDot={{
              fill: "#2e4355",
              stroke: "#709dff",
              strokeWidth: 5,
              r: 10,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PointsOverTime;
