// linebreaking
function wrap(text, width, margin, fontsize) {
    console.log("wrapping");
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            y = parseInt(text.attr("y")),
            dy = 0,
            tspan = text.text(null).append("tspan")
                .attr("x", width / 2)
                .attr("y", y)
                .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width - margin) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("x", width / 2)
                    .attr("y", parseInt(y) + ++lineNumber * (fontsize + 10))
                    .text(word);
            }
        }
    });
}

function drawTaverncard(type, content) {

    var height = 670;
    var width = 440;
    var border_radius = 40;
    var margin = 20;

    var svg = d3.select('body');

    var taverncard = svg
        .append('svg')
        .attr('height', height)
        .attr('width', width);

    taverncard.append('rect')
        .attr('height', height)
        .attr('width', width)
        .attr('rx', border_radius)
        .attr('ry', border_radius)
        .attr('fill', 'floralwhite');

    taverncard.append('svg:image')
        .attr('preserveAspectRatio', 'none')
        .attr('height', height - (2 * margin))
        .attr('width', width - (2 * margin))
        .attr('x', margin)
        .attr('y', margin)
        .attr('xlink:href', '/img/parchment.png');

    switch (type){
        case "victory points":
            taverncard.append('svg:image')
            .attr('preserveAspectRatio', 'none')
            .attr('height', (height - (2 * margin)) / 5)
            .attr('width', (width - (2 * margin)) / 3)
            .attr('x', width / 2 - (width - (2 * margin)) / 6)
            .attr('y', height / 6)
            .attr('xlink:href', '/img/victorypoint.png');

            var content_text = taverncard.append('text')
                .attr('font-size', 32)
                .attr('font-family', 'Candara')
                .attr('text-anchor', 'middle')
                .attr('x', width / 2)
                .attr('y', 3 * height / 7)
                .text(content[0]);

            content_text.call(wrap, width, 8 * margin, 32);

            taverncard.append('text')
                .attr('font-size', 36)
                .attr('font-weight', 'bold')
                .attr('font-family', 'Candara')
                .attr('text-anchor', 'middle')
                .attr('x', width / 2)
                .attr('y', 3 * height/4)
                .text(content[1] + ((content[1] > 1) ? " Ruhmpunkte" : " Ruhmpunkt"));
            break;

        case "combat":
            taverncard.append('svg:image')
                .attr('preserveAspectRatio', 'none')
                .attr('height', height / 8)
                .attr('width', width / 2)
                .attr('x', width / 2 - width/4)
                .attr('y', height / 7)
                .attr('xlink:href', '/img/combat.png');

            taverncard.append('text')
                .attr('font-size', 36)
                .attr('font-weight', 'bold')
                .attr('font-family', 'Candara')
                .attr('text-anchor', 'middle')
                .attr('x', width / 2)
                .attr('y', height / 3)
                .text(content[0]);

            var content_text = taverncard.append('text')
                .attr('font-size', 24)
                .attr('font-family', 'Candara')
                .attr('text-anchor', 'middle')
                .attr('x', width / 2)
                .attr('y', 3 * height / 7)
                .text(content[1]);

            content_text.call(wrap, width, 8 * margin, 24);
            break;
        case "upgrade":
            taverncard.append('svg:image')
                .attr('height', height / 8)
                .attr('x', width / 8)
                .attr('y', height / 10)
                .attr('xlink:href', '/img/upgrade.png');

            taverncard.append('svg:image')
                .attr('height', height / 8)
                .attr('x', 3 * width / 4)
                .attr('y', height / 10)
                .attr('xlink:href', '/img/upgrade.png');

            taverncard.append('text')
                .attr('font-size', 36)
                .attr('font-weight', 'bold')
                .attr('font-family', 'Candara')
                .attr('text-anchor', 'middle')
                .attr('x', width / 2)
                .attr('y', height / 3)
                .text(content[0]);

            var content_text = taverncard.append('text')
                .attr('font-size', 24)
                .attr('font-family', 'Candara')
                .attr('text-anchor', 'middle')
                .attr('x', width / 2)
                .attr('y', 3 * height / 7)
                .text(content[1]);

            content_text.call(wrap, width, 8 * margin, 24);

            var extra_text = taverncard.append('text')
                .attr('font-size', 26)
                .attr('font-weight', 'bold')
                .attr('font-family', 'Candara')
                .attr('text-anchor', 'middle')
                .attr('x', width / 2)
                .attr('y', 5 * height / 7)
                .text(content[2]);

            extra_text.call(wrap, width, 11 * margin, 26);
            break;
        case "special upgrade":
            taverncard.append('svg:image')
                .attr('height', height / 8)
                .attr('x', width / 8)
                .attr('y', height / 10)
                .attr('xlink:href', function (){
                    switch (content[0]){
                        case "Neue Segel": return '/img/sail.png';
                        case "Neue Crew": return '/img/crew.png';
                        case "Neue Kanonen": return '/img/cannon.png';
                        case "Neuer Laderaum": return '/img/storage.png';
                    }
                });

            taverncard.append('svg:image')
                .attr('height', height / 8)
                .attr('x', 3 * width / 4 - width / 16)
                .attr('y', height / 10)
                .attr('xlink:href', function (){
                    switch (content[0]){
                        case "Neue Segel": return '/img/sail.png';
                        case "Neue Crew": return '/img/crew.png';
                        case "Neue Kanonen": return '/img/cannon.png';
                        case "Neuer Laderaum": return '/img/storage.png';
                    }
                });

            taverncard.append('text')
                .attr('font-size', 36)
                .attr('font-weight', 'bold')
                .attr('font-family', 'Candara')
                .attr('text-anchor', 'middle')
                .attr('x', width / 2)
                .attr('y', height / 3)
                .text(content[0]);

            var content_text = taverncard.append('text')
                .attr('font-size', 24)
                .attr('font-family', 'Candara')
                .attr('text-anchor', 'middle')
                .attr('x', width / 2)
                .attr('y', 3 * height / 7)
                .text(content[1]);

            content_text.call(wrap, width, 8 * margin, 24);

            var extra_text = taverncard.append('text')
                .attr('font-size', 26)
                .attr('font-weight', 'bold')
                .attr('font-family', 'Candara')
                .attr('text-anchor', 'middle')
                .attr('x', width / 2)
                .attr('y', 5 * height / 7)
                .text(content[2]);

            extra_text.call(wrap, width, 11 * margin, 26);
            break;
        case "other": break;
    }


}

