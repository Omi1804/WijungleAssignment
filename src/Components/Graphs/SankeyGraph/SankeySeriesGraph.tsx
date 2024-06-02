import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const Histogram = ({ rawData }) => {
  const ref = useRef();
  const wrapperRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 400,
  });

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Set initial dimensions
    const { width } = wrapperRef.current.getBoundingClientRect();
    setDimensions({
      width,
      height: 400, // You can make height responsive as well, based on your design needs
    });

    // Add resize listener
    const handleResize = () => {
      const { width } = wrapperRef.current.getBoundingClientRect();
      setDimensions({
        width,
        height: 400,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!rawData || rawData.length === 0) return;

    const margin = { top: 30, right: 50, bottom: 100, left: 70 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .html("") // Clear previous contents
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Verify and map the data
    const dataMapped = rawData.map((d) =>
      d.alert ? d.alert.category || "Unknown" : "Missing Data"
    );

    // Group data by category
    const dataGrouped = Array.from(
      d3.group(dataMapped, (d) => d),
      ([key, value]) => ({ category: key, count: value.length })
    );

    // Set up the scales
    const x = d3
      .scaleBand()
      .range([0, width])
      // @ts-ignore
      .domain(dataGrouped.map((d) => d.category))
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(dataGrouped, (d) => d.count)])
      .range([height, 0]);

    // X-axis
    // @ts-ignore
    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.7em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Y-axis
    svg
      .append("g")
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

    // Bars with hover effect
    svg
      .selectAll(".bar")
      .data(dataGrouped)
      .enter()
      .append("rect")
      .attr("class", "bar")
      // @ts-ignore
      .attr("x", (d) => x(d.category))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", "#69b3a2")
      // @ts-ignore
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "orange");
        svg
          .append("text")
          .attr("class", "val")
          // @ts-ignore
          .attr("x", x(d.category) + x.bandwidth() / 2)
          .attr("y", y(d.count) - 5)
          .text(d.count)
          .attr("text-anchor", "middle");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#69b3a2");
        svg.selectAll(".val").remove();
      });
  }, [rawData, dimensions]);

  return (
    <div ref={wrapperRef} style={{ width: "100%" }} className="histogramGraph">
      <svg ref={ref} width={dimensions.width} height={dimensions.height}></svg>
    </div>
  );
};

export default Histogram;
