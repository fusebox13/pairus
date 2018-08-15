<template>
  <div id="root">
    <h2 v-if="finalPairs.length">Pairs</h2>
    <div id="pair-container">
      <transition-group name="pair-list" tag="div" class="pair-list">
        <div class="pair" v-for="(pairs, index) in finalPairs" :key="index">
            <ul>
              <li v-for="(pair, index) in pairs" :key="index">{{pair.name}}</li>
            </ul>
        </div>
      </transition-group>
    </div>
    <div id="action-bar">
      <div id="solo-container" v-if="soloPair.hasOwnProperty('name')">
        <h2>Solo</h2>
        <span>{{soloPair.name}}</span>
      </div>
    </div>
    <span @click="randomizePairs" id="pair-us-button">Pair Us</span>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  name: "PairRandomizer",
  data() {
    return {
      team: [],
      finalPairs: [],
      soloPair: {},
      blink: false
    };
  },
  props: {
    flatTeam: {
      type: Array,
      required: true
    }
  },
  methods: {
    _pairAnchorsWithNonAnchors(anchors, nonAnchors) {
      while (anchors.length > 0 && nonAnchors.length > 0) {
        var self = this;
        const anchorSelection = anchors.pop();
        const nonAnchorSelection = nonAnchors.pop();
        self.finalPairs.push([anchorSelection, nonAnchorSelection]);
      }
      return anchors.length > nonAnchors.length ? anchors : nonAnchors;
    },
    _pairLeftOvers(leftOvers) {
      while (leftOvers.length > 1) {
        this.finalPairs.push([leftOvers.pop(), leftOvers.pop()]);
      }

      if (leftOvers.length) {
        this.soloPair = leftOvers[0];
      }
    },
    _reset() {
      this.finalPairs = [];
      this.soloPair = {};
    },
    randomizePairs() {
      this._reset();
      let [anchors, nonAnchors] = _.chain(this.team)
        .shuffle()
        .filter(pair => pair.selected)
        .partition(pair => pair.anchor)
        .value();
      let leftOvers = this._pairAnchorsWithNonAnchors(anchors, nonAnchors);
      if (leftOvers) {
        this._pairLeftOvers(leftOvers);
      }
    }
  },
  created() {
    this.team = this.flatTeam;
  }
};
</script>
<style lang="scss" scoped>

.pair-list-enter {
  opacity: 0;
  transform: rotateY(360deg); 
}


#root {
  margin: 15px;

  h2 {
    margin: 0px;
  }

  #pair-us-button {
    position: absolute;
    bottom: 20px;
    right: 40px;
    font-size: 2em;
    display: block;
    transition: 0.25s ease-in-out;

    &:hover {
      transform: scale(1.25);
      text-shadow: 2px 2px 4px #081534;
      cursor: pointer;      
    }
  }
  
  div#action-bar {
    div#solo-container {
      display: inline-block;
      ul {
        list-style: none;
      }
    }
  }
  
  div#pair-container {
    text-align: center;

    div.pair {
      display: inline-block;
      border: 1px solid white;
      margin: 5px;
      transition: 0.15s ease-in-out;

      &:hover {
        transform: scale(2);
        background: #2A6BAC;
        text-shadow: 2px 2px 4px #081534;
        
      }
      ul {
        list-style: none;
        margin: 0px;
        padding: 5px;

      }
    }
  }
}

</style>
