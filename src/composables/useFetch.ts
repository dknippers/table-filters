import { ref, type Ref } from 'vue';

export function useFetch<T>(url: string) {
    const error: Ref<boolean> = ref(false);
    const loading: Ref<boolean> = ref(true);

    let lastRunId = 0;
    async function fetchData(query?: string) {
        const runId = ++lastRunId;

        loading.value = true;
        error.value = false;

        try {
            const requestUrl = query == null ? url : `${url}${query.length > 0 ? `?${query}` : ''}`;
            const response = await fetch(requestUrl);

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

            return (await response.json()) as T;
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

    return { fetchData, error, loading };
}
