/* Wimbledon 2012 - Hero Graph */
/* Copyright 2013 Peter Cook (@prcweb); Licensed MIT */
var HeroGraphPlot = function(chartElementId, infoElementId, graph) {
	function translateSVG(x, y) {
	  return 'translate('+x+','+y+')';
	}

	function midpoint(p0, p1) {
	  return {x: 0.5*(p1.x + p0.x), y: 0.5*(p1.y + p0.y)};
	}

	function toObject(a, k) {
		return _.object(_.pluck(a, k), a);
	}

	function fullname(n) {
	  var s = n.split(' ');
	  return s.length === 3 ? s[2] + ' ' + s[0] + ' ' + s[1] : s[1] + ' ' + s[0];
	}

	function strFromArray(a) {
	  a = _.map(a, function(v) {return fullname(v) + ' (' + players[v].value + 'pts)';});
	  console.log(a);
	  return a.length === 1 ? a : a.slice(0, -1).join(', ') + ' & ' + a[a.length - 1];
	}

	function handleNodeClick(d) {
	  var s = fullname(d.name) + ' ('+ d.value +'pts)';
	  if(d.defeated !== undefined) {
		s += ' defeated ';
		s += strFromArray(d.defeated);
		if(d.defeatedBy !== undefined)
		  s += ' and ';

	  }
	  if(d.defeatedBy !== undefined) {
		s += ' was defeated by ';
		s += strFromArray(d.defeatedBy);
	  }

	  // console.log(d);

	  d3.select('#'+infoElementId)
		.text(s);
	}

	var color = d3.scale.category20();

	var force = d3.layout.force()
		.charge(-160)
		.linkDistance(70)
		.size([650, 650]);

	var players = {};

	var svg = d3.select("#"+chartElementId);

	var ptScale = d3.scale.log().domain([200, 13000]).range([1, 30]);

	  players = toObject(graph.nodes, 'name');

	  force
		  .nodes(graph.nodes)
		  .links(graph.links)
		  .start();

	  // console.log(graph);

	  var link = svg.selectAll(".link")
		  .data(graph.links)
		.enter().append("path")
		  .attr("class", "link")
		  .style("stroke-width", function(d) { return Math.sqrt(d.value); })
		  .attr('marker-mid', 'url(#Triangle)');
		// .enter().append("line")
		//   .attr("class", "link")
		//   .style("stroke-width", function(d) { return Math.sqrt(d.value); });

	  var node = svg.selectAll(".node")
		  .data(graph.nodes)
		.enter().append("g")
		  .attr("class", "node")
		  .on('mouseover', handleNodeClick);

	  node.append('circle')
		  .attr("r", function(d) {return ptScale(d.value);});

	  svg.selectAll('.node')
		.append('text')
		.text(function(d) {return fullname(d.name);})
		.attr('transform', function(d) {return translateSVG(0, -(ptScale(d.value) + 2));});

	  force.on("tick", function() {
		link.attr('d', function(d) {
		  var mid = midpoint(d.source, d.target);
		  return 'M'+d.source.x+' '+d.source.y+' L'+mid.x+' '+mid.y+' L'+d.target.x+' '+d.target.y;
		});
		// link.attr("x1", function(d) { return d.source.x; })
		//     .attr("y1", function(d) { return d.source.y; })
		//     .attr("x2", function(d) { return d.target.x; })
		//     .attr("y2", function(d) { return d.target.y; });

		node.attr('transform', function(d) {return translateSVG(d.x, d.y);})
	  });
};
