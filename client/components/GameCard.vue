<template>
  <div
    class="card"
    role="button"
    tabindex="0"
    @click="goToDetail"
    @keyup.enter="goToDetail"
  >
    <img :src="image" @error="onError" alt="Game cover" />

    <h3>{{ game.title }}</h3>
    <p>{{ formatDate(game.releaseDate) }}</p>
    <p>{{ ratingText }}</p>
    <p>{{ game.genre.genreName }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Game } from "@/types/game";
import { formatDate } from "@/utils/formatDate";

const props = defineProps<{ game: Game }>();
const router = useRouter();

const goToDetail = () => {
  router.push(`/games/${props.game.id}`);
};

const image = computed(() => {
  const cover = props.game.images.find((i) => i.image_type === "Cover");
  return cover ? `${cover.image_url}` : "/fallback.jpg";
});

const ratingText = computed(() => {
  return `${props.game.averageRating.toFixed(1)} (${props.game.totalReviews})`;
});

const onError = (e: Event) => {
  (e.target as HTMLImageElement).src = "/fallback.jpg";
};
</script>
