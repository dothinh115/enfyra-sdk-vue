import { ref as b, unref as p, toRaw as E } from "vue";
const m = b({
  apiUrl: "",
  apiPrefix: "/api",
  defaultHeaders: {}
});
function D() {
  return {
    setConfig: (s) => {
      m.value = { ...m.value, ...s };
    },
    getConfig: () => m.value
  };
}
async function U(a, i = {}) {
  const {
    method: s = "GET",
    body: t,
    headers: l = {},
    query: c = {},
    baseURL: o
  } = i, { apiUrl: R, defaultHeaders: y = {} } = m.value, d = o || R, h = new URL(
    a.startsWith("/") ? a.slice(1) : a,
    d.endsWith("/") ? d : `${d}/`
  );
  Object.entries(c).forEach(([n, r]) => {
    r != null && h.searchParams.append(n, String(r));
  });
  const w = {
    "Content-Type": "application/json",
    ...y,
    ...l
  }, e = {
    method: s.toUpperCase(),
    headers: w
  };
  t && s.toUpperCase() !== "GET" && (t instanceof FormData ? (delete w["Content-Type"], e.body = t) : e.body = JSON.stringify(t));
  try {
    const n = await fetch(h.toString(), e);
    if (!n.ok) {
      let f;
      try {
        f = await n.json();
      } catch {
        f = { message: n.statusText };
      }
      throw { response: { data: f } };
    }
    const r = n.headers.get("content-type");
    return r != null && r.includes("application/json") ? await n.json() : await n.text();
  } catch (n) {
    throw n;
  }
}
function A(a, i) {
  var c;
  let s = "Request failed", t = "UNKNOWN_ERROR", l;
  if ((c = a == null ? void 0 : a.response) != null && c.data) {
    const o = a.response.data;
    o.error ? (s = o.error.message || o.message || "Request failed", t = o.error.code, l = o.error.correlationId) : s = o.message || "Request failed";
  } else if (a != null && a.data) {
    const o = a.data;
    o.error ? (s = o.error.message || o.message || "Request failed", t = o.error.code, l = o.error.correlationId) : s = o.message || "Request failed";
  } else a != null && a.message && (s = a.message);
  console.error(`[Enfyra API Error] ${t}: ${s}`, {
    context: i,
    correlationId: l,
    error: a
  });
}
function I(a, i = {}) {
  const { method: s = "get", body: t, query: l, errorContext: c } = i, { apiUrl: o, apiPrefix: R } = m.value, y = b(null), d = b(null), h = b(!1);
  return {
    data: y,
    error: d,
    pending: h,
    execute: async (e) => {
      h.value = !0, d.value = null;
      try {
        const n = (typeof a == "function" ? a() : a).replace(/^\/?api\/?/, "").replace(/^\/+/, ""), r = (e == null ? void 0 : e.body) || p(t), f = p(l), q = (...u) => u.filter(Boolean).join("/"), C = o + (R || "");
        if (!i.disableBatch && (e != null && e.ids) && e.ids.length > 0 && (s.toLowerCase() === "patch" || s.toLowerCase() === "delete")) {
          const u = e.ids.map(async (v) => {
            const j = q(n, v);
            return U(j, {
              baseURL: C,
              method: s,
              body: r ? E(r) : void 0,
              headers: i.headers,
              query: f
            });
          }), g = await Promise.all(u);
          return y.value = g, g;
        }
        if (!i.disableBatch && s.toLowerCase() === "post" && (e != null && e.files) && Array.isArray(e.files) && e.files.length > 0) {
          const u = e.files.map(async (v) => U(n, {
            baseURL: C,
            method: s,
            body: v,
            // {file: file1, folder: null}
            headers: i.headers,
            query: f
          })), g = await Promise.all(u);
          return y.value = g, g;
        }
        const L = e != null && e.id ? q(n, e.id) : n, P = await U(L, {
          baseURL: C,
          method: s,
          body: r ? E(r) : void 0,
          headers: i.headers,
          query: f
        });
        return y.value = P, P;
      } catch (n) {
        return d.value = n, A(n, c), null;
      } finally {
        h.value = !1;
      }
    }
  };
}
export {
  U as $fetch,
  I as useEnfyraApi,
  D as useEnfyraConfig
};
