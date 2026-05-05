export const useGames = () => {
  const config = useRuntimeConfig();

  const getGameStats = async (id: number) => {
    try {
      const response: any = await $fetch(`${config.public.apiBase}/games/${id}/stats`);
      const stats = response.data || {};

      return {
        averageRating: Number(stats.average_rating || 0),
        totalReviews: Number(stats.total_reviews || 0),
      };
    } catch (error) {
      return {
        averageRating: 0,
        totalReviews: 0,
      };
    }
  };

  const formatGame = (game: any, stats = { averageRating: 0, totalReviews: 0 }) => {
    return {
      id: game.id,
      title: game.title,
      description: game.description,
      platform: game.platform,
      releaseDate: game.release_date,
      averageRating: stats.averageRating,
      totalReviews: stats.totalReviews,

      genre: {
        genreName: game.genre?.name || "N/A",
      },

      developer: {
        name: game.developer?.name || "Unknown",
      },

      reviews: (game.reviews || []).map((review: any) => {
        return {
          id: review.id,
          username: review.user?.username || "Anonymous",
          rating: review.rating,
          text: review.review_text,
        };
      }),

      images: (game.images || []).map((image: any) => {
        return {
          id: image.id,
          image_url: `http://localhost:8000${image.image_url}`,
          image_type: image.image_type,
        };
      }),
    };
  };

  const fetchGames = async () => {
    try {
      const response: any = await $fetch(`${config.public.apiBase}/games`, {
        query: {
          fromDate: "2015-01-01",
          toDate: "2017-12-31",
          limit: 100,
        },
      });

      const games = response.data || [];
      const randomGames = [...games].sort(() => Math.random() - 0.5).slice(0, 15);

      const gamesWithStats = await Promise.all(
        randomGames.map(async (game: any) => {
          const stats = await getGameStats(game.id);
          return formatGame(game, stats);
        }),
      );

      return {
        games: gamesWithStats,
      };
    } catch (error) {
      console.error("API ERROR (fetchGames):", error);
      return {
        games: [],
      };
    }
  };

  const fetchGameById = async (id: string | number) => {
    try {
      const response: any = await $fetch(`${config.public.apiBase}/games/${id}`);

      if (!response.data) {
        return null;
      }

      const stats = await getGameStats(Number(id));
      return formatGame(response.data, stats);
    } catch (error) {
      console.error("API ERROR (fetchGameById):", error);
      return null;
    }
  };

  return {
    fetchGames,
    fetchGameById,
  };
};
