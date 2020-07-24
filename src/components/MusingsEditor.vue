<template>
    <div>
        <v-textarea color="green" auto-grow filled v-model="musings.contents" @change="updateMusings" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Musings } from "../db/models"; 
import * as db from "../db/accessors";

@Component({})
export default class MusingsEditor extends Vue {
    @Prop() musingsKey!: number;
    musings: Musings = {
        entry: "",
        type: "text",
        contents: "",
    }

    created() {
        db.getMusingsByKey(this.musingsKey).then(m => this.musings = m);
    }

    updateMusings() {
        db.saveMusings(this.musings, this.musingsKey);
    }
}
</script>