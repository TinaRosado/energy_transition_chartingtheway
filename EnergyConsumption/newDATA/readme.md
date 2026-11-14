# Primary energy use by source - Data package

This data package contains the data that powers the chart ["Primary energy use by source"](https://ourworldindata.org/grapher/energy-mix?v=1&csvType=full&useColumnShortNames=false&source=total&metric=by_source) on the Our World in Data website.

### Active Filters

A filtered subset of the full data was downloaded. The following filters were applied:

## CSV structure

Each row is an observation for an entity (usually a country or region) at a timepoint.

- "Entity" — the name of the entity, e.g. "United States".
- "Code" — our internal entity code. For most countries this is the [ISO alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) code, e.g. "USA"; historical and other non-standard entities get a custom code.
- "Year" or "Day" — the timepoint. Annual data has a "Year" column holding an integer year; otherwise a "Day" column holds a date string in the form "YYYY-MM-DD".
- Every remaining column is a data column, each one a time series. Downloaded with the "full data" option each corresponds to one time series below; with "only selected data visible in the chart" they are transformed depending on the chart type, so the correspondence may be less direct.


## Metadata.json structure

The .metadata.json file contains metadata about the data package. The "charts" key contains information to recreate the chart, like the title, subtitle etc. The "columns" key contains information about each of the columns in the csv, like the unit, timespan covered, citation for the data etc.

## How we process data at Our World in Data

Our World in Data is almost never the original producer of the data - almost all of the data we use has been compiled by others. If you want to re-use data, it is your responsibility to ensure that you adhere to the sources' license and to credit them correctly. Please note that a single time series may have more than one source - e.g. when we stitch together data from different time periods by different producers or when we calculate per capita metrics using population data from a second source.

Preparing this data involves several processing steps. Depending on the data, this can include standardizing country names and world region definitions, converting units, calculating derived indicators such as per capita measures, as well as adding or adapting metadata such as the name or the description given to an indicator.
[Read about our data pipeline](https://docs.owid.io/projects/etl/).

## Detailed information about each time series


### Other renewables
Measured in terawatt-hours of total energy supply.
Last updated: June 30, 2026  
Next expected update: June 2027  
Date range: 1800–2025  
Unit: terawatt-hours  
Source: Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data  

#### How to cite this data

Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data

#### How this data is described by its producers
Based on gross generation and not accounting for cross-border electricity supply. Energy from non-combustible renewable generation is accounted for on the energy content of their gross electrical output. See https://www.energyinst.org/statistical-review for more details on this methodology.

#### Notes on our processing step for this indicator
- For the World, data before 1965 (going back to 1800) comes from Vaclav Smil's historical estimates (2017).


### Biofuels
Measured in terawatt-hours of total energy supply.
Last updated: June 30, 2026  
Next expected update: June 2027  
Date range: 1800–2025  
Unit: terawatt-hours  
Source: Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data  

#### How to cite this data

Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data

#### How this data is described by its producers
Includes biogasoline (such as ethanol) and biodiesel (including sustainable aviation fuels). Volumes have been adjusted for energy content.

#### Notes on our processing step for this indicator
- For the World, data before 1965 (going back to 1800) comes from Vaclav Smil's historical estimates (2017).


### Solar
Measured in terawatt-hours of total energy supply.
Last updated: June 30, 2026  
Next expected update: June 2027  
Date range: 1800–2025  
Unit: terawatt-hours  
Source: Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data  

#### How to cite this data

Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data

#### How this data is described by its producers
Based on gross generation and not accounting for cross-border electricity supply. Energy from non-combustible renewable generation is accounted for on the energy content of their gross electrical output. See https://www.energyinst.org/statistical-review for more details on this methodology.

#### Notes on our processing step for this indicator
- For the World, data before 1965 (going back to 1800) comes from Vaclav Smil's historical estimates (2017).


### Wind
Measured in terawatt-hours of total energy supply.
Last updated: June 30, 2026  
Next expected update: June 2027  
Date range: 1800–2025  
Unit: terawatt-hours  
Source: Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data  

#### How to cite this data

Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data

#### How this data is described by its producers
Based on gross generation and not accounting for cross-border electricity supply. Energy from non-combustible renewable generation is accounted for on the energy content of their gross electrical output. See https://www.energyinst.org/statistical-review for more details on this methodology.

#### Notes on our processing step for this indicator
- For the World, data before 1965 (going back to 1800) comes from Vaclav Smil's historical estimates (2017).


### Hydropower
Measured in terawatt-hours of total energy supply.
Last updated: June 30, 2026  
Next expected update: June 2027  
Date range: 1800–2025  
Unit: terawatt-hours  
Source: Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data  

#### How to cite this data

Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data

#### How this data is described by its producers
Based on gross generation and not accounting for cross-border electricity supply. Energy from non-combustible renewable generation is accounted for on the energy content of their gross electrical output. See https://www.energyinst.org/statistical-review for more details on this methodology.

#### Notes on our processing step for this indicator
- For the World, data before 1965 (going back to 1800) comes from Vaclav Smil's historical estimates (2017).


### Nuclear
Measured in terawatt-hours of total energy supply.
Last updated: June 30, 2026  
Next expected update: June 2027  
Date range: 1800–2025  
Unit: terawatt-hours  
Source: Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data  

#### How to cite this data

Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data

#### How this data is described by its producers
Based on gross generation and not accounting for cross-border electricity supply. Energy from non-combustible renewable generation is accounted for on the energy content of their gross electrical output. See https://www.energyinst.org/statistical-review for more details on this methodology.

#### Notes on our processing step for this indicator
- For the World, data before 1965 (going back to 1800) comes from Vaclav Smil's historical estimates (2017).


### Gas
Measured in terawatt-hours of total energy supply.
Last updated: June 30, 2026  
Next expected update: June 2027  
Date range: 1800–2025  
Unit: terawatt-hours  
Source: Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data  

#### How to cite this data

Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data

#### How this data is described by its producers
Excludes natural gas converted to liquid fuels but includes derivatives of coal as well as natural gas consumed in Gas-to-Liquids transformation. The difference between these world consumption figures and the world production statistics is due to variations in stocks at storage facilities and liquefaction plants, together with unavoidable disparities in the definition, measurement or conversion of gas supply and demand data.

#### Notes on our processing step for this indicator
- For the World, data before 1965 (going back to 1800) comes from Vaclav Smil's historical estimates (2017).


### Oil
Measured in terawatt-hours of total energy supply.
Last updated: June 30, 2026  
Next expected update: June 2027  
Date range: 1800–2025  
Unit: terawatt-hours  
Source: Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data  

#### How to cite this data

Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data

#### How this data is described by its producers
Inland demand plus international aviation and marine bunkers and refinery fuel and loss. Consumption of biogasoline (such as ethanol) and biodiesel are excluded while derivatives of coal and natural gas are included. Differences between these world consumption figures and world production statistics are accounted for by stock changes, consumption of non-petroleum additives and substitute fuels and unavoidable disparities in the definition, measurement or conversion of oil supply and demand data.

#### Notes on our processing step for this indicator
- For the World, data before 1965 (going back to 1800) comes from Vaclav Smil's historical estimates (2017).


### Coal
Measured in terawatt-hours of total energy supply.
Last updated: June 30, 2026  
Next expected update: June 2027  
Date range: 1800–2025  
Unit: terawatt-hours  
Source: Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data  

#### How to cite this data

Energy Institute – Statistical Review of World Energy (2026); Smil (2017) – with major processing by Our World in Data

#### How this data is described by its producers
Commercial solid fuels only, i.e. bituminous coal and anthracite (hard coal), and lignite and brown (sub-bituminous) coal, and other commercial solid fuels. Excludes coal converted to liquid or gaseous fuels, but includes coal consumed in transformation processes. Differences between these consumption figures and the world production statistics are accounted for by stock changes, and unavoidable disparities in the definition, measurement or conversion of coal supply and demand data.

#### Notes on our processing step for this indicator
- For the World, data before 1965 (going back to 1800) comes from Vaclav Smil's historical estimates (2017).


## Sources

These are the sources behind the data in this package. Each time series above names the ones it draws on in its citation.

### Energy Institute – Statistical Review of World Energy

The Energy Institute Statistical Review of World Energy analyses data on world energy markets from the prior year.

Producer: Energy Institute  
Published: 2026-06-30  
Retrieved on: 2026-07-02  
Retrieved from: https://www.energyinst.org/statistical-review/  
License: © Energy Institute 2026 (https://www.energyinst.org/terms)  

Citation: Energy Institute – Statistical Review of World Energy (2026).

### Smil – Energy Transitions: Global and National Perspectives

Producer: Smil  
Published: 2017-01-01  
Retrieved on: 2023-12-12  
Retrieved from: https://vaclavsmil.com/book/energy-transitions-global-and-national-perspectives-second-expanded-and-updated-edition/  
License: CC BY 4.0 (https://vaclavsmil.com/book/energy-transitions-global-and-national-perspectives-second-expanded-and-updated-edition/)  

Citation: Energy Transitions: Global and National Perspectives, 2nd edition, Appendix A, Vaclav Smil (2017).

    