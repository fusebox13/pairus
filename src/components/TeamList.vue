<template>
  <div id="root">
    <div class="team" v-for="(team, teamName) in teams" :key="teamName" >
      <h2 @click="toggleTeam(teamName, team)">{{teamName | capitalize}}</h2>
      <ul class="team-list">
        <li 
          v-for="(teammate, index) in teams[teamName]" 
          :key="index" 
          :class="{teammate: true, selected: teammate.selected}">
          <i 
            @click="toggleAnchor(teamName, team, index)"  
            :class="{fas: true, 'fa-anchor': true, selected: teammate.anchor && teammate.selected }">
          </i>
          <div 
            @click="toggleSelect(teamName, team, index)"
            class="team-name">
            {{teammate.name | capitalize}}
          </div>
        </li>
      </ul>
    </div>  
  </div>
</template>
<script>
import _ from "lodash";
export default {
  name: "PairList",
  data() {
    return {
      teams: {}
    };
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  computed: {},
  methods: {
    toggleSelect(teamName, team, index) {
      team[index].selected = !team[index].selected;
      this.$set(this.teams, teamName, team);
    },
    toggleAnchor(teamName, team, index) {
      team[index].anchor = !team[index].anchor;
      this.$set(this.teams, teamName, team);
    },
    toggleTeam(teamName, team) {
      team = _.forEach(team, teammate => {
        teammate.selected = !teammate.selected;
      });
      this.$set(this.teams, teamName, team);
    }
  },
  created() {
    this.teams = this.list;
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>
<style lang="scss" scoped>
#root {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 9999;
  margin: 15px;
  div.team {
    flex-grow: 1;
    margin-left: 15px;

    h2 {
      color: white;
      margin-top: 0px;
      transition: 0.2s ease-in-out;
      &:hover {
        transform: scale(1.15);
        text-shadow: 2px 2px 4px #081534;
      }
    }

    ul.team-list {
      padding: 0px;
      list-style: none;

      li {
        color: #709bc5;
        i.fa-anchor {
          font-size: 0.75em;
          &:hover {
            color: white;
            margin-right: 4px;
          }
          color: #709bc5;
          margin-right: 4px;
        }

        i.fa-anchor.selected {
          &:hover {
            color: white;
            margin-right: 4px;
          }
          color: white;
          margin-right: 4px;
        }

        div.team-name {
          display: inline-block;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            transform: scale(1.15);
            text-shadow: 2px 2px 4px #081534;
          }
        }
      }

      li.selected {
        color: white;
      }
    }
  }
}
</style>
