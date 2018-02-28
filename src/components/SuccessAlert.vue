<template>
    <div>
        <b-alert 
                :show="alert.success"
                dismissible
                variant="success"
                @dismissed="alert.success=0"
                >
            <p>Success</p>
            <b-progress variant="warning"
                :max="3"
                :value="alert.success"
                height="0px"
                >
            </b-progress>
        </b-alert>
        <b-alert 
                :show="alert.error"
                dismissible
                variant="error"
                @dismissed="alert.error=0"
                >
            <p>Error</p>
            <b-progress variant="warning"
                :max="3"
                :value="alert.error"
                height="0px"
                >
            </b-progress>
        </b-alert>
    </div>
</template>
  
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        alert: {
            type: Object,
            required: true,
            validator: (value: any)=>{
                return !!value;
            }
        }
    },
    data() {
        return {};
    },
    methods: {
    },
    computed: {
    }
});
</script>

<style>
</style>