function drawPiratecard(values) {

    var height = 670;
    var width = 440;
    var border_radius = 40;
    var margin = 20;
    var fontsize = 100;

    var svg = d3.select('body');

    var piratecard = svg
        .append('svg')
        .attr('height', height)
        .attr('width', width);

    piratecard.append('rect')
        .attr('height', height)
        .attr('width', width)
        .attr('rx', border_radius)
        .attr('ry', border_radius)
        .attr('fill', 'floralwhite');

    piratecard.append('svg:image')
        .attr('preserveAspectRatio', 'none')
        .attr('height', height - (2 * margin))
        .attr('width', width - (2 * margin))
        .attr('x', margin)
        .attr('y', margin)
        .attr('xlink:href', '/img/parchment.png');

    piratecard.append('svg:image')
        .attr('height', (height - (2 * margin)) / 5)
        .attr('width', (width - (2 * margin)) / 3)
        .attr('x', 90)
        .attr('y', 80)
        .attr('xlink:href', '/img/victorypoint.png');

    piratecard.append('text')
        .attr('x', width - 140)
        .attr('y', 150)
        .attr('font-family', 'Candara')
        .attr('font-weight', 'bold')
        .attr('font-size', fontsize)
        .text(values[0]);

    piratecard.append('svg:image')
        .attr('height', (height - (2 * margin)) / 5)
        .attr('width', (width - (2 * margin)) / 3)
        .attr('x', 90)
        .attr('y', 210)
        .attr('xlink:href', '/img/coins.png');

    piratecard.append('text')
        .attr('x', width - 140)
        .attr('y', 150 + 135)
        .attr('font-family', 'Candara')
        .attr('font-weight', 'bold')
        .attr('font-size', fontsize)
        .text(values[1]);

    piratecard.append('svg:image')
        .attr('height', (height - (2 * margin)) / 5)
        .attr('width', (width - (2 * margin)) / 3)
        .attr('x', 90)
        .attr('y', 340)
        .attr('xlink:href', '/img/treasures.png');

    piratecard.append('text')
        .attr('x', width - 140)
        .attr('y', 150 + 2 * 135)
        .attr('font-family', 'Candara')
        .attr('font-weight', 'bold')
        .attr('font-size', fontsize)
        .text(values[2]);

    piratecard.append('svg:image')
        .attr('height', (height - (2 * margin)) / 5 - 10)
        .attr('width', (width - (2 * margin)) / 3 - 10)
        .attr('x', 90)
        .attr('y', 470)
        .attr('xlink:href', '/img/taverncard.png');

    piratecard.append('text')
        .attr('x', width - 140)
        .attr('y', 150 + 3 * 135)
        .attr('font-family', 'Candara')
        .attr('font-weight', 'bold')
        .attr('font-size', fontsize)
        .text(values[3]);

}
