<template>
  <div class="vue-container">
    <h2>Vite + Vue Frontend Active! 🚀</h2>
    <p>Edit <code>src/resource/App.vue</code> and see it live-reload without page refresh!</p>

    <!-- Props received from NestJS controller -->
    <div class="props-section">
      <h3>Props from NestJS Controller:</h3>
      <div class="prop-item">
        <strong>Message:</strong> <span>{{ message }}</span>
      </div>
      <div v-if="user" class="prop-item">
        <strong>User:</strong> <span>{{ user.name }} ({{ user.role }})</span>
      </div>
      <div v-if="stats" class="prop-item">
        <strong>Server Stats:</strong>
        <span>Uptime: {{ stats.uptime }} | Requests: {{ stats.requests }}</span>
      </div>
    </div>

    <div class="counter-box">
      <button @click="count++">Count is: {{ count }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

interface User {
  name: string;
  role: string;
}

interface Stats {
  uptime: string;
  requests: number;
}

export default defineComponent({
  name: 'App',
  props: {
    message: {
      type: String,
      default: 'Hello from Vue default prop!',
    },
    user: {
      type: Object as PropType<User>,
      default: () => null,
    },
    stats: {
      type: Object as PropType<Stats>,
      default: () => null,
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
});
</script>

<style scoped>
.vue-container {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  padding: 24px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  margin-top: 16px;
}

h2 {
  color: #0369a1;
  margin-top: 0;
}

p {
  color: #334155;
}

.props-section {
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin: 16px 0;
}

.props-section h3 {
  margin: 0 0 12px 0;
  color: #0f172a;
  font-size: 16px;
}

.prop-item {
  margin-bottom: 8px;
  color: #334155;
  font-size: 14px;
}

.prop-item strong {
  color: #0284c7;
}

.counter-box {
  margin-top: 16px;
}

button {
  background-color: #0284c7;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0369a1;
}
</style>
