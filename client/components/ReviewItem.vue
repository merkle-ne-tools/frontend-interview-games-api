<template>
  <div class="card">
    <strong>{{ review.username }}</strong>
    <p>Rating: {{ review.rating }}</p>
    <p>{{ review.text }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Review } from "@/types/game";

defineProps<{ review: Review }>();
</script>
