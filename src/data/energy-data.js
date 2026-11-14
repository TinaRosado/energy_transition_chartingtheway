import * as d3 from "d3";
import DATA_URL from "../../EnergyConsumption/newDATA/primary-energy-use-by-source.csv?url";

export const BASELINE_YEAR = 1992;

const LOW_CARBON_SOURCES = [
    "Other renewables",
    "Biofuels",
    "Solar",
    "Wind",
    "Hydropower",
    "Nuclear"
];
const FOSSIL_SOURCES = ["Gas", "Oil", "Coal"];
const ENERGY_SOURCES = [...LOW_CARBON_SOURCES, ...FOSSIL_SOURCES];

function sumSources(row, sources) {
    return sources.reduce((total, source) => {
        const rawValue = row[source];
        if (rawValue === "" || rawValue == null) {
            return total;
        }

        const value = Number(rawValue);
        if (!Number.isFinite(value)) {
            throw new Error(`Invalid ${source} value for ${row.Entity} in ${row.Year}.`);
        }
        return total + value;
    }, 0);
}

function hasSourceData(row) {
    return row !== undefined && ENERGY_SOURCES.some(source => {
        const rawValue = row[source];
        return rawValue !== "" && rawValue != null && Number(rawValue) > 0;
    });
}

function getEnergyValues(row) {
    return {
        lowcarbon: sumSources(row, LOW_CARBON_SOURCES),
        fossil: sumSources(row, FOSSIL_SOURCES)
    };
}

export async function loadEnergyData(lastYear) {
    const data = await d3.csv(DATA_URL);
    const worldRowsByYear = new Map();
    const worldSourceRows = data
        .filter(row => row.Code === "OWID_WRL")
        .sort((a, b) => +a.Year - +b.Year);
    const worldBaseline = worldSourceRows.find(row => +row.Year === BASELINE_YEAR);
    if (!worldBaseline) {
        throw new Error("The dataset does not contain a World value for 1992.");
    }

    const worldBaselineValues = getEnergyValues(worldBaseline);
    worldSourceRows.forEach(row => {
        const year = +row.Year;
        if (year < BASELINE_YEAR) {
            return;
        }

        const values = getEnergyValues(row);
        worldRowsByYear.set(year, {
            code: row.Code,
            country: row.Entity,
            year,
            ...values,
            lowcarbonDiff: values.lowcarbon - worldBaselineValues.lowcarbon,
            fossilDiff: values.fossil - worldBaselineValues.fossil
        });
    });

    const dataByCode = d3.group(
        data.filter(row => row.Code && !row.Code.startsWith("OWID_")),
        row => row.Code
    );
    const dataDifferences = [];

    dataByCode.forEach(countryRows => {
        const baseline = countryRows.find(row => +row.Year === BASELINE_YEAR);
        const baselineHasData = hasSourceData(baseline);
        const baselineValues = baselineHasData ? getEnergyValues(baseline) : null;
        const rowsByYear = new Map(countryRows.map(row => [+row.Year, row]));
        const firstRow = countryRows[0];

        for (let year = BASELINE_YEAR; year <= lastYear; year += 1) {
            const row = rowsByYear.get(year);
            if (!baselineHasData || !hasSourceData(row)) {
                dataDifferences.push({
                    code: firstRow.Code,
                    country: firstRow.Entity,
                    year,
                    isNoData: true,
                    noDataReason: baselineHasData ? "year" : "baseline"
                });
                continue;
            }

            const values = getEnergyValues(row);
            dataDifferences.push({
                code: row.Code,
                country: row.Entity,
                ...values,
                year,
                lowcarbonDiff: values.lowcarbon - baselineValues.lowcarbon,
                fossilDiff: values.fossil - baselineValues.fossil,
                isNoData: false
            });
        }
    });

    dataDifferences.sort((a, b) => a.year - b.year);
    const maxDiff = d3.max(dataDifferences.filter(row => !row.isNoData), row =>
        Math.max(Math.abs(row.lowcarbonDiff), Math.abs(row.fossilDiff))
    ) || 1;
    const countryRowsByCode = d3.group(dataDifferences, row => row.code);
    const countryByName = new Map(
        Array.from(countryRowsByCode, ([code, rows]) => [
            rows[0].country.toLocaleLowerCase(),
            { code, country: rows[0].country }
        ])
    );
    const countries = Array.from(countryByName.values())
        .sort((a, b) => d3.ascending(a.country, b.country));

    return {
        countries,
        countryByName,
        countryRowsByCode,
        dataDifferences,
        maxDiff,
        worldRowsByYear
    };
}
