import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import TeamList from "@/components/TeamList.vue";
import teams from "@/teams.json";
import store from "@/store";
import _ from "lodash";

async function mountSubject() {
  const subject = shallowMount(TeamList, {
    propsData: { list: teams },
    store
  });
  return subject;
}
describe.only("TeamList.vue", () => {
  context("when the component loads", () => {
    it("should contain a team list when it is created", async () => {
      const subject = await mountSubject();
      expect(subject.findAll("div.team").length).to.equal(
        Object.keys(teams).length
      );
      expect(subject.findAll("li.teammate").length).to.equal(
        _.flatMap(teams).length
      );
    });

    it("should initialize the team list when created", async () => {
      const subject = await mountSubject();
      _.forEach(subject.vm.$store.state.TEAMS, team => {
        _.forEach(team, teammate => {
          expect(teammate.anchor).to.be.false;
          expect(teammate.selected).to.be.true;
        });
      });
    });
  });

  context("when a teammate is clicked", () => {
    it("should select the teammate", async () => {
      const subject = await mountSubject();
      const firstTeammate = subject.findAll("li.teammate").at(0);
      firstTeammate.trigger("click");
    });
  });
});
