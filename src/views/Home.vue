<template>
  <div>
    <v-main>
      <v-container fluid>
        <v-list>
          <v-list-item
            v-for="entry in entries"
            :key="entry.date"
            :to="'/' + entry.date"
          >
            <v-list-item-content>
              <v-list-item-title>{{ entry.date }}</v-list-item-title>
              <v-list-item-subtitle>Mood: {{ entry.mood }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>

    <v-btn fixed bottom right fab dark color="green" :to="'/' + today">
      <v-icon>mdi-calendar-today</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as db from "../db/accessors";
import { Entry } from "../db/models";

@Component({})
export default class Home extends Vue {
  entries: Entry[] = [];

  created() {
    db.getEntries().then((e) => (this.entries = e.reverse()));
  }

  get today() {
      const now = new Date();
      if (now.getHours() < 5) { // if I'm writing before 5 am, it's probably about the previous day
          now.setTime(now.getTime() - 1000 * 60 * 60 * 24);
      }
      return db.dateToEntryKey(now);
  }
}
</script>