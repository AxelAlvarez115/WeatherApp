import React from "react";
import dayjs from "dayjs";

export default function Days({ forecast, selectedDay, onSelectDay }) {
  return (
    <div className="card-action">
      {forecast.map((day, index) => {
        const date = dayjs(day.date);
        const label = date.format("dddd");

        return (
          <a
            key={index}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectDay(index);
            }}
            style={{ fontWeight: selectedDay === index ? "bold" : "normal" }}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}