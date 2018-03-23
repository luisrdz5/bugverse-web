<template>
  <div>

    <metric uuid="4c413de2-10c4-4b24-9e94-a1dd3a25bb12" type="promiseMetric"></metric>
    
    <agent
      v-for="agent in agents"
      :uuid="agent.uuid"
      :key="agent.uuid">
    </agent>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<style>
  body {
    font-family: Arial;
    background: #f8f8f8;
    margin: 0;
  }
</style>

<script>

module.exports = {
  data () {
    return {
      agents: [],
      error: null
    }
  },

  mounted () {
    this.initialize()
  },

  methods: {
    initialize () {
    }
  }
}
</script>
