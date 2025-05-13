import React from "react";
import ReemploymentCard from "../ReemploymentCard";
import dummyJobs from "../../../dummyData/jobs";

const JobList = () => {
  return (
    <div>
      {dummyJobs.map((job, index) => (
        <JobCard key={index} {...job} />
      ))}
    </div>
  );
};

export default JobList;
