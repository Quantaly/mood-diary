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
        <v-list-item @click="exportXML">
          <v-list-item-action>
            <v-icon>mdi-application-export</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Export XML</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="importXML">
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
import * as db from "./db/xml";

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

  exportXML() {
    db.exportXML().then(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "diary.xml";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }

  importXML() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "text/xml";
    input.style.display = "none";
    input.addEventListener("input", () => {
      if (input?.files?.[0]) {
        db.importXML(input.files[0]).then(() => {
          location.reload(false);
        });
      }
    });
    document.body.appendChild(input);
    input.click();
    input.remove();
  }
}
</script>
