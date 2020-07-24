<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <v-app-bar-nav-icon @click="drawerOpen = !drawerOpen"></v-app-bar-nav-icon>
      <v-toolbar-title>Mood Diary</v-toolbar-title>
    </v-app-bar>

    <router-view />

    <v-navigation-drawer v-model="drawerOpen" fixed temporary>
      <v-list>
        <v-list-item :disabled="storagePersisted" @click="persistStorage">
          <v-list-item-action>
            <v-icon>mdi-{{ storageIcon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ storageMessage }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-application-export</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Export XML</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-application-import</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Import XML</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  drawerOpen = false;
  storagePersisted = false;

  get storageMessage() {
    return this.storagePersisted ? "Storage persisted" : "Persist storage";
  }

  get storageIcon() {
    return this.storagePersisted ? "database-check" : "database";
  }

  created() {
    navigator.storage.persisted().then((p) => (this.storagePersisted = p));
  }

  persistStorage() {
    navigator.storage.persist().then((p) => (this.storagePersisted = p));
  }
}
</script>
