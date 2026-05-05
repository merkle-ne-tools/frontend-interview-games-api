<script setup lang="ts">
import { computed, ref } from "vue";
import { useGames } from "@/composables/useGames";

const { fetchGames } = useGames();

const sortBy = ref<"rating" | "date">("rating");

const { data } = await useAsyncData("games", () => fetchGames());

const games = computed(() => {
  const gameList = data.value?.games || [];

  return [...gameList].sort((firstGame, secondGame) => {
    if (sortBy.value === "date") {
      const firstDate = new Date(firstGame.releaseDate).getTime();
      const secondDate = new Date(secondGame.releaseDate).getTime();

      return secondDate - firstDate;
    }

    return secondGame.averageRating - firstGame.averageRating;
  });
});
</script>

<template>
  <div class="container">
    <h1>Games</h1>

    <select v-model="sortBy">
      <option value="rating">Sort by Rating</option>
      <option value="date">Sort by Date</option>
    </select>

    <div class="grid">
      <GameCard v-for="game in games" :key="game.id" :game="game" />
    </div>
  </div>
</template>
