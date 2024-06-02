import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const TimeSeriesGraph = ({ data }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 400 });

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
    if (!data || data.length === 0) return;
    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;
    const margin = { top: 20, right: 40, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear SVG before re-drawing
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set the ranges
    const x = d3.scaleTime().range([0, innerWidth]);
    const y = d3.scaleLinear().range([innerHeight, 0]);

    // Define the line
    const valueline = d3
      .line()
      // @ts-ignore
      .x((d) => x(new Date(d.timestamp)))
      // @ts-ignore
      .y((d) => y(d.alerts));

    // Scale the range of the data
    // @ts-ignore
    x.domain(d3.extent(data, (d) => new Date(d.timestamp)));
    // @ts-ignore
    y.domain([0, d3.max(data, (d) => d.alerts)]);

    // Format the x-axis to display time
    const xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%H:%M"));

    // Add the valueline path.
    g.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", "2px");

    // Add the X Axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .append("text")
      .attr("fill", "#000")
      .attr("x", innerWidth / 2)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .text("Time of Day (HH:MM)");

    // Add the Y Axis
    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", 0 - innerHeight / 2)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .text("Number of Alerts");
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ width: "100%" }} className="timeGraph">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
      ></svg>
    </div>
  );
};

export default TimeSeriesGraph;
