<template>
    <div style="display: flex; flex-direction: row;">
        <b-btn style="width: 180px;" variant="success" :value="place" @click="update">{{place}}</b-btn>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Promise} from "es6-promise";
import * as moment from "moment";
import { postPresenceToPersonium } from "../personium-client-wrapper";

export default Vue.extend({
    props: {
        place: {
            type: String,
            required: true,
            validator: (value: any)=>{
                return !!value;
            }
        }
    },
    data() {
        return {
        }
    },
    created () {
    },
    methods: {
        update(e: any) {
            console.log("update: value = ", e.target.value);
            const place = e.target.value;
            postPresenceToPersonium(place).then(()=>{
                this.$emit("childs-event", {success: 3})
            }).catch((error: any)=>{
                console.error(error);
                this.$emit("childs-event", {error: 3});
            });
        },
    },
    computed: {
    },
    components: {
    },
});

</script>

<style>
    .main {
        margin: 20px;
    }
</style>





