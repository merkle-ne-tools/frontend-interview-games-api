<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGames } from "@/composables/useGames";
import { formatDate } from "@/utils/formatDate";

const route = useRoute();
const router = useRouter();
const { fetchGameById } = useGames();

const { data: game } = await useAsyncData("game", () => {
  return fetchGameById(route.params.id as string);
});

const image = computed(() => {
  const cover = game.value?.images.find((item) => item.image_type === "Cover");
  return cover?.image_url || game.value?.images[0]?.image_url || "/fallback.jpg";
});

const ratingText = computed(() => {
  if (!game.value) return "0.0 (0)";
  return `${game.value.averageRating.toFixed(1)} (${game.value.totalReviews})`;
});

const onError = (event: Event) => {
  (event.target as HTMLImageElement).src = "/fallback.jpg";
};
</script>

<template>
  <div class="container" v-if="game">
    <button @click="router.back()">Back</button>

    <h1>{{ game.title }}</h1>

    <img class="featured-image" :src="image" @error="onError" alt="Game image" />

    <p>{{ game.description }}</p>
    <p>Release date: {{ formatDate(game.releaseDate) }}</p>
    <p>Rating: {{ ratingText }}</p>
    <p>Developer: {{ game.developer.name }}</p>
    <p>Genre: {{ game.genre.genreName }}</p>

    <h2>Reviews</h2>

    <ReviewItem v-for="review in game.reviews" :key="review.id" :review="review" />
  </div>
</template>
