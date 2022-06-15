<template>

</template>

<script setup lang="ts">
import {defineEmits, reactive} from "vue";
const emit = defineEmits(["switch-panel"])

const form = reactive({
  password: "",
  name: "",
  remember: false,
})

function switchPanel() {
  emit("switch-panel", "LoginPanel")
}
function login() {

}
</script>

<style module lang="scss"></style>
