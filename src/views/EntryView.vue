<template>
  <div>
    <v-main>
      <v-container fluid>
        <h1>{{ date }}</h1>
        <div class="slider-container">
          <v-slider
            label="Mood"
            v-model="entry.mood"
            min="-5"
            max="5"
            step="1"
            ticks
            :tick-labels="[-5,-4,-3,-2,-1,0,1,2,3,4,5]"
            color="green"
            track-color="light-green"
            @change="updateMood"
          />
        </div>

        <div v-for="key of musings" :key="key">
          <v-divider />
          <div class="top-padded-container">
            <MusingsEditor :musingsKey="key" />
          </div>
        </div>

        <v-divider />
        <div class="padded-container">
          <v-btn color="green" class="white--text" @click="addMusings">
            <v-icon left>mdi-pencil</v-icon>Muse
          </v-btn>
        </div>
      </v-container>
    </v-main>

    <v-btn fixed bottom right fab dark color="green" to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.padded-container {
  padding: 1em 0;
}

.top-padded-container {
  @extend .padded-container;
  padding-bottom: 0;
}

.slider-container {
  @extend .padded-container;
  max-width: 400px;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as db from "../db/database";
import { Entry } from "../db/models";
import MusingsEditor from "../components/MusingsEditor.vue";

@Component({
  components: {
    MusingsEditor,
  },
})
export default class EntryView extends Vue {
  entry: Entry = { date: "", mood: 0 };
  musings: number[] = [];

  get date() {
    return this.$route.params.date;
  }

  updateMood() {
    db.saveEntry(this.entry);
  }

  created() {
    db.getEntryForDate(this.date).then((e) => (this.entry = e));
    db.getMusingsKeysForDate(this.date).then((m) => (this.musings = m));
  }

  addMusings() {
    db.createMusingsForDate(this.date, "text").then((id) => {
      this.musings.push(id); // for some reason it doesn't work when I just pass this.musings.push
    });
  }
}
</script>