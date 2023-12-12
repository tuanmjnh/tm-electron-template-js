const NAMESPACED = 'app'
export default {
  id: NAMESPACED,
  persist: true,
  state: () => ({
    loading: {
      get: false,
      post: false,
      put: false,
      patch: false,
      delete: false
    }
  }),
  getters: {},
  actions: {
    setLoading(arg) {
      if (arg) this.loading[arg.key] = arg.value
      else this.loading = {
        get: false,
        post: false,
        put: false,
        patch: false,
        delete: false
      }
    },
    // easily reset state using `$reset`
    clear() {
      this.$reset()
    }
  }
}
