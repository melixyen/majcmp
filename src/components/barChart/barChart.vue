<template>
	<div>
		<svg :width="width" :height="height" :style="getSvgStyle()">

            <line :stroke="_axisColor" :stroke-width="strokeWidthAxis" :x1="axisBottom.x1" :y1="axisBottom.y1" :x2="axisBottom.x2" :y2="axisBottom.y2" />

            <g v-for="(p,i) in barPosition">
                <rect :x="p.x1" :y="p.y" :width="p.width" :height="p.height" :fill="p.color" :style="rectStyle" />
                <text :x="p.textPos.x" :y="p.textPos.y" :font-size="_fontSize" :stroke="_fontColor" text-anchor="middle" alignment-baseline="middle">{{p.name}}</text>
                <text :x="p.countPos.x" :y="p.countPos.y" :font-size="_fontSize" :stroke="_fontColor" text-anchor="middle" alignment-baseline="middle">{{p.count}}</text>
            </g>
            
        </svg>
	</div>
</template>

<script>
    export default {
        name: "lu-bar-chart",
        props: [
            'datas',
            'width', 'height', 'bgcolor',
            'flexBar', 'flexGap',
            'axisColor',
            'fontSize', 'fontColor'
        ],
        computed: {
            _axisColor: function(){ return this.axisColor || '#444444'; },
            _fontSize: function(){ return this.fontSize || 14; },
            _fontColor: function(){ return this.fontColor || '#111111'; },
            paddingTop: function(){ return this._fontSize * 2 ;},
            paddingBottom: function(){ return Math.round(this._fontSize * 2.5) ;},
            chartWidth: function() {
                let w = this.getProps('width');
                return w;
            },
            chartHeight: function() {
                let h = this.getProps('height');
                return h;
            },
            axisBottom: function() {
                let w = this.getProps('width');
                let h = this.getProps('height');
                return {
                    x1:0,
                    y1:h - this.paddingBottom,
                    x2:w,
                    y2:h - this.paddingBottom
                }
            },
            barPosition: function(){
                var flexBar = parseInt(this.flexBar) || 3;
                var flexGap = parseInt(this.flexGap) || 2;
                var countsData = this.datas.map((c)=>{ return c.count; })
                let minValue = Math.min.apply(this, countsData);
                let maxValue = Math.max.apply(this, countsData);

                let w = this.getProps('width');
                let h = this.getProps('height');

                let barHeight = h - this.paddingTop - this.paddingBottom;
                let barBottom = h - this.paddingBottom;
                let len = this.datas.length;
                let totalSep = (flexBar * len) + (flexGap * len) + flexGap;
                let sepWidth = w / totalSep;

                let lastX = 0;
                let aryPosition = [];
                for(var i=0; i<len; i++){
                    var barX = lastX + (flexGap * sepWidth);
                    var gapX = barX + (flexBar * sepWidth);
                    var barH = barHeight * (countsData[i] / maxValue) * this.drawFullRate;
                    var barY = barBottom - barH;
                    lastX = gapX;

                    var textPos = {x: barX + (flexBar * sepWidth / 2), y: barBottom + (this.paddingBottom / 2)}
                    var countPos = {x: barX + (flexBar * sepWidth / 2), y: barY - (this.paddingTop / 2)}

                    aryPosition.push({
                        x1: barX,
                        x2: gapX,
                        textPos: textPos,
                        countPos: countPos,
                        y: barY,
                        width: flexBar * sepWidth,
                        height: barH,
                        name: this.datas[i].name,
                        count: this.datas[i].count,
                        color: this.datas[i].color
                    })
                }

                return aryPosition;
            }
        },
        data() {return {
            pdLeft: 80,
            pdRight: 80,
            drawFullRate: 1,
            rectStyle: 'transition:all 0.8s ease;',
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
