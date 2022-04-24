import "./PointsOverTime.css";
import { useEffect, useState } from "react";
import "./PannelBar.css";
import Collapsible from "react-collapsible";

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
  const [myYear, setmyYear] = useState("2022");

  const changeHandler = async (event) => {
    setmyYear(event.target.value);

    const url = new URL("http://18.235.52.212:8000/points/history");

    url.searchParams.append("UID", window.localStorage.getItem("id"));
    url.searchParams.append("SID", window.localStorage.getItem("sid"));

    const res1 = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const res1J = await res1.json();

    let length = Object.keys(res1J).length;
    console.log(length);

    console.log(res1J);

    if (myYear === "2022") {
      window.localStorage.setItem("2022VAL1", res1J[length - 7].Point_Update);
      window.localStorage.setItem("2022VAL2", res1J[length - 5].Point_Update);
      window.localStorage.setItem("2022VAL3", res1J[length - 4].Point_Update);
      window.localStorage.setItem("2022VAL4", res1J[length - 3].Point_Update);
      window.localStorage.setItem("2022VAL5", res1J[length - 2].Point_Update);
      window.localStorage.setItem("2022VAL6", res1J[length - 1].Point_Update);
    } else if (myYear === "2021") {
      //2021
      window.localStorage.setItem("2022VAL1", res1J[length - 12].Point_Update);
      window.localStorage.setItem("2022VAL2", res1J[length - 11].Point_Update);
      window.localStorage.setItem("2022VAL3", res1J[length - 10].Point_Update);
      window.localStorage.setItem("2022VAL4", res1J[length - 9].Point_Update);
      window.localStorage.setItem("2022VAL5", res1J[length - 8].Point_Update);
      window.localStorage.setItem("2022VAL6", res1J[length - 7].Point_Update);
    }

    console.log(
      window.localStorage.getItem("2022VAL1") +
        typeof window.localStorage.getItem("2022VAL1")
    );
    let temp1 = parseInt(window.localStorage.getItem("2022VAL1"));

    console.log(temp1 + typeof temp1);
    console.log(myYear);

    window.localStorage.setItem(
      "REASON1",
      "On " +
        res1J[length - 1].PointDate +
        " you went to " +
        res1J[length - 1].Point_Update +
        " for the reason of " +
        res1J[length - 1].Update_Status
    );
    window.localStorage.setItem(
      "REASON2",
      "On " +
        res1J[length - 2].PointDate +
        " you went to " +
        res1J[length - 2].Point_Update +
        " for the reason of " +
        res1J[length - 2].Update_Status
    );
  };
  let data = [
    {
      name: "Jan",
      Points: window.localStorage.getItem("2022VAL1"),
    },
    {
      name: "March",
      Points: window.localStorage.getItem("2022VAL2"),
    },
    {
      name: "May",
      Points: window.localStorage.getItem("2022VAL3"),
    },
    {
      name: "July",
      Points: window.localStorage.getItem("2022VAL4"),
    },
    {
      name: "October",
      Points: window.localStorage.getItem("2022VAL5"),
    },
    {
      name: "December",
      Points: window.localStorage.getItem("2022VAL6"),
    },
  ];

  let reason1 = window.localStorage.getItem("REASON1");
  let reason2 = window.localStorage.getItem("REASON2");
  /******************************Dont change the values in option they are supposed to be backwords******* */
  return (
    <div className="page">
      <div className="boxed">
        <Collapsible trigger="latest Change">
          <p>{reason1}</p>
        </Collapsible>
        <Collapsible trigger="latest Change">
          <p>{reason2}</p>
        </Collapsible>
      </div>
      <div className="Graph">
        <form>
          <label className="butt">Year:</label>
          <select value={myYear} onChange={changeHandler}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
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
    </div>
  );
};

export default PointsOverTime;
