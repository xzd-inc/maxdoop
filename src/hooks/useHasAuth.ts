import { computed } from "vue";
// import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";

/**
 * @description 页面是否有权限
 * @param {string[] | string} auth
 * @returns boolean
 * */
export function useHasAuth(auth: string[] | string): boolean {
  const authStore = useAuthStore();

  const hasAuth = computed(() => {
    const currentPageRoles = authStore.authButtonListGet[authStore.routeName] ?? [];
    if (Array.isArray(auth)) {
      return auth.some(item => currentPageRoles.includes(item));
    } else {
      return currentPageRoles.includes(auth);
    }
  });

  return hasAuth.value;
}
