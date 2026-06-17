/** En-têtes HTTP Basic Auth (aligné sur useFetch). */
export function getApiAuthHeaders(extra = {}) {
   const username = "admin";
   const password = "passwordadmin237";
   const base64Credentials = btoa(`${username}:${password}`);
   return {
      Authorization: `Basic ${base64Credentials}`,
      Connection: "Keep-alive",
      ...extra,
   };
}
