import { createApp } from 'vue';
import { useEnfyraApi, useEnfyraConfig } from '../src';

// Example Vue component
const ExampleComponent = {
  setup() {
    // Configure SDK
    const { setConfig } = useEnfyraConfig();
    setConfig({
      apiUrl: 'https://your-enfyra-api.com',
      apiPrefix: '/api',
      defaultHeaders: {
        'Authorization': 'Bearer your-token'
      }
    });

    // Use the API
    const { data, error, pending, execute } = useEnfyraApi('/users');

    // Fetch data
    const fetchUsers = async () => {
      await execute();
    };

    // Create user
    const createUser = async (userData: any) => {
      const createApi = useEnfyraApi('/users', { method: 'post' });
      await createApi.execute({ body: userData });
    };

    // Update user
    const updateUser = async (id: number, userData: any) => {
      const updateApi = useEnfyraApi('/users', { method: 'patch' });
      await updateApi.execute({ id, body: userData });
    };

    // Delete user
    const deleteUser = async (id: number) => {
      const deleteApi = useEnfyraApi('/users', { method: 'delete' });
      await deleteApi.execute({ id });
    };

    // Batch operations
    const deleteMultipleUsers = async (ids: number[]) => {
      const batchDeleteApi = useEnfyraApi('/users', { method: 'delete' });
      await batchDeleteApi.execute({ ids });
    };

    return {
      data,
      error,
      pending,
      fetchUsers,
      createUser,
      updateUser,
      deleteUser,
      deleteMultipleUsers
    };
  },
  
  template: `
    <div>
      <button @click="fetchUsers">Fetch Users</button>
      <div v-if="pending">Loading...</div>
      <div v-if="error">Error: {{ error }}</div>
      <div v-if="data">
        <pre>{{ JSON.stringify(data, null, 2) }}</pre>
      </div>
    </div>
  `
};

// Create app
const app = createApp(ExampleComponent);
app.mount('#app');