import React, { Component, useEffect, useState } from "react";
import "../App.css";
import App from "../App";
import axios from "axios";
import Pagination from "./Pagination";
function DataFetching() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const profilesPerPage = useState(20);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.enye.tech/v1/challenge/records")
      .then((res) => {
        setProfiles(res.data.records.profiles);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  if (loading) {
    <h5 style={{ color: "white" }}>Loading.....</h5>;
  }
  useEffect(() => {
    setFilteredProfiles(
      profiles.filter((profile) => {
        return (
          profile.Gender.toLowerCase().includes(search.toLowerCase()) ||
          profile.CreditCardType.toLowerCase().includes(search.toLowerCase()) ||
          profile.PaymentMethod.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, profiles]);
  return (
    <div>
      <ul className="profiles">
        <p style={{ color: "white" }}>
          Search by Gender,Payment Order and Credit Card type
        </p>
        <input
          type="text"
          className="form-control"
          placeholder="Search by Gender,Payment sMethod or Credit Card type"
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredProfiles.map((record) => (
          <li key={record.id}>
            <img
              src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
              alt=" "
            ></img>{" "}
            <br />
            <span>
              <b>Name:</b>{" "}
              <mark>
                {" "}
                {record.FirstName} {record.LastName}
              </mark>
            </span>
            <br />
            <span>
              <b>Email 📩:</b> <mark>{record.Email}</mark>{" "}
            </span>{" "}
            <br />
            <span>
              <b>Gender ♊:</b>{" "}
              <mark>
                {record.Gender === "Male"
                  ? " Male 👨🏻 "
                  : record.Gender === "Female"
                  ? "Female 👩🏻 "
                  : "Prefer to skip 🔒"}
              </mark>{" "}
            </span>{" "}
            <br />
            <span>
              <b>Phone 📱:</b> <mark>{record.PhoneNumber}</mark>{" "}
            </span>{" "}
            <br />
            <span>
              <b>Credit Card Type 💳:</b>{" "}
              <mark
                style={{ textTransform: "uppercase", fontFamily: "monospace" }}
              >
                {record.CreditCardType}
              </mark>{" "}
            </span>{" "}
            <br />
            <span>
              <b>Credit Card Number :</b> <mark>{record.CreditCardNumber}</mark>{" "}
            </span>{" "}
            <br />
            <span>
              <b>Payment Method 💰:</b>{" "}
              <mark
                style={{ textTransform: "uppercase", fontFamily: "monospace" }}
              >
                {record.PaymentMethod}
              </mark>{" "}
            </span>{" "}
            <br />
            <span>
              <b>Last Login ⛔: </b>
              <mark>{record.LastLogin}</mark>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default DataFetching;
