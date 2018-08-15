<template>
  <div id="app">
    <SineBox :width="sinebox.width" :height="sinebox.height">
      <TeamList :list="teams"/>
      <PairRandomizer :flat-team="flatTeam"/>
    </SineBox>
  </div>
</template>

<script>
import Pairalyzer from "./components/Pairalyzer.vue";
import TeamList from "./components/TeamList.vue";
import PairRandomizer from "./components/PairRandomizer.vue";
import Mapbox from "./components/Mapbox.vue";
import SineBox from "./components/SineBox.vue";
import teams from "@/teams.json";
import _ from "lodash";

export default {
  name: "app",
  components: {
    Pairalyzer,
    TeamList,
    PairRandomizer,
    SineBox,
    Mapbox
  },
  data() {
    return {
      teams: {},
      sinebox: {
        width: 600,
        height: 600
      }
    };
  },
  computed: {
    flatTeam() {
      return _.flatMap(this.teams);
    }
  },
  methods: {},
  created() {
    this.teams = teams;
  }
};
</script>

<style lang="scss">

body {
  font-family: 'Amatic SC', cursive;
  background: #2A6BAC;
  color: white;
  width: 100vw;
  height: 100vh;

  div.header {
    font-size: 2em;
    h1 {
      margin: 0px;
    }
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
