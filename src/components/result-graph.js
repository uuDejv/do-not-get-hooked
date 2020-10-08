import React from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

function ResultGraph({ results, size }) {
  let positive = 0;
  let negative = 0;

  if (results) {
    Object.keys(results)?.forEach((key) => {
      if (results[key].value === "Ano") positive += 1;
      else negative += 1;
    });
  }

  return (
    <PieChart width={size} height={size} label>
      <Pie
        dataKey="value"
        data={[
          { name: "Ano", value: positive },
          { name: "Ne", value: negative },
        ]}
        cx={size / 2}
        cy={size / 2}
        outerRadius={size / 2.5}
        fill="#8884d8"
      >
        <Cell fill="#00C49F" />
        <Cell fill="#FF8042" />
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

ResultGraph.propTypes = {
  results: PropTypes.shape().isRequired,
  size: PropTypes.number.isRequired,
};

export default React.memo(
  ResultGraph,
  (prevProps, nextProps) => prevProps.results === nextProps.results
);
