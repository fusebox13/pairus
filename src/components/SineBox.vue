<template>
  <div id="box" :style="{width: width + 'px', height: height+ 'px'}">
    <canvas id="top-waves" class="wave" :style="{top: (-height / 2) + 'px'}"></canvas>
    <canvas id="left-waves" class="wave" :style="{left: (-height / 2) + 'px'}"></canvas>
    <canvas id="bottom-waves" class="wave" :style="{bottom: (-height / 2) + 'px'}"></canvas>
    <canvas id="right-waves" class="wave" :style="{right: (-height / 2) + 'px'}"></canvas>
    <div id="slot-container">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import SineWaves from "sine-waves";
export default {
  name: "SineBox",
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      
      amplitude: 20,
      speed: 1,
      ease: 'SineInOut',

      waves: [
        {
          timeModifer: 6,
          lineWidth: 1,
          amplitude: -10,
          wavelength: 100,
          segmentLength: 1,
          type: 'Sine',
        },
        {
          timeModifer: 2,
          lineWidth: 1,
          amplitude: -5,
          wavelength: 50,
          segmentLength: 1,
          type: 'Sine',
        },
        {
          timeModifer: 2,
          lineWidth: 1,
          amplitude: 10,
          wavelength: 100,
          segmentLength: 1,
          type: 'Sine',
        },
      ],
      resizeCallBack: function() {  
        let gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
        // gradient.addColorStop(0,"rgba(0, 128, 255, 0.5)");
        // gradient.addColorStop(0.5,"rgba(255, 255, 255, 0.5)");
        // gradient.addColorStop(1,"rgba(0, 128, 255, 0.5)");

        gradient.addColorStop(0,"rgba(42, 107, 172, 0.5)");
        gradient.addColorStop(0.5,"rgba(255, 255, 255, 1)");
        gradient.addColorStop(1,"rgba(42, 107, 172, 0.5)");

        let index = -1;
        let length = this.waves.length;
          while(++index < length){
          this.waves[index].strokeStyle = gradient;
        }

        // Clean Up
        index = void 0;
        length = void 0;
        gradient = void 0;
      }
    }
  },
  mounted() {
    this._animateTopWave();
    this._animateLeftWave();
    this._animateBottomWave();
    this._animateRightWave();
    
  },
  computed: {},
  methods: {
    _animateBottomWave() {
      new SineWaves({
        el: document.getElementById('bottom-waves'),
        
        speed: this.speed,
        width: this.width,
        height: this.height,
        ease: this.ease,
        waves: this.waves, 
        rotate: 0,
        resizeEvent: this.resizeCallBack
      });
    },
    _animateTopWave() {
      new SineWaves({
        el: document.getElementById('top-waves'),
        
        speed: -this.speed,
        width: this.width,
        height: this.height,
        ease: this.ease,
        waves: this.waves, 
        rotate: 0,
        resizeEvent: this.resizeCallBack
      });
    },
    _animateLeftWave() {
      new SineWaves({
        el: document.getElementById('left-waves'),
        
        speed: this.speed,
        width: this.width,
        height: this.height,
        ease: this.ease,
        waves: this.waves,
        rotate: 90,
        resizeEvent: this.resizeCallBack
      });
    },
    _animateRightWave() {
      new SineWaves({
        el: document.getElementById('right-waves'),
        
        speed: -this.speed,
        width: this.width,
        height: this.height,
        ease: this.ease,
        waves: this.waves,
        rotate: 90,
        resizeEvent: this.resizeCallBack
      });
  } 

  } 
}
</script>
<style lang="scss" scoped>
  #box {
    position: relative;
    margin: 30px;

  #slot-container {
    padding: 1.25em;
    font-family: 'Amatic SC', cursive;
    font-size: 1.25em;
    z-index: 9999;
  }
}
.wave {
  position: absolute;
  pointer-events: none;
}
</style>
