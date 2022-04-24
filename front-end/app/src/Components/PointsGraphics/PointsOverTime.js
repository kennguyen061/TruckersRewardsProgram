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
      Points: 100,
    },
    {
      name: "March",
      Points: 200,
    },
    {
      name: "May",
      Points: 300,
    },
    {
      name: "July",
      Points: 400,
    },
    {
      name: "October",
      Points: 500,
    },
    {
      name: "December",
      Points: 600,
    },
  ];

  const [myYear, setmyYear] = useState("2022");

  const SubmitHandler = async (event) => {
    event.preventDefault();
    setmyYear(event.target.value);

    const url = new URL("http://18.235.52.212:8000/points/history");

    url.searchParams.append("UID", window.localStorage.getItem("id"));
    url.searchParams.append("SID", window.localStorage.getItem("sid"));

    const res1 = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const res1J = await res1.json();

    console.log(res1J);

    //2022
    window.localStorage.setItem("2022VAL1", parseInt(res1J[12].Point_Update));
    window.localStorage.setItem("2022VAL2", parseInt(res1J[13].Point_Update));
    window.localStorage.setItem("2022VAL3", parseInt(res1J[14].Point_Update));
    window.localStorage.setItem("2022VAL4", parseInt(res1J[15].Point_Update));
    window.localStorage.setItem("2022VAL5", parseInt(res1J[16].Point_Update));
    window.localStorage.setItem("2022VAL6", parseInt(res1J[17].Point_Update));
    //2021
    window.localStorage.setItem("2021VAL1", parseInt(res1J[6].Point_Update));
    window.localStorage.setItem("2021VAL2", parseInt(res1J[7].Point_Update));
    window.localStorage.setItem("2021VAL3", parseInt(res1J[8].Point_Update));
    window.localStorage.setItem("2021VAL4", parseInt(res1J[9].Point_Update));
    window.localStorage.setItem("2021VAL5", parseInt(res1J[10].Point_Update));
    window.localStorage.setItem("2021VAL6", parseInt(res1J[11].Point_Update));
    //2020
    window.localStorage.setItem("2020VAL1", parseInt(res1J[0].Point_Update));
    window.localStorage.setItem("2020VAL2", parseInt(res1J[1].Point_Update));
    window.localStorage.setItem("2020VAL3", parseInt(res1J[2].Point_Update));
    window.localStorage.setItem("2020VAL4", parseInt(res1J[3].Point_Update));
    window.localStorage.setItem("2020VAL5", parseInt(res1J[4].Point_Update));
    window.localStorage.setItem("2020VAL6", parseInt(res1J[5].Point_Update));

    console.log(myYear);
    let year = myYear;
    if (year == "2022") {
      data[0].Points = window.localStorage.getItem("2022VAL1");
      data[1].Points = window.localStorage.getItem("2022VAL2");
      data[2].Points = window.localStorage.getItem("2022VAL3");
      data[3].Points = window.localStorage.getItem("2022VAL4");
      data[4].Points = window.localStorage.getItem("2022VAL5");
      data[5].Points = window.localStorage.getItem("2022VAL6");
    } else if (year == "2021") {
      data[0].Points = window.localStorage.getItem("2021VAL1");
      data[1].Points = window.localStorage.getItem("2021VAL2");
      data[2].Points = window.localStorage.getItem("2021VAL3");
      data[3].Points = window.localStorage.getItem("2021VAL4");
      data[4].Points = window.localStorage.getItem("2021VAL5");
      data[5].Points = window.localStorage.getItem("2021VAL6");
    } else if (year == "2020") {
      data[0].Points = window.localStorage.getItem("2020VAL1");
      data[1].Points = window.localStorage.getItem("2020VAL2");
      data[2].Points = window.localStorage.getItem("2020VAL3");
      data[3].Points = window.localStorage.getItem("2020VAL4");
      data[4].Points = window.localStorage.getItem("2020VAL5");
      data[5].Points = window.localStorage.getItem("2020VAL6");
    } else {
    }
  };
  return (
    <div className="Graph">
      <form>
        <label className="butt">Enter the year you'd Like to see:</label>
        <select value={myYear} onChange={SubmitHandler}>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </form>
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
