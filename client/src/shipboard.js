function drawShipboard() {
    var storage = [12, 10, 9, 8, 7, 6, 5, 4];
    var cannons = [5, 5, 4, 4, 3, 3, 2, 2];
    var crew = [5, 5, 4, 4, 3, 3, 2, 2];
    var sails = [12, 10, 9, 8, 7, 6, 5, 4];
    var stagevalues = [storage, cannons, crew, sails];

    var height = 720;
    var width = 1280;
    var radius = 40;

    var svg = d3.select('body');

    var shipboard = svg
        .append('svg')
        .attr('height', height)
        .attr('width', width);

    shipboard.append('svg:image')
        .attr('preserveAspectRatio', 'none')
        .attr('height', height)
        .attr('width', width)
        .attr('opacity', '70%')
        .attr('xlink:href', '/img/shipboard.jpg');

    for (let i = 0; i < 4; i++) {

        var right = true;
        var area = shipboard.append('svg')
            .attr('width', 200 + radius)
            .attr('height', 520)
            .attr('x', 50 + i * 315)
            .attr('y', 120);

        for (let j = 0; j < storage.length; j++) {
            area.append('circle')
                .attr('cx', radius + (right ? 150 : 0))
                .attr('cy', radius + 60 * j)
                .attr('r', radius)
                .attr('stroke', 'black')
                .attr('opacity', '50%')
                .attr('fill', 'blue');

            area.append('rect')
                .attr('x', 60 + 315 * i)
                .attr('y', 10 + radius + 60 * j)
                .attr('width', 100)
                .attr('height', 20)
                .attr('fill', 'blue')
                .attr('opacity', '50%')
                .attr('transform', right ? 'rotate(-20,' + (110 + 315 * i) + ',' + (10 + radius + 60 * j) +')' : 'rotate(20,' + (110 + 315 * i) + ',' + (10 + radius + 60 * j) +')');

            area.append('text')
                .attr('x', radius + (right ? 150 : 0))
                .attr('y', radius + 60 * j + 20)
                .attr('fill', 'black')
                .attr('stroke', 'white')
                .attr('stroke-width', '2px')
                .attr('font-weight', 'bold')
                .attr('font-size', 60)
                .attr('text-anchor', 'middle')
                .text(stagevalues[i][j]);
            right = (!right);
        }
    }


}
