# energy_transition_chartingtheway


## Project Title
Charting the Way: Reflecting on Three Decades of Energy Transition 

## Project Overview 
In 1992, the United Nations Framework Convention on Climate Change marked a pivotal moment by affirming the scientific consensus on the role of greenhouse gas emissions in global warming. This collective acknowledgment spurred action, culminating in the signing of the Kyoto Protocol in December 1997 by 192 state parties, committing to reducing greenhouse gas emissions. But how has this commitment translated into action?

This exploratory visualization traces the change in energy consumption since 1992, distinguishing between fossil fuel sources and low-carbon alternatives. It prompts us to consider whether our collective pursuit of transitioning to low-carbon sources aligns with the necessary momentum for meaningful change. Are we headed in the right direction?

The purpose of this project was to create a dynamic visualization that focuses on the direction of change in each country's energy transition rather than just the amount of energy consumed. This approach aims to foster a more balanced conversation about how each country is progressing individually and what this means for the collective efforts.

To achieve this objective, the design moves away from traditional renditions of time trends, like bar charts, and highlights the country’s energy consumption change as a radial line moving through time, akin to a compass . 
Project Overview

“The ways in which we visualize data can profoundly influence our perception of the information, much like tone and punctuation affect our interpretation of written words.”
— Tina Rosado

Originally created as a 2025 final project for the MFA in Information Design and Data Visualization, this visualization was updated in November 2026.

## Product  
Dynamic data visualization for the web.

## Run locally

The project uses Vite for local development and production builds. It requires Node.js 20.19 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build, run `npm run build` and `npm run preview`.

## Deploy to GitHub Pages

The production build is written to `docs/` with relative asset paths so it works from the repository's Pages URL. In the repository's **Settings → Pages**, set the source to **Deploy from a branch**, select `main`, and choose `/docs` as the folder. Run `npm run build` and include the updated `docs/` output in each commit that should be published.

## Using the visualization

Use the year slider to view each country's change in low-carbon and total fossil energy since 1992. The details table shows World values and a country search in the first column. Its Change group has low-carbon and fossil-fuel subcolumns; its Total group shows low-carbon, fossil fuels, and an all-sources sum. Search for or select a country, or click a chart marker, to show its values in the aligned row beside the search field. Hover or keyboard-focus a country to highlight its bearing. Selecting a country dims the others and reveals its past yearly coordinates as small circles through the year before the selected year; its values stay visible as the year changes. Clear the search field or click the selected country again to restore the full view.

Open “How to read this chart” above the year slider for a concise guide to the chart, scale, and interactions.

Countries remain visible even when the selected year has no reported source values or when a 1992 baseline is unavailable. These are shown as hollow gray markers at the origin and identified as having no data; missing values are not interpreted as zero consumption.

Unlabeled concentric circles follow the chart's symmetric logarithmic (symlog) scale and do not represent specific TWh values. The consumption changes themselves are calculated as linear TWh differences from 1992. The rightward arrow indicates increased low-carbon consumption, and the downward arrow indicates reduced fossil-fuel consumption.

## JavaScript structure

The application is initialized by `src/main.js`. Chart interaction state is coordinated in `src/chart.js`; supporting responsibilities are separated into focused modules:

- `src/data/energy-data.js` loads the dataset and calculates country and World changes from the 1992 baseline.
- `src/components/chart-scene.js` creates the SVG chart layers, radial guides, and direction axes.
- `src/components/country-search.js` manages the searchable, keyboard-accessible country suggestions.
- `src/components/details-table.js` formats and updates the World and selected-country values.

## Content 
A comparison of the change in energy consumption by country from 1992 to 2025.
