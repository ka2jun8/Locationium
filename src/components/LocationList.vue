<template>
    <div class="main">
        <h3>Location List</h3>
        <div style="display:flex; flex-direction:column;">
            <div style="width: 200px; margin: 5px;" >
                <div>
                    * Unit: {{cell.unit}}
                </div>
                <div>
                    * Cell: {{cell.name}}
                </div>
            </div>
            <alert-view :alert="alert"/>
            <div style="width: 200px; margin: 5px;" >
                <div style="margin: 5px;" v-for="place in places" v-bind:key="place">
                    <place-button @childs-event="onAlert" :place="place"/>
                </div>
                <div style="margin: 5px;" >
                    <b-btn style="width: 180px;" @click="webbluetooth">WBT</b-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Promise} from "es6-promise";
import * as moment from "moment";
import Alert from "./SuccessAlert.vue";
import PlaceButton from "./LocationButton.vue";
import { postPresenceToPersonium, getPlace, getCellInfo } from "../personium-client-wrapper";

const onWebBluetoothStart = require("../web-ble").onWebBluetoothStart;

export default Vue.extend({
    props: {
    },
    data() {
        return {
            alert: {success: 0, error: 0},
            cell: {},
            places: [],
        }
    },
    created () {
        this.cell = getCellInfo();
        this.places = getPlace();
    },
    methods: {
        onAlert(result: {success: number, error: number}) {
            if(result.success) {
                this.alert.success = result.success;
            }else if(result.error) {
                this.alert.error = result.error;
            }
        },
        webbluetooth() {
            onWebBluetoothStart().then(()=>{
                this.alert.success = 3;
            }).catch(()=>{
                this.alert.error = 3;
            });
        },
    },
    computed: {
    },
    components: {
        "place-button": PlaceButton,
        "alert-view": Alert,
    },
});

function startWebBluetooth() {
    return new Promise<void>((resolve, reject)=>{
        onWebBluetoothStart().then((minor: string)=>{
            let place: string = "";
            if(!!getPlace(minor)) {
                place = getPlace(minor);
            }else {
                place = "Not defined.";
            }
            return postPresenceToPersonium(place);
        }).then(()=>{
            resolve();
        }).catch((error: any)=>{
            console.error(error);
            reject();
        });
    });
}

</script>

<style>
    .main {
        margin: 20px;
    }
</style>





