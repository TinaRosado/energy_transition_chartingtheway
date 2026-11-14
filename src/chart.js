import * as d3 from "d3";
import { createChartScene } from "./components/chart-scene.js";
import { createCountrySearch } from "./components/country-search.js";
import { createDetailsTable } from "./components/details-table.js";
import { BASELINE_YEAR, loadEnergyData } from "./data/energy-data.js";

const CHART_SIZE = 660;

export function initializeChart() {
    const container = d3.select("#my_dataviz");
    const slider = d3.select("#yearSlider");
    const selectedYearText = d3.select("#selectedYearText");
    const detailsTable = createDetailsTable();

    const margin = { top: 42, right: 30, bottom: 70, left: 78 };
    const width = CHART_SIZE - margin.left - margin.right;
    const height = CHART_SIZE - margin.top - margin.bottom;

    const chart = container
        .append("svg")
        .attr("width", CHART_SIZE)
        .attr("height", CHART_SIZE)
        .attr("viewBox", `0 0 ${CHART_SIZE} ${CHART_SIZE}`)
        .attr("class", "chart-svg")
        .attr("role", "group")
        .attr("aria-label", "Energy consumption changes by country and World since 1992");

    const svg = chart.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    loadEnergyData(+slider.attr("max"))
        .then(({ countries, countryByName, countryRowsByCode, dataDifferences, maxDiff, worldRowsByYear }) => {

            const x = d3.scaleSymlog()
                .domain([-maxDiff, maxDiff])
                .range([0, width]);
            const y = d3.scaleSymlog()
                .domain([-maxDiff, maxDiff])
                .range([height, 0]);

            const originX = x(0);
            const originY = y(0);
            let selectedYear = BASELINE_YEAR;
            let selectedCountryCode = null;
            let hoveredDatum = null;

            const {
                countryDirectionLabel,
                currentYearLayer,
                focusLine,
                focusRing,
                previousYearLayer,
                trajectoryLayer,
                worldDirectionLabel,
                worldDirectionLine
            } = createChartScene(svg, { width, height, originX, originY, x });

            function selectedCountryDatum() {
                if (!selectedCountryCode) {
                    return null;
                }
                const rows = countryRowsByCode.get(selectedCountryCode) || [];
                return rows.find(d => d.year === selectedYear) || null;
            }

            function worldDatumForYear(year) {
                return worldRowsByYear.get(year) ||
                    [...worldRowsByYear.values()].filter(d => d.year <= year).at(-1) ||
                    null;
            }

            function updateWorldDirection() {
                const datum = worldDatumForYear(selectedYear);
                if (!datum) {
                    worldDirectionLine.style("display", "none");
                    worldDirectionLabel.style("display", "none");
                    return;
                }

                const targetX = x(datum.lowcarbonDiff);
                const targetY = y(datum.fossilDiff);
                const dx = targetX - originX;
                const dy = targetY - originY;
                if (dx === 0 && dy === 0) {
                    worldDirectionLine.style("display", "none");
                    worldDirectionLabel.style("display", "none");
                    return;
                }

                const boundaryScales = [];
                if (dx > 0) boundaryScales.push((width - originX) / dx);
                if (dx < 0) boundaryScales.push((0 - originX) / dx);
                if (dy > 0) boundaryScales.push((height - originY) / dy);
                if (dy < 0) boundaryScales.push((0 - originY) / dy);
                const scale = Math.min(...boundaryScales.filter(value => value >= 0));
                const endX = originX + dx * scale;
                const endY = originY + dy * scale;

                worldDirectionLine
                    .style("display", null)
                    .attr("x2", endX)
                    .attr("y2", endY);

                const directionLength = Math.hypot(dx, dy);
                worldDirectionLabel
                    .style("display", null)
                    .attr("x", endX + (dx / directionLength) * 10)
                    .attr("y", endY + (dy / directionLength) * 10)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "middle")
                    .attr("transform", null);
            }

            function updateBearing() {
                const datum = hoveredDatum || selectedCountryDatum();
                const visible = datum !== null && !datum.isNoData;
                focusRing.style("display", visible ? null : "none");
                focusLine.style("display", visible ? null : "none");
                if (!visible) {
                    countryDirectionLabel.style("display", "none");
                    return;
                }

                const pointX = x(datum.lowcarbonDiff);
                const pointY = y(datum.fossilDiff);
                const radius = Math.hypot(pointX - originX, pointY - originY);
                const showCountryLabel = radius > 0 &&
                    selectedCountryCode === datum.code &&
                    hoveredDatum === null;
                countryDirectionLabel.style("display", showCountryLabel ? null : "none");
                focusRing
                    .attr("cx", originX)
                    .attr("cy", originY)
                    .attr("r", radius);
                focusLine
                    .attr("x2", pointX)
                    .attr("y2", pointY);

                if (showCountryLabel) {
                    countryDirectionLabel
                        .text(datum.country)
                        .attr("x", pointX + ((pointX - originX) / radius) * 10)
                        .attr("y", pointY + ((pointY - originY) / radius) * 10)
                        .attr("text-anchor", "start")
                        .attr("dominant-baseline", "middle")
                        .attr("transform", null);
                }
            }

            function updateSelectionStyles() {
                currentYearLayer.selectAll("circle")
                    .classed("is-selected", d => d.code === selectedCountryCode)
                    .attr("aria-pressed", d => d.code === selectedCountryCode)
                    .style("opacity", d => selectedCountryCode && d.code !== selectedCountryCode ? 0.1 : 0.9);
                previousYearLayer.selectAll("circle")
                    .classed("is-selected", d => d.code === selectedCountryCode)
                    .attr("aria-pressed", d => d.code === selectedCountryCode)
                    .style("opacity", d => selectedCountryCode && d.code !== selectedCountryCode ? 0.1 : 0.5);
            }

            function selectCountry(d) {
                selectedCountryCode = selectedCountryCode === d.code ? null : d.code;
                hoveredDatum = null;
                updateCircles(selectedYear);
            }

            function bindCountryInteractions(selection) {
                return selection
                    .attr("tabindex", 0)
                    .attr("role", "button")
                    .attr("aria-label", d => d.isNoData
                        ? `${d.country}, ${d.year}, no data`
                        : `${d.country}, ${d.year}`)
                    .attr("aria-pressed", d => d.code === selectedCountryCode)
                    .on("mouseover", (_, d) => {
                        hoveredDatum = d;
                        updateBearing();
                    })
                    .on("mouseout", () => {
                        hoveredDatum = null;
                        updateBearing();
                    })
                    .on("focus", (_, d) => {
                        hoveredDatum = d;
                        updateBearing();
                    })
                    .on("blur", () => {
                        hoveredDatum = null;
                        updateBearing();
                    })
                    .on("click", (event, d) => {
                        event.stopPropagation();
                        selectCountry(d);
                    })
                    .on("keydown", (event, d) => {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            selectCountry(d);
                        }
                    });
            }

            function updateCircles(year, clearHover = true, syncCountrySearch = true) {
                selectedYear = year;
                if (clearHover) {
                    hoveredDatum = null;
                }
                selectedYearText.text(year);
                const worldDatum = worldDatumForYear(year);
                if (worldDatum) {
                    detailsTable.showWorldTotals(worldDatum);
                }
                detailsTable.setWorldVisible(worldDatum !== null);

                const currentYearData = dataDifferences.filter(d => d.year === year);
                const previousYearData = dataDifferences.filter(d => d.year === year - 1);

                previousYearLayer.selectAll("circle")
                    .data(previousYearData, d => d.code)
                    .join("circle")
                    .attr("class", d => d.isNoData ? "no-data-circle previous-year-circle" : "previous-year-circle")
                    .attr("cx", d => x(d.isNoData ? 0 : d.lowcarbonDiff))
                    .attr("cy", d => y(d.isNoData ? 0 : d.fossilDiff))
                    .attr("r", 2.5)
                    .style("opacity", 0.5)
                    .call(bindCountryInteractions);
                currentYearLayer.selectAll("circle")
                    .data(currentYearData, d => d.code)
                    .join("circle")
                    .attr("class", d => d.isNoData ? "no-data-circle current-year-circle" : "current-year-circle")
                    .attr("cx", d => x(d.isNoData ? 0 : d.lowcarbonDiff))
                    .attr("cy", d => y(d.isNoData ? 0 : d.fossilDiff))
                    .attr("r", 4.5)
                    .style("opacity", 0.9)
                    .call(bindCountryInteractions);
                currentYearLayer.selectAll(".selected-country-ring")
                    .data(currentYearData.filter(d => d.code === selectedCountryCode && !d.isNoData), d => d.code)
                    .join("circle")
                    .attr("class", "selected-country-ring")
                    .attr("cx", d => x(d.lowcarbonDiff))
                    .attr("cy", d => y(d.fossilDiff))
                    .attr("r", 5.2);

                const trajectory = selectedCountryCode
                    ? (countryRowsByCode.get(selectedCountryCode) || [])
                        .filter(d => d.year >= BASELINE_YEAR && d.year < year && !d.isNoData)
                        .sort((a, b) => a.year - b.year)
                    : [];
                trajectoryLayer.selectAll("circle")
                    .data(trajectory, d => d.year)
                    .join("circle")
                    .attr("class", "trajectory-point")
                    .attr("cx", d => x(d.lowcarbonDiff))
                    .attr("cy", d => y(d.fossilDiff))
                    .attr("r", 2.5)
                    .style("opacity", 0.5)
                    .selectAll("title")
                    .data(d => [d])
                    .join("title")
                    .text(d => `${d.country}, ${d.year}`);

                updateSelectionStyles();
                updateWorldDirection();
                updateBearing();

                const countryDatum = selectedCountryDatum();
                countryPicker.setSelection(countryDatum, syncCountrySearch);
                if (countryDatum) {
                    detailsTable.showCountryDetails(countryDatum);
                } else {
                    detailsTable.resetCountryDetails();
                }
            }

            const countryPicker = createCountrySearch({
                input: d3.select("#countrySearch"),
                wrapper: d3.select(".country-search-wrap"),
                options: d3.select("#countryOptions"),
                countries,
                countryByName,
                onInput(query, match) {
                    selectedCountryCode = match?.code ?? null;
                    hoveredDatum = null;
                    updateCircles(selectedYear, true, !query || match !== null);
                },
                onSelect(country) {
                    selectedCountryCode = country.code;
                    hoveredDatum = null;
                    updateCircles(selectedYear);
                }
            });
            updateCircles(BASELINE_YEAR);

            slider.on("input", function () {
                updateCircles(+this.value);
            });
            chart.on("click", () => {
                if (selectedCountryCode) {
                    selectedCountryCode = null;
                    hoveredDatum = null;
                    updateCircles(selectedYear);
                }
            });
        })
        .catch(error => {
            console.error("Unable to load the energy consumption data.", error);
            container
                .append("p")
                .attr("class", "data-error")
                .text("The energy consumption data could not be loaded.");
        });
}
