import "./PointsOverTime.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

var data = [
  {
    name: "January",
    Points: 4000,
  },
  {
    name: "March",
    Points: 1000,
  },
  {
    name: "May",
    Points: 4000,
  },
  {
    name: "July",
    Points: 800,
  },
  {
    name: "October",
    Points: 1500,
  },
];
function PointsOverTime() {
  return (
    <div className="Graph">
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
