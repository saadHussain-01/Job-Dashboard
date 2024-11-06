import React from "react";
import Header from "./components/header";
import Banner from "./components/banner";
import Job from "./components/job";
import BrowseJob from "./components/browsejob";

export default function LandingPage() {
  return (
    <div>
      <Header />
      <Banner />
      <Job/>
      <BrowseJob/>
    </div>
  );
}



