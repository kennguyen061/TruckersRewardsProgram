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

const PointsOverTime = () => {
  let data = [
    {
      name: "Jan",
      Points: 1000,
    },
    {
      name: "March",
      Points: 2000,
    },
    {
      name: "May",
      Points: 3000,
    },
    {
      name: "July",
      Points: 4000,
    },
    {
      name: "October",
      Points: 5000,
    },
    {
      name: "December",
      Points: 6000,
    },
  ];
  let YearValue = 0;

  const SubmitHandler = async (event) => {
    const url = new URL("http://18.235.52.212:8000/points/history");

    url.searchParams.append("id", window.localStorage.getItem("id"));
    url.searchParams.append("sid", window.localStorage.getItem("sid"));

    const res1 = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const res1J = await res1.json();

    console.log(res1J);

    let temp1 = 4000;
    let temp2 = 5000;
    let temp3 = 3000;
    let temp4 = 2000;
    let temp5 = 1000;
    let temp6 = 3500;
  };
  return (
    <div className="Graph">
      <div className="dropdown">
        <form onSubmit={SubmitHandler}>
          <label className="butt">Enter the year you'd Like to see:</label>
          <input
            type="text"
            name="year"
            value={window.localStorage.getItem("SELECTEDYEAR")}
            onChange={(event) =>
              window.localStorage.setItem("SELECTEDYEAR", event.target.value)
            }
          />

          <input type="submit" />
        </form>
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
            contentStyle={{
              backgroundColor: "#8884d8",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
            cursor={false}
          />
          <Line
            type="monotone"
            dataKey="Points"
            stroke="#709dff"
            strokeWidth="5"
            dot={{
              fill: "#2e4355",
              stroke: "#709dff",
              strokeWidth: 2,
              r: 5,
            }}
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
};

export default PointsOverTime;
