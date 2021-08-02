<template>
  <div>
    <p>YOUR NAME:</p>
    <h1>{{ name }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyName",
  props: {
    name: {
      type: String,
      default: "NO NAME GIVEN",
    },
  },
});
</script>
