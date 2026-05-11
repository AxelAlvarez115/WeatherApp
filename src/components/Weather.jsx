import React from "react";
import Days from "./Days";

export default function Weather({ city, data, selectedDay, setSelectedDay }) {
  if (!data) return <p style={{ color: "white" }}>Chargement...</p>;

  const current = data[selectedDay];

  return (
    <div className="weather card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">{city}</span>

        <img src={current.day.condition.icon} alt={`icon-${current.day.condition.text}`} />

        <span className="temperature">
          {Math.round(current.day.avgtemp_c)}°
        </span>

        <div className="wind">
          Vent {current.day.maxwind_kph} km/h
        </div>
      </div>

      <Days
        forecast={data}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />
    </div>
  );
}