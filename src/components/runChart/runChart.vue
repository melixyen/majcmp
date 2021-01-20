<template>
	<div>
		<svg :width="width" :height="height" :style="getSvgStyle()">
            
            <line :stroke="_gridColor" :stroke-width="strokeWidthGrid" v-for="(t, i) in xtags" :x1="gridPosition.xpos[i]" :y1="axis.y.y1" :x2="gridPosition.xpos[i]" :y2="axis.y.y2" />
            <text v-for="(t,i) in xtags" :x="gridPosition.xtagPos[i].x" :y="gridPosition.xtagPos[i].y" :font-size="_fontSize" :stroke="_fontColor" text-anchor="middle" alignment-baseline="middle">{{t}}</text>
            
            
            <line :stroke="_gridColor" :stroke-width="strokeWidthGrid" v-for="(t, i) in yData" :y1="gridPosition.ypos[i]" :x1="axis.x.x1" :y2="gridPosition.ypos[i]" :x2="axis.x.x2" />
            <text v-for="(t,i) in yData" :x="gridPosition.ytagPos[i].x" :y="gridPosition.ytagPos[i].y" :font-size="_fontSize" :stroke="_fontColor" text-anchor="end" alignment-baseline="end">{{t}}</text>
            
            <line :stroke="_axisColor" :stroke-width="strokeWidthAxis" :x1="axis.x.x1" :y1="axis.x.y1" :x2="axis.x.x2" :y2="axis.x.y2" />
            <line :stroke="_axisColor" :stroke-width="strokeWidthAxis" :x1="axis.y.x1" :y1="axis.y.y1" :x2="axis.y.x2" :y2="axis.y.y2" />

            <g v-for="(pathText, p) in gridPosition.paths">
                <path :d="gridPosition.paths[p]" :stroke="_lineColor[p]" :stroke-width="_lineWidth" fill="none" />
                <circle v-for="(t,i) in xtags" :cx="gridPosition.linePos[p][i].x" :cy="gridPosition.linePos[p][i].y" :r="_dotSize" :fill="_lineColor[p]" />
            </g>
        </svg>
	</div>
</template>

<script>
    export default {
        name: "lu-run-chart",
        props: [
            'xtags', 'datas',
            'width', 'height', 'bgcolor',
            'axisColor', 'gridColor',
            'fontSize', 'fontColor',
            'lineWidth', 'lineColor', 'dotSize'
        ],
        computed: {
            _axisColor: function(){ return this.axisColor || '#444444'; },
            _gridColor: function(){ return this.gridColor || '#999999'; },
            _fontSize: function(){ return this.fontSize || 14; },
            _fontColor: function(){ return this.fontColor || '#111111'; },
            _lineWidth: function(){ return this.lineWidth || 3; },
            _lineColor: function(){
                var lineColor = this.lineColor;
                if(typeof(lineColor)=='string') lineColor = [lineColor];
                return lineColor || ['#77bba0']; 
            },
            _dotSize: function(){ return this.dotSize || 7; },
            chartWidth: function() {
                let w = this.getProps('width');
                return w - this.pdLeft - this.pdRight;
            },
            chartHeight: function() {
                let h = this.getProps('height');
                return h - this.pdTop - this.pdBottom;
            },
            axis: function() {
                let w = this.getProps('width');
                let h = this.getProps('height');
                let X = {
                    x1:this.pdLeft,
                    y1:h - this.pdBottom,
                    x2:w - this.pdRight,
                    y2:h - this.pdBottom
                }
                let Y = {
                    x1:this.pdLeft,
                    y1:this.pdTop,
                    x2:this.pdLeft,
                    y2:h - this.pdBottom
                };
                return {x:X, y:Y}
            },
            yData: function(){
                var reduceData = this.datas.reduce((arr, crr)=>{ return arr.concat(crr); })
                let minValue = Math.min.apply(this, reduceData);
                let maxValue = Math.max.apply(this, reduceData);
                let step = 5;
                if(maxValue > 100) step = 10;
                let stepMinMax = this.getMinMaxStep(step, minValue, maxValue);
                let yData = [];
                for(var i = stepMinMax.min; i<=stepMinMax.max; i+=step){ yData.push(i); }
                yData.reverse();
                return yData;
            },
            gridPosition: function(){
                let w =0, h = 0;
                let xlen = this.xtags.length;
                w = Math.round(this.chartWidth / (xlen-1));

                let xpos = [];
                let xtagPos = [];
                for(var i=0; i<xlen; i++) {
                    let xposx = Math.round((i/(xlen-1)) * this.chartWidth ) + this.pdLeft;
                    xpos[i] = xposx;
                    xtagPos[i] = {x:xposx, y:this.chartHeight + this.pdTop + 30}
                }

                //計算 Y 高度
                let yData = this.yData;
                let ylen = this.yData.length;
                h = Math.round(this.chartHeight / (ylen-1));

                let ypos = [];
                let ytagPos = [];
                for(var i=0; i<ylen; i++){
                    let yposy = Math.round((i/(ylen-1)) * this.chartHeight ) + this.pdTop;
                    // let yposy = h * i + this.pdTop;
                    ypos[i] = yposy;
                    ytagPos[i] = {x:this.pdLeft - 10, y:yposy}
                }

                //計算資料座標
                let linePos = [];
                var paths = [];
                for(var p=0; p<this.datas.length; p++){
                    linePos[p] = [];
                    var pathAry = [];
                    for(var i=0; i<xlen; i++){
                        var lx = xpos[i];
                        var ly = ((this.yData[0] - this.datas[p][i]) / (this.yData[0] - this.yData[this.yData.length-1])) * this.chartHeight + this.pdTop;
                        linePos[p][i] = {x:lx, y:ly}
                        if(i==0) {
                            pathAry.push('M' + lx + ' ' + ly)
                        }else{
                            pathAry.push('L' + lx + ' ' + ly)
                        }
                    }
                    paths[p] = pathAry.join(' ');
                }
                
                
                return {
                    xpos: xpos,
                    xtagPos: xtagPos,
                    ypos: ypos,
                    ytagPos: ytagPos,
                    linePos: linePos,
                    path: paths[0],
                    paths: paths,
                    height: h,
                    width: w
                }
            }
        },
        data() {return {
            pdLeft: 80,
            pdTop: 50,
            pdRight: 80,
            pdBottom: 80,
            strokeWidthAxis: 2,
            strokeWidthGrid: 1
        }},
        methods: {
            getProps: function(st){
                switch(st){
                    case 'width':
                        return parseInt(this.width) || 800;
                    break;
                    case 'height':
                        return parseInt(this.height) || 600;
                    break;
                }
            },
            getMinMaxStep: function(step, min, max) {
                var smin = min - (min % step), smax = max - (max % step) + step;
                return {min:smin, max:smax}
            },
            getSvgStyle: function() {
                let bgcolor = this.bgcolor || '#ffffff';
                return 'background-color:' + bgcolor + ';';
            },
            enableDraw: function(){}
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
