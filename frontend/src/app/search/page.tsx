import SearchTrain from "@/components/SearchTrain";
import React from "react";
import { motion } from "framer-motion";

const Search = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-primary/80 font-bold text-center text-2xl mb-4 ">
        Search For Trains
      </h1>
      <SearchTrain />
    </div>
  );
};

export default Search;
