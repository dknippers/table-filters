import { computed } from "vue";
import type { Ref } from "vue";
import type { Traveler } from "./types";

const travelers: Traveler[] = [{ name: "Alpha" }, { name: "Bravo" }];

export function useTravelers(query: Ref<string>) {
  const filtered = computed(() =>
    travelers.filter(item => item.name.toLowerCase().includes(query.value.toLowerCase()))
  );

  return {
    travelers,
    filtered,
  };
}
