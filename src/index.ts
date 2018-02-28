import Vue from "vue";

// import BootstrapVue from "bootstrap-vue"; // TODO error 
const BootstrapVue = require("bootstrap-vue").default;
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import LocationList from "./components/LocationList.vue";

Vue.use(BootstrapVue);

const app = new Vue({
    el: "#app",
    template: `
        <div>
            <location-list />
        </div>
    `,
    data: {
        name: "World",
    },
    components: {
        "location-list": LocationList,
    },
});

