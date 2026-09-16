import { createApp, type Component } from 'vue';
import App from './App.vue';

// Read server-rendered JSON props
const dataElement = document.getElementById('__INITIAL_DATA__');
let initialProps = {};

if (dataElement?.textContent) {
  try {
    initialProps = JSON.parse(dataElement.textContent);
  } catch (error) {
    console.error('Failed to parse initial server data:', error);
  }
}

const mountEl = document.getElementById('app');
if (mountEl) {
  const isCustomTemplate = mountEl.children.length > 0 || mountEl.innerHTML.trim().length > 0;

  const app = isCustomTemplate
    ? createApp({
        data() {
          return {
            ...initialProps,
          };
        },
      })
    : createApp(App, initialProps);

  // Auto-discover and register all Vue components inside src/resource
  const componentModules = import.meta.glob<{ default: Component }>('./**/*.vue', {
    eager: true,
  });

  for (const [path, module] of Object.entries(componentModules)) {
    const component = module?.default;
    if (!component) continue;

    // Extract filename without extension (e.g. './Components/test.vue' -> 'test')
    const match = path.match(/\/([^\/]+)\.vue$/);
    if (match && match[1]) {
      const name = match[1];

      // Exact name (e.g. 'test')
      app.component(name, component);

      // PascalCase name (e.g. 'Test')
      const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
      app.component(pascalName, component);

      // Lowercase name (e.g. 'test')
      app.component(name.toLowerCase(), component);

      // Kebab-case name (e.g. 'UserProfile' -> 'user-profile')
      const kebabName = name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
      app.component(kebabName, component);
    }
  }

  app.mount('#app');
}