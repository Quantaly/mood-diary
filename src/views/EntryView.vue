<template>
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
      <v-divider />
      <div class="padded-container">
        <v-btn color="green" class="white--text">
          <v-icon left>mdi-pencil</v-icon>Muse
        </v-btn>
      </div>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped>
.padded-container {
  padding: 1em 0;
}

.slider-container {
  @extend .padded-container;
  max-width: 400px;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as db from "../db/database";
import { Entry, KeyedMusings } from "../db/models";

@Component({})
export default class EntryView extends Vue {
  entry: Entry = { date: "", mood: 0 };
  musings: KeyedMusings[] = [];

  get date() {
    return this.$route.params.date;
  }

  updateMood() {
    db.saveEntry(this.entry);
  }

  created() {
    db.getEntryForDate(this.date).then((e) => (this.entry = e));
    db.getMusingsForDate(this.date).then((m) => (this.musings = m));
  }
}
</script>