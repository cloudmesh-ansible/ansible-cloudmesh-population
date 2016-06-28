
		var fields = [ 'Unemployment Rate', 'Population Density Change',
				'Bar Chart' ];
		var config = {
			"color1" : "#d3e5ff",
			"color2" : "#08306B",
			"stateDataColumn" : "state_or_territory",
			"defaultValue" : "Unemployment Rate",
			"state" : "state_or_territory"
		};

		//Width and height
		var w = Math.max(window.innerWidth);
		var h = Math.max(window.innerHeight);

		function drawMap(val) {
			document.getElementById("map").innerHTML = "";
			d3.select("svg").remove();
			if (val == "Bar Chart") {
				var margin = {
					top : 20,
					right : 90,
					bottom : 30,
					left : 60
				}, width = 1400 - margin.left - margin.right, height = 500
						- margin.top - margin.bottom;
				var x0 = d3.scale.ordinal().rangeRoundBands([ 0, width ], .1);

				var x1 = d3.scale.ordinal();

				var y = d3.scale.linear().range([ height, 0 ]);

				var color = d3.scale.category10();

				var xAxis = d3.svg.axis().scale(x0).orient("bottom");

				var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(
						d3.format(".2s"));

				var svg = d3.select("#map").append("svg").attr('width',
						width + margin.right + margin.left).attr('height',
						height + margin.top + margin.bottom).append("g").attr(
						"transform",
						"translate(" + margin.left + "," + margin.top + ")");

				var tip = d3.tip().attr("class", "d3-tip").offset([ -10, 0 ])
						.html(function(d) {
							return "No. of repairs: " + d.value;
						});

				d3.csv("test.csv", function(error, data) {
					if (error)
						throw error;
					fullData = data;
					data = d3.nest().key(function(d) {
						return d.STATE;
					}).rollup(
							function(values) {
								var counts = {}, keys = [ 'HC04_EST_VC03',
										'HC04_EST_VC04', 'HC04_EST_VC05',
										'HC04_EST_VC06', 'HC04_EST_VC07' ]
								keys.forEach(function(key) {
									counts[key] = d3.mean(values, function(d) {
										return d[key];
									})
								})
								return counts
							}).entries(data);
					//make the x axis
					svg.append("g").attr("class", "x axis").attr("transform",
							"translate(0," + height + ")").call(xAxis);
					//make teh y axis
					svg.append("g").attr("class", "y axis").call(yAxis).append(
							"text").attr("transform", "rotate(-90)").attr("y",
							0 - margin.left).attr("x", 0 - (height / 2)).attr(
							"dy", "1em").style("text-anchor", "middle").text(
							"Unemployment Rate");

					drawBarChart(data)

					var legend = svg.selectAll(".legend").data(
							[ '16 to 19 years', '20 to 24 years',
									'25 to 44 years', '45 to 54 years',
									'55 to 64 years' ]).enter().append("g")
							.attr("class", "legend").attr("transform",
									function(d, i) {
										return "translate(0," + i * 20 + ")";
									});

					legend.append("rect").attr("x", width - 18).attr("width",
							18).attr("height", 18).style("fill", function(d) {
						return color(d);
					});

					legend.append("text").attr("x", width - 24).attr("y", 9)
							.attr("dy", ".35em").style("text-anchor", "end")
							.text(function(d) {
								return d;
							});
				});

				function drawBarChart(data) {
					var yval = [];
					data.forEach(function(d) {
						yval.push(d.values.HC04_EST_VC03);
						yval.push(d.values.HC04_EST_VC04);
						yval.push(d.values.HC04_EST_VC05);
						yval.push(d.values.HC04_EST_VC06);
						yval.push(d.values.HC04_EST_VC07);
					});
					x0.domain(data.map(function(d) {
						return d.key;
					}));
					x1.domain(
							[ '16 to 19 years', '20 to 24 years',
									'25 to 44 years', '45 to 54 years',
									'55 to 64 years' ]).rangeRoundBands(
							[ 0, x0.rangeBand() ]);

					y.domain([ 0, d3.max(yval) ]);

					svg.call(tip);

					svg.selectAll("g .x").attr("class", "x axis").attr(
							"transform", "translate(0," + height + ")").call(
							xAxis);

					svg.selectAll("g .y").attr("class", "y axis").call(yAxis);

					var module = svg.selectAll(".module").data(data).enter()
							.append("g").attr("class", "module")
							.attr("transform", function(d) {
								return "translate(" + x0(d.key) + ",0)";
							});

					module
							.selectAll("rect")
							.data(function(d) {
								var ary = [];
								ary.push({
									name : "16 to 19 years",
									value : d.values.HC04_EST_VC03,
									key : d.key
								});
								ary.push({
									name : "20 to 24 years",
									value : d.values.HC04_EST_VC04,
									key : d.key
								});
								ary.push({
									name : "25 to 44 years",
									value : d.values.HC04_EST_VC05,
									key : d.key
								});
								ary.push({
									name : "45 to 54 years",
									value : d.values.HC04_EST_VC06,
									key : d.key
								});
								ary.push({
									name : "55 to 64 years",
									value : d.values.HC04_EST_VC07,
									key : d.key
								});
								return ary;
							})
							.enter()
							.append("rect")
							.attr("width", x1.rangeBand())
							.attr("x", function(d) {
								return x1(d.name);
							})
							.attr("y", function(d) {
								return y(d.value);
							})
							.attr("height", function(d) {
								return height - y(d.value);
							})
							.style("fill", function(d) {
								return color(d.name);
							})
							.append("title")
							.text(
									function(p, i) {
										console.log(p);
										return "Unemployment Rate of Age group "
												+ p.name + " is " + p.value;

									});

				}
			}
			if (val == "Unemployment Rate"
					|| val == "Population Density Change") {
				var param = "";

				//Create SVG element
				map = d3.select("#map").append("svg").attr("id", "usstates")
						.attr("width", w).attr("height", h);

				var maph = document.getElementById('usstates').clientHeight;

				d3.select("#legend").style("top", maph + 150 + "px");

				
				var p = d3.geo.albersUsa().translate([ w / 2, h / 2 ]).scale(
						[ 1000 ]);

				
				var path = d3.geo.path().projection(p);

				//load the geoJSON file for drawing the map
				d3
						.json(
								"states.json",
								function(error, states) {

									var newDict = {}; 
									var tip = d3
											.tip()
											.attr('class', 'd3-tip')
											.offset([ 40, 0 ])
											.html(
													function(d, i) {
														//console.log(d);
														return "<span class='statename'>"
																+ d.properties.name
																+ "</span>";
													})
											.html(
													function(d, i) {
														if (val == "Population Density Change")
															_temp = "Population Density Change : "
																	+ (parseFloat(newDict[i].score)
																			.toFixed(3));
														else
															_temp = "Unemployment Rate: "
																	+ parseInt(newDict[i].score / 100)
																	+ "%";

														return "<span class='statename'>"
																+ d.properties.name
																+ "</span>"
																+ "<hr/>"
																+ "<span class='mainno'>"
																+ _temp;

													})

									var mapstates = map.append("svg:g").attr(
											"id", "states").style("fill",
											"#dedee0")

									.style("stroke", "#aaa").style(
											"stroke-width", .5);

									mapstates.call(tip);

									mapstates.selectAll("path").data(
											states.features).enter().append(
											"path").attr("d", path);

									d3
											.csv(
													"test.csv",
													function(error, data) {
														var minValue = d3
																.min(
																		data,
																		function(
																				d,
																				data) {
																			if (val == "Population Density Change")
																				return 0;
																			else
																				return d.UNEMPLOY_2011_ACS_5_YEAR;
																		});
														var maxValue = d3
																.max(
																		data,
																		function(
																				d,
																				data) {
																			if (val == "Population Density Change")
																				return d.DENSITY_CHANGE;
																			else
																				return d.UNEMPLOY_2011_ACS_5_YEAR;
																		});

														var averaheKeyVal = d3
																.nest()
																.key(
																		function(
																				d) {
																			return d.STATE;
																		})
																.rollup(
																		function(
																				v) {
																			if (val == "Population Density Change") {
																				return d3
																						.mean(
																								v,
																								function(
																										d) {
																									return d.DENSITY_CHANGE;
																								});
																			} else {
																				return d3
																						.mean(
																								v,
																								function(
																										d) {
																									return d.UNEMPLOY_2011_ACS_5_YEAR;
																								});
																			}
																		})
																.entries(data);
														update();
														function update() {

															//Quantize scale for map
															var color = d3.scale
																	.linear()
																	.domain(
																			[
																					parseInt(minValue),
																					parseInt(maxValue) ])
																	.range(
																			[
																					"yellow",
																					"red" ])
																	.interpolate(
																			d3.interpolateLab);

															var _temp = averaheKeyVal;
															for (i in _temp) {

																// d.rank = + d.rank;

																_temp[i].values += _temp[i].values;
																newDict[i] = {
																	score : _temp[i].values
																};

															}
															;

															mapstates
																	.selectAll(
																			"path")

																	.attr("d",
																			path)
																	.on(
																			'mouseover',
																			function(
																					d) {

																				d3
																						.select(
																								this)
																						.style(
																								'fill-opacity',
																								.75);
																			})
																	.on(
																			'mouseout',
																			function(
																					d) {
																				d3
																						.select(
																								this)
																						.style(
																								"fill-opacity",
																								1);
																			})
																	.on(
																			'mouseover',
																			tip.show)
																	.on(
																			'mouseout',
																			tip.hide)
															mapstates
																	.selectAll(
																			"path")
																	.data(
																			states.features)

																	.attr(
																			"fill",
																			function(
																					d,
																					i) {
																				var _val = parseInt(newDict[i].score);

																				if (val == "Population Density Change")
																					_val = _val

																				if (newDict[i].score) {
																					if (val == "Population Density Change")
																						return color(parseInt(newDict[i].score * 1000))
																					else
																						return color(parseInt(newDict[i].score))
																				} else
																					return color(1);
																			});/*.append("title").text(
																																						function(p, i) {
																																							console.log(p);
																																							var _temp;
																														                                        if(val=="Population Density Change")
																																								_temp="Population Density Change : "+((newDict[i].score));
																																								else
																																								_temp="UnEmployment Rate: "+parseInt(newDict[i].score / 100)+ "%";
																																							return " State : " + p.properties.name
																																									+ "\n" 
																																									+ _temp
																																									;

																																						});*/

															//.attr("class", function(d){return newDict[d.key];})
															mapstates
																	.selectAll(
																			"text")
																	.data(
																			states.features)
																	.enter()
																	.append(
																			"text")
																	.html(
																			function(
																					d) {
																				return d.properties.abbr;
																			})
																	.attr(
																			"x",
																			function(
																					d) {
																				return path
																						.centroid(d)[0];
																			})
																	.attr(
																			"y",
																			function(
																					d) {
																				return path
																						.centroid(d)[1];
																			})
																	.attr(
																			"text-anchor",
																			"middle")
																	.attr(
																			'font-size',
																			11)
																	.attr(
																			'font-weight',
																			'normal')
																	.attr(
																			'color',
																			'black');

														}

													}); //close csv
								}); // close json
			}
		}

		/** Option list */
		var option_select = d3.select('#upperContainer').append("select").attr(
				"class", "option-select").on("change", function() {

			drawMap($("#upperContainer").find(".option-select").val());
		});
		for (var i = 0; i < fields.length; i++) {

			if (fields[i] !== config.state) {
				var opt = option_select.append("option").attr("value",
						fields[i]).text(fields[i]);

				if (fields[i] === config.defaultValue) {
					opt.attr("selected", "true");
				}
			}

		}

		drawMap(config.defaultValue);
	