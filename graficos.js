// graficos.js

// Gráfico de líneas de muertes por comunidad
function lineChartMuertes(data, comunidad, selector) {
    const svg = d3.select(selector);
    svg.selectAll("*").remove(); // Limpiar contenido previo

    const width = +svg.attr("width") - 80;
    const height = +svg.attr("height") - 80;
    const g = svg.append("g").attr("transform", "translate(50,30)");

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = g.append("g").attr("transform", `translate(0,${height})`);
    const yAxis = g.append("g");

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.deaths));

    const tooltip = d3.select("body").append("div")
                      .attr("class", "tooltip")
                      .style("opacity", 0)
                      .style("position", "absolute")
                      .style("background", "#fff")
                      .style("padding", "5px")
                      .style("border", "1px solid #ccc")
                      .style("pointer-events", "none");

    const values = Object.entries(data[comunidad]).map(([year, deaths]) => ({
        year: +year,
        deaths: +deaths
    }));

    x.domain(d3.extent(values, d => d.year));
    y.domain([0, d3.max(values, d => d.deaths) * 1.1]);

    xAxis.call(d3.axisBottom(x).tickFormat(d3.format("d")));
    yAxis.call(d3.axisLeft(y));

    g.append("path")
        .datum(values)
        .attr("class", "line")
        .attr("stroke", "green")
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("d", line);

    const points = g.selectAll(".point").data(values);
    points.enter()
        .append("circle")
        .attr("class", "point")
        .attr("r", 6)
        .merge(points)
        .attr("cx", d => x(d.year))
        .attr("cy", d => y(d.deaths))
        .attr("fill", "black")
        .on("mouseover", (event, d) => {
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip.html(`Año: ${d.year}<br>Muertes: ${d.deaths}`)
                   .style("left", (event.pageX+10) + "px")
                   .style("top", (event.pageY-20) + "px");
        })
        .on("mouseout", () => tooltip.transition().duration(200).style("opacity", 0));
}

// function barChartAccidentes(data, selector) {...}

// function pieChartTipo(data, selector) {...}





