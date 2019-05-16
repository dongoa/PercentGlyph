///--------------
/// Simple Glyph Library based on d3.js  to create some simple glyphs based on a percentage number
/// by dongao
///--------------

//define class

function Percentglyph(width=200,height=120,colors=["#00ACE4", "#00D8A5", "#9b59b6", "#F1B719", "#e74c3c" ],color_deactivated='#e5e5e5'){
	//Define Variables
	this.outerWidth = width;
	this.outerHeight=height;
	this.colors=colors;
	this.color_deactivated=color_deactivated;
	this.color_current=Math.random() * colors.length;
	

	this.duration=700;
}
Percentglyph.prototype.donut =function(el,val,color,pathcolor="#fff"){
	
	this.donutf1=function(e){
		document.getElementById('pieText').style.color=e;
		document.getElementById('pieGlyph').innerHTML="";
		var e2=document.getElementById('p2').value;
		console.log(e);
		glyph.donut('#pieGlyph',val,e,e2);
	}
	this.donutf2=function(e){
			document.getElementById('pieGlyph').innerHTML="";
			var e2=document.getElementById('p1').value;
			console.log(e);
			glyph.donut('#pieGlyph',val,e2,e);
		}
	var that=this;

	var margin={top:25, right:50, bottom:1, left:5},
		innerWidth=that.outerWidth-margin.left-margin.right,
		innerHeight=that.outerHeight-margin.top-margin.bottom,
		radius=Math.min(innerWidth,innerHeight) / 2;
		data=[val,100-val],
		color=color||that.colors[Math.round(Math.random()*that.colors.length)];

	var arc=d3.arc()
	.outerRadius(radius)
	.innerRadius(radius - 10);

	var pie=d3.pie()
	.sort(null)
	.value(function(d){ return d; });

	var svg=d3.select(el).append("svg")
	.attr("width", that.outerWidth)
	.attr("height", that.outerHeight)
	.append("g")
	.attr("transform","translate("+(margin.left + innerWidth/2)+","+(margin.top+innerHeight/2)+")");

	var g=svg.selectAll(".arc")
	.data(pie(data))
	.enter().append("g")
	.style("opacity",0);

	var path=g.append("path")
	.attr("d",arc)
	.style("stroke-width","3px")
	.style("stroke",pathcolor)
	.style("fill",function(d,i) { var c = (i==0)?color : that.color_deactivated; return c;});

	//simple animation on load: opacity
	g.transition()
		.duration(that.duration)
		.ease(d3.easeQuad)
		.delay(function(d,i){ return 200*i; })
		.style("opacity",1);

	path.transition()
		.duration(that.duration)
		.ease(d3.easeQuad)
		.attrTween("d",arcTween);

	function arcTween(finish){
		var start={
			startAngle:0,
			endAngle:0
		};
		let i=d3.interpolate(start,finish);
		return function(d) { return arc(i(d)); }
	}

	
	Percentglyph.prototype.circle=function(el, val, color,color_deactivated='#e5e5e5'){
		this.circlef1=function(e){
		document.getElementById('circleText').style.color=e;
		document.getElementById('circleGlyph').innerHTML="";
		var e2=document.getElementById('c2').value;
	
		glyph.circle('#circleGlyph',val,e,e2);
		}
		this.circlef2=function(e){
				document.getElementById('circleGlyph').innerHTML="";
				var e2=document.getElementById('c1').value;
				console.log(e);
				glyph.circle('#circleGlyph',val,e2,e);
		}
		var that = this;
		var data=[val, 100-parseInt(val)],
		margin={top:14,right:10, bottom:20, left:10},
		innerWidth=that.outerHeight - margin.top - margin.bottom,
		color=color || that.colors[Math.round(Math.random() * that.colors.length)],
		paddingEl=14,
		elementsInRow=13,
		radius=4,
		row=1,
		dataset=[];

		data.forEach(function(d,i){
			while(d--){
				var c=(i==0) ? color : color_deactivated;
				dataset.push({color:c});
			}
		});
		var svg=d3.select(el).append("svg")
		.attr("width",that.outerWidth)
		.attr("height",that.outerHeight)
		.append("g")
		.attr("transform","translate("+(margin.left)+","+(margin.top)+")");

		var circle=svg.selectAll("circle")
		.data(dataset)
		.enter().append("circle")
		.style("fill",function(d,i){ return d.color; })
		.attr("r",0)
		.style("opacity",0)
		.attr("cx", function(d,i){ row = (i%elementsInRow==0)?i/elementsInRow:row; return ((i+1)-row*elementsInRow)*paddingEl; })
		.attr("cy", function(d,i){ row = (i%elementsInRow==0)?i/elementsInRow:row; return row*paddingEl; })

		circle.transition()
		.duration(that.duration)
		.delay(function(d,i){
			return 15*i;
		})
		.style("opacity",1)
		.attr("r",radius);
	}

	//horizontal bar, like a progress bar
	Percentglyph.prototype.barHorizontal=function(el,val,color,color_deactivated='#e5e5e5'){
		this.barHorizontalf1=function(e){
		document.getElementById('barHText').style.color=e;
		document.getElementById('barHGlyph').innerHTML="";
		var e2=document.getElementById('h2').value;
	
		glyph.barHorizontal('#barHGlyph',val,e,e2);
		}
		this.barHorizontalf2=function(e){
				document.getElementById('barHGlyph').innerHTML="";
				var e2=document.getElementById('h1').value;
				console.log(e);
				glyph.barHorizontal('#barHGlyph',val,e2,e);
		}

		var that=this;
		var data=[100,parseInt(val)],
		margin={top:20, right:0, bottom:0, left:10},
		innerWidth=that.outerWidth-margin.left-margin.right,
		innerHeight=that.outerHeight-margin.top-margin.bottom,
		color=color||that.colors[Math.round(Math.random()*that.colors.length)],
		marginInnerEl=12;

		var x=d3.scaleLinear()
		.range([0,innerWidth])
		.domain([0,d3.max(data,function(d){ return d; })]);

		var svg=d3.select(el).append("svg")
		.attr("width",that.outerWidth)
		.attr("height", that.outerHeight)
		.append("g")
		.attr("transform","translate("+(margin.left)+","+(innerHeight-5)+") rotate(0)");

		var g=svg.selectAll(".bar")
		.data(data)
		.enter().append("g")
		.style("opacity",0)
		.attr("transform",function(d,i){ marginEl=(i==1)?marginInnerEl/4:0; return "translate("+marginEl+","+marginEl+")"; })

		var rect=g.append("rect")
		.style("fill",function(d,i) { var c=(i==1)?color:color_deactivated; return c; })
		.attr("width",0)
		.attr("height",function(d,i){ marginEl=(i==1)?marginInnerEl:0; return innerHeight/4 - marginEl/2; })
		.attr("rx", marginInnerEl)
		.attr("ry",marginInnerEl);

		g.transition()
			.duration(that.duration)
			.delay(function(d,i){ return 200 * i; })
			.style("opacity",1);

		rect.transition()
			.duration(that.duration)
			.ease(d3.easeQuad)
			.delay(function(d,i){ return 200*i; })
			.attr("width",function(d,i){ marginEl=(i==1)?marginInnerEl:0; return x(d)-marginEl; })
	}


	Percentglyph.prototype.barVertical=function(el,val,color,rotate,color_deactivated='#e5e5e5'){
			this.barVerticalf1=function(e){
			document.getElementById('barVText').style.color=e;
			document.getElementById('barVGlyph').innerHTML="";
			var e2=document.getElementById('v2').value;
		
			glyph.barVertical('#barVGlyph',val,e,false,e2);
			}
			this.barVerticalf2=function(e){
					document.getElementById('barVGlyph').innerHTML="";
					var e2=document.getElementById('v1').value;
					console.log(e);
					glyph.barVertical('#barVGlyph',val,e2,false,e);
			}
			this.barVerticalf12=function(e){
			document.getElementById('barVText2').style.color=e;
			document.getElementById('barVGlyph2').innerHTML="";
			var e2=document.getElementById('vv2').value;
		
			glyph.barVertical('#barVGlyph2',val,e,true,e2);
			}
			this.barVerticalf22=function(e){
					document.getElementById('barVGlyph2').innerHTML="";
					var e2=document.getElementById('vv1').value;
					console.log(e);
					glyph.barVertical('#barVGlyph2',val,e2,true,e);
			}


			var that=this;
			var data=[100,parseInt(val)],
			margin=(rotate)?{top:20, right:70, bottom:20, left:5} : {top:20, right:50, bottom:1, left:10},
			innerWidth=that.outerWidth - margin.left - margin.right,
			innerHeight=that.outerHeight - margin.top - margin.bottom,
			rotate = rotate || false,
			color = color || that.colors[Math.round(Math.random() * that.colors.length)],
			marginInnerEl=5;

			var y=d3.scaleLinear()
			.range([innerHeight, 0])
			.domain([0, d3.max(data,function(d) { return d; })]);

			var svg=d3.select(el).append("svg")
			.attr("width",that.outerWidth)
			.attr("height",that.outerHeight)
			.append("g")
			.attr("transform",function(d) { var t=rotate ? "translate(" + (margin.left + innerWidth/2)+","+(0)+") rotate(45)":"translate("+(margin.left+innerWidth/2-innerHeight/2)+","+(margin.top-10)+")"; return t;} )

			var g=svg.selectAll(".bar")
			.data(data)
			.enter().append("g")
			.style("opacity",0)
			.attr("transform",function(d,i){ marginEl=(i==1)?marginInnerEl:0; return "translate(" + marginEl + "," + marginEl + ")"; })

			var rect=g.append("rect")
			.style("fill", function(d,i){ return (i==1)?color:color_deactivated; })
			.style("width",function(d,i){ marginEl=(i==1)?marginInnerEl:0; return innerHeight - marginEl*2; })
			.attr("y", function(d) { return innerHeight+marginInnerEl/2; })
			.attr("height",function(d,i) { return 0; })
			.attr("rx",marginInnerEl)
			.attr("ry",marginInnerEl);

			g.transition()
			.duration(that.duration)
			.delay(function(d,i){ return 200*i; })
			.style("opacity",1);

			rect.transition()
			.duration(that.duration)
			.ease(d3.easeQuad)
			.delay(function(d,i){ return 200*i; })
			.attr("y",function(d){ return y(d); })
			.attr("height",function(d,i){ marginEl=(i==0)?marginInnerEl*2:0; return innerHeight-y(d)+marginEl; })

	}
}