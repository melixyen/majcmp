<template>
	<div>
		<svg :width="_width" :height="_height" :style="getSvgStyle()" ref="svg">
            
            <!-- <g v-for="(p, idx) in _datas"> -->
                <path v-for="(p, idx) in _datas" :d="getPath(p)" :style="getPathStyle(p, idx)" :fill="p.color" v-if="p.count>0" class="pie" />
                <text v-for="(p, idx) in _datas" :x="p.textPosition.x" :y="p.textPosition.y" :font-size="_fontSize" :stroke="p.fontColor" text-anchor="middle" alignment-baseline="middle" v-if="p.count>0" class="word"> 
                    <tspan :x="p.textPosition.x" :y="p.textPosition.y - (_fontSize / 2)" v-show="p.textPosition.display">{{p.name}}</tspan>
                    <tspan :x="p.textPosition.x" :y="p.textPosition.y + (_fontSize / 1.8)" v-show="p.textPosition.display">{{p.text}}</tspan>
                </text>
            <!-- </g> -->
            <circle :r="_halfDiameter" :cx="_centerX" :cy="_centerX" :style="pieAniStyle" v-show="flagShowCircle" />
        </svg>
	</div>
</template>

<script>
    export default {
        name: "lu-pie-chart",
        props: [
            'diameter', 'bgcolor', 'pretext', 'datas', 'minTextDegree', 'displayMinText', 'fontSize', 'animate'
        ],
        computed: {
            aniTimeMS: function(){
                return 1000;
            },
            exampleData: function(){
                return {
                    title: "Hello",
                    pretext: "票數",
                    datas: [{
                        name: "A",
                        count: 36,
                        color: "#ff0000",
                        fontColor: "#ffffff"
                    }]
                }
            },
            pieAniStyle: function(){
                var len = this._diameter * 3.14159;
                var singleDegreeLen = len / 360;
                var color = this.bgcolor;
                var moveLen = this.dynamicCircleDegree * singleDegreeLen;
                if(!color || color=='transparent') color = '#ffffff';
                var rt = 'transform-box: fill-box; transform-origin:center; transform:rotate(-90deg); fill:transparent; stroke:' + color + '; stroke-width:' + this._diameter + '; stroke-dasharray:0 ' + moveLen + ' ' + len + ' 100;';
                return rt;
            },
            _datas: function(){
                const CIRCLE_DEGREE = 360;
                let cnt = this.datas.length;
                let diameter = this._diameter;
                let pdTop = this.pdTop;
                let pdLeft = this.pdLeft;
                let halfDiameter = diameter / 2;
                let circleCenter = {x: halfDiameter + pdLeft, y: halfDiameter + pdTop};
                var cx = this._centerX;
                var cy = this._centerY;
                var r = this._halfDiameter;

                var totalCount = this.datas.reduce((val, item)=>{  return val + item.count; }, 0)
                let maxValue = 0;
                let lastDegree = -90;
                let ary = this.datas.map((c, idx, arr)=>{
                    c.percent = Math.round(c.count / totalCount * 10000) / 100;
                    c.degreeStart = lastDegree;
                    c.degree = Math.round(CIRCLE_DEGREE * c.percent * 100) / 10000;
                    c.drawDegree = lastDegree + c.degree;
                    c.degreeMid = (c.drawDegree - c.degreeStart) / 2 + c.degreeStart;
                    // if(c.drawDegree == 360) c.drawDegree = 359.99;

                    c.x0 = this.calc4(cx+r*Math.cos(lastDegree*Math.PI/180));
                    c.y0 = this.calc4(cx+r*Math.sin(lastDegree*Math.PI/180));
                    c.x1 = this.calc4(cx+r*Math.cos(c.drawDegree*Math.PI/180));
                    c.y1 = this.calc4(cx+r*Math.sin(c.drawDegree*Math.PI/180));

                    c.xMid = this.calc4(cx+r*Math.cos(c.degreeMid*Math.PI/180));
                    c.yMid = this.calc4(cx+r*Math.sin(c.degreeMid*Math.PI/180));

                    c.textPosition = this.showTextPosition(c.xMid, c.yMid, c.degree);
                    c.text = this.pretext + ': ' + c.count;

                    maxValue = Math.max(c.count, maxValue);

                    lastDegree = c.drawDegree;
                    return c;
                })
                return ary;
            },
            _diameter: function () { return +this.diameter || 600 ;},
            _halfDiameter: function(){ return this._diameter / 2 ;},
            _bgcolor: function () { return this.bgcolor || '#ffffff' ;},
            _fontSize: function() { return this.fontSize || 16 ;},
            _width: function() { return this._diameter + 100 ;},
            _height: function() { return this._diameter + 100 ;},
            _minTextDegree: function(){ return (this.minTextDegree) ? parseFloat(this.minTextDegree) : 30 ;},
            _centerX: function() { return this.pdLeft + this._halfDiameter},
            _centerY: function() { return this.pdTop + this._halfDiameter},
        },
        data() {return {
            flagShowCircle: false,
            pdLeft: 50,
            pdTop: 50,
            pdRight: 50,
            pdBottom: 50,
            startAni: 0,
            dynamicCircleDegree: 0
        }},
        methods: {
            calc4: function(num){
                return Math.round(num * 10000) / 10000;
            },
            getPath: function(p){
                var cx = this._centerX;
                var cy = this._centerY;
                var r = this._halfDiameter;
                var arcLargeParam = (p.degree < 180) ? "0" : "1";
                return "M" + cx + " " + cy + " L" + p.x0 + " " + p.y0 + " A" + r + " " + r + " 0 " + arcLargeParam + " 1 " + p.x1 + " " + p.y1 + " Z";
            },
            getPathStyle: function(p, idx){
                var rt = '';
                return rt;
            },
            getSvgStyle: function() {
                let bgcolor = this.bgcolor || '#ffffff';
                return 'background-color:' + bgcolor + ';';
            },
            getCoordinatesForPercent: function(percent) {
                const x = Math.cos(2 * Math.PI * percent);
                const y = Math.sin(2 * Math.PI * percent);
                
                return [x, y];
            },
            showTextPosition: function(x, y, degree){
                if(degree <= this.minTextDegree){
                    return {x:x, y:y, display:!!this.displayMinText}
                }else{
                    return {
                        x: ((x - this._centerX) / 2) + this._centerX,
                        y: ((y - this._centerY) / 2) + this._centerY,
                        display: true
                    }
                }
            },
            aniDrawCircle: function(){
                var now = Date.now();
                var moveOverTime = now - this.startAni;
                var moveLessTime = this.aniTimeMS - moveOverTime;
                
                if( moveLessTime > 0 ){
                    this.flagShowCircle = true;
                    var moveRate = moveOverTime / this.aniTimeMS;
                    this.dynamicCircleDegree = moveRate * 360;
                    requestAnimationFrame(this.aniDrawCircle);
                }else{
                    this.flagShowCircle = false;
                    
                }
            },
            enableDraw: function(){
                if(this.animate) {
                    this.startAni = Date.now();
                    requestAnimationFrame(this.aniDrawCircle);
                }
            },
            enableDraw2: function(){
                if(this.animate) {
                    let svg = this.$refs.svg;
                    let pies = svg.querySelectorAll('path.pie');
                    let texts = svg.querySelectorAll('text.word');
                    texts.forEach((t)=>{
                        t.style.display = 'none';
                    })
                    pies.forEach((p, idx)=>{
                        p.style.opacity = 0;
                    })
                    
                    pies.forEach((p, idx)=>{
                        p.style.transition = 'opacity .6s ease-in-out';
                        setTimeout(()=>{
                            p.style.opacity = '0.999';
                        }, 600 * (idx) + 10)
                        setTimeout(()=>{
                            p.style.opacity = '1';
                        }, 600 * (idx) + 100)
                    })
                    texts.forEach((t, idx)=>{
                        setTimeout(()=>{
                            t.style.display = '';
                            pies[idx].style.transition = '';
                        }, (idx+1) * 600 + 50);
                    })
                }
            }
        },
        mounted: function(){
            this.enableDraw();
        },
        watch :{
            $props: {
                handler: function(){
                    this.enableDraw();
                },
                deep: true
            }
        }
    }
</script>
