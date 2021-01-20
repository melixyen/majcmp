<template>
	<div>
		<canvas></canvas>
	</div>
</template>

<script>
    export default {
        name: "trigon-score-image",
	    props: ['linelength', 'dotwidth', 'borderwidth', 'bordercolor', 'areacolor', 'rates', 'delaytime', 'animationtime', 'bordercover', 'vismode'],
        computed: {
            trigonLineLength: function(){return parseInt(this.linelength) + 1;},
            trigonBorderWidth: function(){return parseInt(this.borderwidth);},
            trigonBorderColor: function(){return this.bordercolor ;},
            trigonDotWidth: function(){return parseInt(this.dotwidth); },
            trigonAreaColor: function(){return this.areacolor;},
            trigonSelfRate: function(){return parseFloat(this.rates[0]);},
            trigonWinnerRate: function(){return parseFloat(this.rates[1]);},
            trigonShotRate: function(){return parseFloat(this.rates[2]);},
            trigonDelayTime: function(){return parseInt(this.delaytime);},
            trigonAnimationTime: function(){return parseInt(this.animationtime);},
            flagBorderCover: function(){return !!(this.bordercover===true || this.bordercover==='true');},
            trigonHeight: function(){ return Math.round((this.trigonLineLength / 2) * this.constRadical3 ); },
            visualizationMode: function(){ return this.vismode; }
        },
        data() {return {
            aniStartTime: -1,
            aniEndTime: -1,
            constRadical3: 1.732 //三角形邊長公式 1:2:√3
        }},
        methods: {
            calcRealtimePosition: function(base, target, progress = 1){
                if(progress >= 1) return target;
                let x = (target[0] - base[0]) * progress + base[0];
                let y = (target[1] - base[1]) * progress + base[1];
                return [x,y];
            },
            draw: function(){
                var canvas = this.$el.querySelector('canvas');
                var bw = this.trigonBorderWidth;
                var canHeight = this.trigonHeight;
                var cc = canvas.getContext('2d');
                var nowTime = Date.now();
                var aniStartTime = this.aniStartTime;
                var aniEndTime = this.aniEndTime;
                var isOverStart = nowTime >= aniStartTime;
                var isOVerEnd = nowTime >= aniEndTime;

                canvas.width = this.trigonLineLength + (bw * 2);
                canvas.style.width = this.trigonLineLength + 'px';
                canvas.height = canHeight + bw * 2;
                canvas.style.height = canvas.height + 'px';
                canvas.style.backgroundColor = 'transparent';

                //計算三角極點座標
                let leftBottom = [0 + bw, canHeight + bw];
                let rightBottom = [this.trigonLineLength + bw, canHeight + bw];
                let centerTop = [Math.round(this.trigonLineLength / 2) + bw, 0 + bw];
                let centerCore = [centerTop[0], canHeight + bw - Math.round(centerTop[0] / this.constRadical3)];

                //計算間隔寬度、高度
                let gapWidth = (this.trigonLineLength / 2) / 5;
                let gapUpHeight = ((centerCore[1] - bw)) / 5;
                let gapDownHeight = ((canHeight + bw) - centerCore[1]) / 5;

                let percentWidth = gapWidth / 20;
                let percentUpHeight = gapUpHeight / 20;
                let percentDownHeight = gapDownHeight / 20;

                //計算自摸、胡牌、放槍座標
                let trigonSelfRate = this.trigonSelfRate || 0.01;
                let trigonWinnerRate = this.trigonWinnerRate || 0.01;
                let trigonShotRate = this.trigonShotRate || 0.01;

                //資料視覺化加權處理
                if(this.visualizationMode=='1') {
                    var maxRate = Math.max(trigonSelfRate, trigonWinnerRate, trigonShotRate);
                    var lvOffset = 1;
                    if(maxRate < 50) lvOffset = 0.95;
                    if(maxRate < 40) lvOffset = 0.9;
                    if(maxRate < 30) lvOffset = 0.7;
                    if(maxRate < 20) lvOffset = 0.5;
                    if(maxRate < 10) lvOffset = 0.4;
                    trigonSelfRate = trigonSelfRate / maxRate * 100 * lvOffset;
                    trigonWinnerRate = trigonWinnerRate / maxRate * 100 * lvOffset;
                    trigonShotRate = trigonShotRate / maxRate * 100 * lvOffset;
                }else if(this.visualizationMode=='2') {
                    var maxRate = Math.max(trigonSelfRate, trigonWinnerRate, trigonShotRate);
                    var lvOffset = 1;
                    if(maxRate < 50) lvOffset = 0.9;
                    if(maxRate < 40) lvOffset = 0.8;
                    if(maxRate < 30) lvOffset = 0.6;
                    if(maxRate < 20) lvOffset = 0.4;
                    if(maxRate < 10) lvOffset = 0.3;
                    trigonSelfRate = trigonSelfRate / maxRate * 100 * lvOffset;
                    trigonWinnerRate = trigonWinnerRate / maxRate * 100 * lvOffset;
                    trigonShotRate = trigonShotRate / maxRate * 100 * lvOffset;
                }
                let posSelf = [centerTop[0] , centerCore[1] - Math.round(percentUpHeight * trigonSelfRate)];
                let posWinner = [centerCore[0] - Math.round(percentWidth * trigonWinnerRate), centerCore[1] + Math.round(percentDownHeight * trigonWinnerRate)];
                let posShot = [centerCore[0] + Math.round(percentWidth * trigonShotRate), centerCore[1] + Math.round(percentDownHeight * trigonShotRate)];

                if(isOverStart && !this.flagBorderCover) this.drawAreaAndDot(cc, centerCore, posSelf, posWinner, posShot); // 不覆蓋，先畫區塊

                //畫最外層三角形
                this.drawTrigon(cc, this.trigonBorderWidth, this.trigonBorderColor, leftBottom, rightBottom, centerTop);
                for(var i=1; i<5; i++){
                    var lvLeftBottom = [Math.round(leftBottom[0] + (gapWidth*i)), Math.round(leftBottom[1] - (gapDownHeight*i))];
                    var lvRightBottom = [Math.round(rightBottom[0] - (gapWidth*i)), Math.round(rightBottom[1] - (gapDownHeight*i))];
                    var lvCenterTop = [centerTop[0], Math.round(centerTop[1] + (gapUpHeight*i))];
                    this.drawTrigon(cc, this.trigonBorderWidth, this.trigonBorderColor, lvLeftBottom, lvRightBottom, lvCenterTop);
                }

                //畫三角形連接線
                this.drawConnectLine(cc, leftBottom, rightBottom, centerTop, centerCore);
                
                if(isOverStart && this.flagBorderCover) this.drawAreaAndDot(cc, centerCore, posSelf, posWinner, posShot); // 覆蓋，後畫區塊

                if(!isOVerEnd){
                    this.requestAni();
                }else{
                    this.$emit('callbackend', true);
                }

            },
            drawAreaAndDot: function(cc, centerCore, origPosSelf, origPosWinner, origPosShot){
                let nowTime = Date.now();
                let aniStartTime = this.aniStartTime;
                let aniEndTime = this.aniEndTime;
                let progress = (nowTime - aniStartTime) / (aniEndTime - aniStartTime);
                if(progress > 1) progress = 1;

                let posSelf = this.calcRealtimePosition(centerCore, origPosSelf, progress);
                let posWinner = this.calcRealtimePosition(centerCore, origPosWinner, progress);
                let posShot = this.calcRealtimePosition(centerCore, origPosShot, progress);
                //畫區域範圍三角
                this.drawArea(cc, posSelf, posWinner, posShot);

                //畫座標點
                this.drawDot(cc, this.trigonDotWidth, this.trigonBorderColor, posSelf);
                this.drawDot(cc, this.trigonDotWidth, this.trigonBorderColor, posWinner);
                this.drawDot(cc, this.trigonDotWidth, this.trigonBorderColor, posShot);
            },
            drawArea: function(cc, posSelf, posWinner, posShot){

                cc.beginPath();
                cc.lineWidth = 1;
                cc.strokeStyle = this.trigonAreaColor;
                cc.moveTo(posSelf[0], posSelf[1]);
                cc.lineTo(posWinner[0], posWinner[1]);
                cc.lineTo(posShot[0], posShot[1]);
                cc.lineTo(posSelf[0], posSelf[1]);
                cc.fillStyle = this.trigonAreaColor;
                cc.fill();
            },
            drawConnectLine: function(cc, leftBottom, rightBottom, centerTop, centerCore){
                cc.beginPath();
                cc.lineWidth = this.trigonBorderWidth;
                cc.strokeStyle = this.trigonBorderColor;
                cc.moveTo(leftBottom[0], leftBottom[1]);
                cc.lineTo(centerCore[0], centerCore[1]);
                cc.moveTo(rightBottom[0], rightBottom[1]);
                cc.lineTo(centerCore[0], centerCore[1]);
                cc.moveTo(centerTop[0], centerTop[1]);
                cc.lineTo(centerCore[0], centerCore[1]);
                cc.stroke();
            },
            drawDot: function(cc, dotWidth, borderColor, position){
                cc.moveTo(position[0], position[1]);
                cc.beginPath();
                cc.arc(position[0],position[1],dotWidth,0,2*Math.PI, true);
                cc.fillStyle = borderColor;
                cc.fill();
                cc.stroke();
            },
            drawTrigon: function(cc, borderWidth, borderColor, leftBottom, rightBottom, centerTop){
                cc.beginPath();
                cc.moveTo(leftBottom[0], leftBottom[1]);
                cc.lineWidth = borderWidth;
                cc.strokeStyle = borderColor;
                cc.lineTo(rightBottom[0], rightBottom[1]);
                cc.lineTo(centerTop[0], centerTop[1]);
                cc.lineTo(leftBottom[0], leftBottom[1]);
                cc.stroke();
            },
            enableDraw: function(){
                let nowTime = Date.now();
                let delay = this.trigonDelayTime || 0;
                let aniStart = delay + nowTime;
                let aniEnd = delay + this.trigonAnimationTime + nowTime;
                
                this.aniStartTime = aniStart;
                this.aniEndTime = aniEnd;
                this.requestAni();
            },
            requestAni: function(){
                requestAnimationFrame(this.draw);
            }
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
