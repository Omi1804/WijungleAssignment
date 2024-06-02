import { useEffect, useRef } from "react";
import * as d3 from "d3";

const Graph = ({ rawData }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", 500) // Increased width for legend space
      .attr("height", 300);

    const margin = { left: 200, top: 10 }; // Margin for the pie chart
    const radius = 130; // Radius of the pie chart
    const hoverOffset = 10; // Offset for hover to create a 3D-like effect

    // Adjust the center position based on the new margin
    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left + radius}, ${radius + margin.top})`
      );

    const color = d3
      .scaleOrdinal()
      .domain(["TCP", "UDP", "OTHER"])
      .range(["#007bff", "#dc3545", "#F7CF1F"]); // Colors for TCP and UDP

    const pie = d3.pie().value((d) => d[1]);
    const path = d3.arc().outerRadius(radius).innerRadius(0);
    const hoverPath = d3
      .arc()
      .outerRadius(radius + hoverOffset)
      .innerRadius(0); // Larger radius on hover

    const groupByProto = d3.rollups(
      rawData,
      (v) => v.length,
      // @ts-ignore
      (d) => d.proto
    );
    const arcs = g
      .selectAll(".arc")
      // @ts-ignore
      .data(pie(groupByProto))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      // @ts-ignore
      .attr("d", path)
      // @ts-ignore
      .attr("fill", (d) => color(d.data[0]))
      .on("mouseover", function () {
        d3.select(this).transition().duration(200).attr("d", hoverPath);
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("d", path);
      });

    // Create a legend on the left side
    const legend = svg
      .append("g")
      .attr("transform", `translate(30, ${margin.top})`);
    color.domain().forEach((proto, index) => {
      legend
        .append("rect")
        .attr("y", index * 30)
        .attr("width", 50)
        .attr("height", 22)
        // @ts-ignore
        .attr("fill", color(proto));

      legend
        .append("text")
        .attr("x", 52)
        .attr("y", index * 30 + 15)
        .text(proto)
        .style("font-size", "15px")
        .attr("text-anchor", "start")
        .style("alignment-baseline", "middle");
    });
  }, []);

  return (
    <div className="pieGraph">
      <svg ref={ref}></svg>
    </div>
  );
};

export default Graph;
