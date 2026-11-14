export function createChartScene(svg, { width, height, originX, originY, x }) {
    const defs = svg.append("defs");
    const maxRadius = Math.min(width, height) / 2;
    const backgroundGradient = defs.append("radialGradient")
        .attr("id", "chart-background-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("cx", originX)
        .attr("cy", originY)
        .attr("r", maxRadius);
    backgroundGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#fffaf2")
        .attr("stop-opacity", 0.7);
    backgroundGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#fffaf2")
        .attr("stop-opacity", 0);

    const transitionGradient = defs.append("radialGradient")
        .attr("id", "transition-quadrant-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("cx", originX)
        .attr("cy", originY)
        .attr("r", maxRadius);
    transitionGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#5300BF")
        .attr("stop-opacity", 0);
    transitionGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#5300BF")
        .attr("stop-opacity", 0.08);

    const transitionClip = defs.append("clipPath")
        .attr("id", "transition-quadrant-clip");
    transitionClip.append("circle")
        .attr("cx", originX)
        .attr("cy", originY)
        .attr("r", maxRadius);

    defs
        .append("marker")
        .attr("id", "axis-arrow")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 8)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z");

    svg.append("circle")
        .attr("class", "chart-background")
        .attr("cx", originX)
        .attr("cy", originY)
        .attr("r", maxRadius)
        .attr("fill", "url(#chart-background-gradient)")
        .attr("aria-hidden", "true")
        .attr("pointer-events", "none");

    svg.append("rect")
        .attr("class", "transition-quadrant")
        .attr("fill", "url(#transition-quadrant-gradient)")
        .attr("clip-path", "url(#transition-quadrant-clip)")
        .attr("x", originX)
        .attr("y", originY)
        .attr("width", width - originX)
        .attr("height", height - originY)
        .attr("aria-hidden", "true")
        .attr("pointer-events", "none");

    svg.append("circle")
        .attr("cx", originX)
        .attr("cy", originY)
        .attr("r", 3)
        .attr("class", "origin-point");

    const radialRings = [10, 1000, 10000]
        .map(value => x(value) - originX)
        .filter(radius => radius > 18 && radius < maxRadius);
    const radialGrid = svg.append("g")
        .attr("class", "radial-grid")
        .attr("aria-hidden", "true");
    radialGrid.selectAll("circle")
        .data(radialRings)
        .join("circle")
        .attr("cx", originX)
        .attr("cy", originY)
        .attr("r", radius => radius);

    const axisDirections = svg.append("g")
        .attr("class", "axis-directions")
        .attr("aria-hidden", "true");
    axisDirections.append("line")
        .attr("x1", originX)
        .attr("y1", originY)
        .attr("x2", width - 14)
        .attr("y2", originY)
        .attr("marker-end", "url(#axis-arrow)");
    axisDirections.append("text")
        .attr("x", width - 8)
        .attr("y", originY - 46)
        .attr("text-anchor", "end")
        .call(text => {
            text.append("tspan").attr("x", width - 8).text("Increased");
            text.append("tspan").attr("x", width - 8).attr("dy", "1.1em").text("Low-Carbon");
            text.append("tspan").attr("x", width - 8).attr("dy", "1.1em").text("Energy Consumption");
        });
    axisDirections.append("line")
        .attr("x1", originX)
        .attr("y1", originY)
        .attr("x2", originX)
        .attr("y2", height - 14)
        .attr("marker-end", "url(#axis-arrow)");
    axisDirections.append("text")
        .attr("x", originX - 22)
        .attr("y", height - 88)
        .attr("text-anchor", "end")
        .call(text => {
            text.append("tspan").attr("x", originX - 22).text("Reduced");
            text.append("tspan").attr("x", originX - 22).attr("dy", "1.1em").text("Fossil Fuel");
            text.append("tspan").attr("x", originX - 22).attr("dy", "1.1em").text("Energy Consumption");
        });

    const trajectoryLayer = svg.append("g")
        .attr("class", "trajectory-layer")
        .attr("pointer-events", "none")
        .attr("aria-hidden", "true");
    const focusLineLayer = svg.append("g")
        .attr("class", "bearing-line-layer")
        .attr("pointer-events", "none")
        .attr("aria-hidden", "true");
    const focusLine = focusLineLayer.append("line")
        .attr("class", "bearing-line")
        .attr("x1", originX)
        .attr("y1", originY);
    const focusRingLayer = svg.append("g")
        .attr("class", "bearing-distance-layer")
        .attr("pointer-events", "none")
        .attr("aria-hidden", "true");
    const focusRing = focusRingLayer.append("circle")
        .attr("class", "bearing-distance");
    const previousYearLayer = svg.append("g").attr("class", "previous-year-layer");
    const currentYearLayer = svg.append("g").attr("class", "current-year-layer");
    const worldDirectionLayer = svg.append("g")
        .attr("class", "world-direction")
        .attr("aria-label", "World change direction");
    const worldDirectionLine = worldDirectionLayer.append("line")
        .attr("class", "world-direction-line")
        .attr("x1", originX)
        .attr("y1", originY);
    const worldDirectionLabel = worldDirectionLayer.append("text")
        .attr("class", "world-direction-label")
        .text("World");
    const focusLayer = svg.append("g")
        .attr("class", "bearing-highlight")
        .attr("pointer-events", "none")
        .attr("aria-hidden", "true");
    const countryDirectionLabel = focusLayer.append("text")
        .attr("class", "country-direction-label")
        .style("display", "none");

    return {
        countryDirectionLabel,
        currentYearLayer,
        focusLine,
        focusRing,
        previousYearLayer,
        trajectoryLayer,
        worldDirectionLabel,
        worldDirectionLine
    };
}
