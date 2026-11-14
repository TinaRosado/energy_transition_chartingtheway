import * as d3 from "d3";

export function createCountrySearch({ input, wrapper, options, countries, countryByName, onInput, onSelect }) {
    let visibleCountries = [];
    let activeIndex = -1;

    function close() {
        options.property("hidden", true).selectAll("*").remove();
        visibleCountries = [];
        activeIndex = -1;
        input.attr("aria-expanded", "false").attr("aria-activedescendant", null);
    }

    function render(query) {
        const normalizedQuery = query.trim().toLocaleLowerCase();
        visibleCountries = normalizedQuery
            ? countries.filter(country => country.country.toLocaleLowerCase().includes(normalizedQuery))
            : countries;
        activeIndex = -1;

        options.property("hidden", false);
        input.attr("aria-expanded", "true").attr("aria-activedescendant", null);
        if (visibleCountries.length === 0) {
            options.selectAll("*").remove();
            options.append("div")
                .attr("class", "country-options-empty")
                .attr("role", "status")
                .text("No matching countries");
            return;
        }

        options.selectAll("button")
            .data(visibleCountries, country => country.code)
            .join("button")
            .attr("id", (_, index) => `country-option-${index}`)
            .attr("type", "button")
            .attr("role", "option")
            .attr("aria-selected", "false")
            .attr("tabindex", -1)
            .attr("class", "country-option")
            .text(country => country.country)
            .on("mousedown", event => event.preventDefault())
            .on("click", (_, country) => {
                input.property("value", country.country);
                close();
                onSelect(country);
            });
    }

    function activate(index) {
        if (visibleCountries.length === 0) {
            return;
        }
        activeIndex = (index + visibleCountries.length) % visibleCountries.length;
        options.selectAll("button")
            .classed("is-active", (_, optionIndex) => optionIndex === activeIndex)
            .attr("aria-selected", (_, optionIndex) => optionIndex === activeIndex ? "true" : "false");
        input.attr("aria-activedescendant", `country-option-${activeIndex}`);
        options.select(`#country-option-${activeIndex}`).node()?.scrollIntoView({ block: "nearest" });
    }

    input
        .on("focus", function () {
            render(this.value);
        })
        .on("input", function () {
            const query = this.value.trim();
            const match = countryByName.get(query.toLocaleLowerCase()) || null;
            onInput(query, match);
            if (match) {
                close();
            } else {
                render(query);
            }
        })
        .on("keydown", function (event) {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                if (options.property("hidden")) {
                    render(this.value);
                }
                activate(activeIndex + 1);
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                if (options.property("hidden")) {
                    render(this.value);
                }
                activate(activeIndex < 0 ? visibleCountries.length - 1 : activeIndex - 1);
            } else if (event.key === "Enter" && activeIndex >= 0) {
                event.preventDefault();
                options.select(`#country-option-${activeIndex}`).node()?.click();
            } else if (event.key === "Escape") {
                close();
            }
        })
        .on("blur", close);

    return {
        setSelection(country, syncValue) {
            const isSelected = country !== null;
            input.classed("is-selected", isSelected);
            wrapper.classed("is-selected", isSelected);
            if (syncValue) {
                input.property("value", country ? country.country : "");
            }
        }
    };
}
