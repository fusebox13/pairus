<template>
  <div>
    <div v-for="(team, teamName) in teams" :key="teamName">
      <span>{{teamName}}</span>
      <ul>
        <li 
          @click="selectTeammate(teamMate)" 
          v-if="!teamMate.selected" 
          v-for="(teamMate, index) in team" 
          :key="index"
          >
            {{teamMate.name}}{{teamMate.selected}}
          </li>
      </ul>
    </div>

  
    <span>Selected Pairs</span>
    <ul id="pair-list">
      <li @click="toggleAnchor(index)" v-if="!pair.isAnchor" v-for="(pair, index) in pairs" :key="index">{{pair.name}}</li>
    </ul>
  <!--  
    <button @click="randomizePairs" type="button">Randomize Pairs</button>
    <div>
      <span>Final List</span>
      <ul>
        <li v-for="(pair, index) in finalPairs" :key="index">
          <span :class="{ anchor: pair[0].isAnchor, nonAnchor: !pair[0].isAnchor }" >{{pair[0].name}}</span>
          <span> - </span> 
          <span :class="{ anchor: pair[1].isAnchor, nonAnchor: !pair[1].isAnchor }">{{pair[1].name}}</span>
        </li>
      </ul> 
      <span>Solo: </span><span v-if="hasSoloPair":class="{ anchor: soloPair.isAnchor, nonAnchor: !soloPair.isAnchor }" >{{soloPair.name}}</span>
    </div>  -->
  </div> 
</template>
<script>
import teams from "@/teams.json";
import _ from "lodash";
export default {
  name: "Pairalyzer",
  data() {
    return {
      teams: teams,
      selectedTeammates: [],
      pairs: [],
      finalPairs: [],
      soloPair: {}
    };
  },
  computed: {
    hasSoloPair() {
      return !_.isEmpty(this.soloPair);
    }
  },
  methods: {
    // toggleAnchor(index) {
    //   this.pairs[index].isAnchor = !this.pairs[index].isAnchor;
    //   this.randomizePairs();
    // },
    selectTeammate(teamMate) {
      console.log(teamMate);
      teamMate.selected = true;
      this.selectedTeammates.push(teamMate);
    }
    // addToPairPool(index) {
    //   this.pairs.push(this.team[index]);
    // },
    // _pairAnchorsWithNonAnchors(anchors, nonAnchors) {
    //   while (anchors.length > 0 && nonAnchors.length > 0) {
    //     var self = this;
    //     const anchorSelection = anchors.pop();
    //     const nonAnchorSelection = nonAnchors.pop();
    //     self.finalPairs.push([anchorSelection, nonAnchorSelection]);
    //   }
    //   return anchors.length > nonAnchors.length ? anchors : nonAnchors;
    // },
    // _pairLeftOvers(leftOvers) {
    //   while(leftOvers.length > 1) {
    //     this.finalPairs.push([leftOvers.pop(), leftOvers.pop()]);
    //   }

    //   if(leftOvers.length) {
    //     this.soloPair = leftOvers[0];
    //   }
    // },
    // _reset() {
    //   this.finalPairs = [];
    //   this.soloPair = {};
    // },
    // _initializePairList() {
    //   _.forEach(this.pairs, (pair, index) => {
    //       this.pairs[index].isAnchor = false;
    //       this.pairs[index].selected = false;
    //     });
    // },
    // randomizePairs() {
    //   this._reset();
    //   this.pairs = _.shuffle(this.pairs);
    //   let [anchors, nonAnchors] = _.partition(
    //     this.pairs,
    //     pair => pair.isAnchor
    //   );
    //   let leftOvers = this._pairAnchorsWithNonAnchors(anchors, nonAnchors);
    //   if(leftOvers) {
    //     this._pairLeftOvers(leftOvers);
    //   }

    // }
  },
  created() {
    this.pairs = _.flatMap(this.teams);
    this._initializePairList();
    this.randomizePairs();
  }
};
</script>
<style lang="sass" scoped>
  ul 
    list-style: none;
  .anchor
    color: red;
  .nonAnchor
    color: green;
</style>
