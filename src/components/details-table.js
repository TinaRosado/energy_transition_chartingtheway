import * as d3 from "d3";

export function createDetailsTable() {
    const worldDetailsRow = d3.select("#worldDetailsRow");
    const countryNoDataRow = d3.select("#countryNoDataRow");
    const countryNoDataMessage = d3.select("#countryNoDataMessage");
    const countryValueCells = [
        d3.select("#countryLowCarbonChange"),
        d3.select("#countryFossilChange"),
        d3.select("#countryLowCarbonTotal"),
        d3.select("#countryFossilTotal"),
        d3.select("#countryCombinedTotal")
    ];
    const formatValue = d3.format(",.0f");
    const formatChange = d3.format("+,.0f");

    function showWorldTotals(datum) {
        d3.select("#worldLowCarbonChange").text(formatChange(datum.lowcarbonDiff));
        d3.select("#worldFossilChange").text(formatChange(datum.fossilDiff));
        d3.select("#worldLowCarbonTotal").text(formatValue(datum.lowcarbon));
        d3.select("#worldFossilTotal").text(formatValue(datum.fossil));
        d3.select("#worldCombinedTotal").text(formatValue(datum.lowcarbon + datum.fossil));
    }

    function showCountryDetails(datum) {
        if (datum.isNoData) {
            countryValueCells.forEach(cell => cell.property("hidden", true));
            countryNoDataMessage.text(datum.noDataReason === "baseline"
                ? "No positive 1992 energy total is available for this country, so change cannot be calculated."
                : "No data is reported for this country in this year.");
            countryNoDataRow.property("hidden", false);
            return;
        }

        countryNoDataRow.property("hidden", true);
        countryValueCells.forEach(cell => cell.property("hidden", false));
        countryValueCells[0].text(formatChange(datum.lowcarbonDiff));
        countryValueCells[1].text(formatChange(datum.fossilDiff));
        countryValueCells[2].text(formatValue(datum.lowcarbon));
        countryValueCells[3].text(formatValue(datum.fossil));
        countryValueCells[4].text(formatValue(datum.lowcarbon + datum.fossil));
    }

    function resetCountryDetails() {
        countryNoDataRow.property("hidden", true);
        countryValueCells.forEach(cell => cell.text("").property("hidden", false));
    }

    return {
        resetCountryDetails,
        showCountryDetails,
        showWorldTotals,
        setWorldVisible(isVisible) {
            worldDetailsRow.property("hidden", !isVisible);
        }
    };
}
