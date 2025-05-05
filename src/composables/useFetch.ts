import { ref, watchEffect, type Ref } from 'vue';

export function useFetch<T>(url: Ref<string>) {
  const data: Ref<T | null> = ref(null);
  const error: Ref<boolean> = ref(false);
  const loading: Ref<boolean> = ref(true);

  let lastRunId = 0;
  async function fetchData() {
    const runId = ++lastRunId;

    loading.value = true;
    error.value = false;

    try {
      const response = await fetch(url.value);

      if (runId !== lastRunId) {
        // A newer fetch has started -- drop this stale result.
        return;
      }

      if (!response.ok) {
        if (runId === lastRunId) {
          error.value = true;
        }
        return;
      }

      data.value = await response.json();
    } catch (err) {
      if (runId === lastRunId) {
        error.value = true;
      }
    } finally {
      if (runId === lastRunId) {
        loading.value = false;
      }
    }
  }

  watchEffect(async () => {
    await fetchData();
  });

  return { data, error, loading };
}
