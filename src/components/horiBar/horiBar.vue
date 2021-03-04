<template>
	<div :style="outStyle" class="hori-bar-out">
        <div v-for="p in datas" style="flex:1; display:inline-flex;" class="hori-bar-sect">
            <div :style="nameStyle" class="hori-bar-name">{{ p.name }}</div>
            <div :style="barStyle" class="hori-bar-block">
                <div :style="barBoderStyle(p)">
                    <div :style="barBlockStyle(p)"></div>
                </div>
            </div>
            <div :style="countStyle" class="hori-bar-count">{{ p.count }}</div>
        </div>
	</div>
</template>

<script>
    export default {
        name: "lu-hori-bar",
        props: [
            'datas', 'bgcolor', 'padding', 'barBorderColor', 'barBorderWidth',
            'fontSize', 'fontColor', 'fontFamily'
        ],
        computed: {
            _fontSize: function(){ return this.fontSize || '14px'; },
            _fontColor: function(){ return this.fontColor || '#111111'; },
            _fontFamily: function(){ return this.fontFamily || 'Arial'; },
            maxCount: function(){
                var maxCount = 0;
                var countAry = this.datas.map((c)=>{ maxCount = Math.max(maxCount, c.count); return c.count; })
                return maxCount;
            },
            nameStyle: function(){
                return 'display:table-cell;max-width:30%;width:30%;text-align:right; padding-right:1%;';
            },
            barStyle: function(){
                return 'display:table-cell;max-width:40%;width:40%;';
            },
            countStyle: function(){
                return 'display:table-cell;max-width:30%;width:30%;text-align:left; padding-left:1%;';
            },
            outStyle: function(){
                let bgcolor = this.bgcolor || 'transparent';
                let padding = this.padding || '0px';
                let fontSize = (this.fontSize) ? 'font-size:' + this.fontSize + ';' : '';
                let fontColor = (this.fontColor) ? 'color:' + this.fontColor + ';' : '';
                let fontFamily = (this.fontFamily) ? 'font-family:' + this.fontFamily + ';' : '';
                return 'background-color:' + bgcolor + '; display:flex; padding:' + padding + ';' + fontSize + fontColor + fontFamily;
            }
        },
        data() {return {
            comeZero: true
        }},
        methods: {
            barBlockStyle: function(p){
                //maxCount
                let percent = Math.round(p.count / this.maxCount * 100);
                if(this.comeZero) percent = 1;
                return 'position:absolute; background-color:' + p.color + '; display:inline-block; height:100%; width:' + percent + '%; transition: all 0.8s ease;';

            },
            barBoderStyle: function(p){
                let bw = (this.barBorderWidth) ? this.barBorderWidth : '1px';
                let border = (this.barBorderColor) ? 'border:' + bw + ' solid ' + this.barBorderColor + ';' : 'border:' + bw + ' solid transparent;';
                if(p.borderColor) border = 'border: ' + bw + ' solid ' + p.borderColor + ';';
                return 'position:relative; box-sizing:border-box; width:100%; height:' + this._fontSize + ';' + border;
            },
            enableDraw: function(){}
        },
        created: function(){
            setTimeout(()=>{
                this.comeZero = false;
            }, 100)
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
