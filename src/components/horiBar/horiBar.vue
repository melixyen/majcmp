<template>
	<div :style="outStyle" class="hori-bar-out">
        <div v-for="p in datas" style="flex:1; display:inline-flex;" class="hori-bar-sect">
            <div :style="nameStyle" class="hori-bar-name">{{ p.name }}</div>
            <div :style="barStyle" class="hori-bar-block">
                <div :style="barBlockStyle(p)"></div>
            </div>
            <div :style="countStyle" class="hori-bar-count">{{ p.count }}</div>
        </div>
	</div>
</template>

<script>
    export default {
        name: "lu-hori-bar",
        props: [
            'datas', 'bgcolor', 'padding',
            'fontSize', 'fontColor'
        ],
        computed: {
            _fontSize: function(){ return this.fontSize || 14; },
            _fontColor: function(){ return this.fontColor || '#111111'; },
            maxCount: function(){
                var maxCount = 0;
                var countAry = this.datas.map((c)=>{ maxCount = Math.max(maxCount, c.count); return c.count; })
                return maxCount;
            },
            nameStyle: function(){
                return 'display:table-cell;max-width:30%;width:30%;text-align:right;';
            },
            barStyle: function(){
                return 'display:table-cell;max-width:40%;width:40%;';
            },
            countStyle: function(){
                return 'display:table-cell;max-width:30%;width:30%;text-align:left;';
            },
            outStyle: function(){
                let bgcolor = this.bgcolor || 'transparent';
                let padding = this.padding || '0px';
                return 'background-color:' + bgcolor + '; display:flex; padding:' + padding + '; font-size:' + this._fontSize + 'px; color:' + this._fontColor + ';';
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
                return 'background-color:' + p.color + '; display:inline-block; height:' + this._fontSize + 'px; width:' + percent + '%; transition: all 0.8s ease;';

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
