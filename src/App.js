import React, { Component, useState } from "react";
import axios from "axios";
import "./App.css";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import DataFetching from "./components/List";

export class App extends Component {
  state = {
    profiles: [],
    loading: false,
    currentPage: 1,
    profilesPerPage: 20,
  };
  componentDidMount() {
    const getProfiles = async () => {
      this.setState({ loading: true });
      const results = await axios.get(
        "https://api.enye.tech/v1/challenge/records"
      );
      this.setState({ profiles: results.data.records.profiles });
      this.setState({ loading: false });
    };
    getProfiles()
  }


  render() {
    const { currentPage, profilesPerPage, profiles, loading } = this.state;

    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = profiles.slice(
      indexOfFirstProfile,
      indexOfLastProfile
    );
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });

    const nextPage = () => this.setState({ currentPage: currentPage + 1 });

    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    return (
      <div className="Wrapper">
        <div className="navbar">Enye Project</div>

        <div className="content">
          <ul>
            <DataFetching profiles={currentProfiles} loading={loading} />
          </ul>
        </div>
        <div>
          <Pagination
            profilesPerPage={profilesPerPage}
            totalProfiles={profiles.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
        <footer>
          <div className="footer text-center">
            Built{" "}
            <span role="img" aria-label="love">
              with 💙
            </span>{" "}
            by Moses Fawole
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
