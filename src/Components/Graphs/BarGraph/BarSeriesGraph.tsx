import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BarChart = ({ rawData }) => {
  const ref = useRef();
  // @ts-ignore
  const [dimensions, setDimensions] = useState({ width: 500, height: 300 });

  useEffect(() => {
    if (!rawData || rawData.length === 0) return;

    const margin = { top: 20, right: 0, bottom: 15, left: 50 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("viewBox", [0, 0, dimensions.width, dimensions.height]);

    const severityCounts = d3
      .rollups(
        rawData,
        (group) => group.length,
        // @ts-ignore
        (d) => (d.alert && d.alert.severity ? d.alert.severity : "Unknown")
      )
      .sort((a, b) => d3.ascending(a[0], b[0]));

    const color = d3
      .scaleOrdinal()
      .domain(severityCounts.map((d) => d[0]))
      .range(d3.schemeTableau10);

    const x = d3
      .scaleBand()
      .domain(severityCounts.map((d) => d[0]))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(severityCounts, (d) => d[1])])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll(".bar")
      .data(severityCounts)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d[1]))
      // @ts-ignore
      .attr("fill", (d) => color(d[0]))
      .on("mouseover", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 0.6)
          .attr("y", (d) => y(d[1]) - 10) // Move up slightly
          .attr("height", (d) => y(0) - y(d[1]) + 10); // Increase height slightly
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 1)
          .attr("y", (d) => y(d[1]))
          .attr("height", (d) => y(0) - y(d[1]));
      });

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("fill", "#000")
      .attr("x", 210)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .text("Severity Level");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -130)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .text("Number of Alerts");

    // Adding a legend
    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width + margin.right - 100}, ${margin.top})`
      );

    severityCounts.forEach((d, i) => {
      legend
        .append("rect")
        .attr("y", i * 30)
        .attr("width", 20)
        .attr("height", 20)
        // @ts-ignore
        .attr("fill", color(d[0]));

      legend
        .append("text")
        .attr("x", 25)
        .attr("y", i * 30 + 15)
        .text(d[0])
        .style("font-size", "15px")
        .attr("text-anchor", "start")
        .style("alignment-baseline", "middle");
    });
  }, [rawData, dimensions]);

  return (
    <div style={{ width: "100%" }} className="barGraph">
      <svg ref={ref}></svg>
    </div>
  );
};

export default BarChart;
