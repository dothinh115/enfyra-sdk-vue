# @enfyra/vue-sdk

Vue.js SDK for Enfyra CMS - A lightweight, pure Vue composable for API interactions.

## Features

- 🚀 Pure Vue 3 composable (no Nuxt dependencies)
- 📦 TypeScript support out of the box
- 🔧 Configurable API endpoints and headers
- 🔄 Batch operations support
- ⚡ Reactive data binding
- 🎯 Error handling with context
- 📱 Works with any Vue 3 project

## Installation

```bash
npm install @enfyra/vue-sdk
# or
yarn add @enfyra/vue-sdk
# or
pnpm add @enfyra/vue-sdk
```

## Quick Start

### 1. Configure the SDK

```ts
import { useEnfyraConfig } from '@enfyra/vue-sdk';

// In your main.ts or app setup
const { setConfig } = useEnfyraConfig();
setConfig({
  apiUrl: 'https://your-enfyra-api.com',
  apiPrefix: '/api',
  defaultHeaders: {
    'Authorization': 'Bearer your-token'
  }
});
```

### 2. Use in Components

```vue
<template>
  <div>
    <button @click="fetchUsers" :disabled="pending">
      {{ pending ? 'Loading...' : 'Fetch Users' }}
    </button>
    
    <div v-if="error" class="error">
      Error: {{ error }}
    </div>
    
    <div v-if="data">
      <div v-for="user in data" :key="user.id">
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEnfyraApi } from '@enfyra/vue-sdk';

// Basic GET request
const { data, error, pending, execute } = useEnfyraApi('/users');

const fetchUsers = () => execute();

// POST request
const createUserApi = useEnfyraApi('/users', { method: 'post' });

const createUser = async (userData: any) => {
  await createUserApi.execute({ body: userData });
};

// PATCH with ID
const updateUserApi = useEnfyraApi('/users', { method: 'patch' });

const updateUser = async (id: number, userData: any) => {
  await updateUserApi.execute({ id, body: userData });
};

// DELETE with ID
const deleteUserApi = useEnfyraApi('/users', { method: 'delete' });

const deleteUser = async (id: number) => {
  await deleteUserApi.execute({ id });
};

// Batch operations
const batchDeleteApi = useEnfyraApi('/users', { method: 'delete' });

const deleteMultipleUsers = async (ids: number[]) => {
  await batchDeleteApi.execute({ ids });
};
</script>
```

## API Reference

### useEnfyraConfig()

Configure the SDK globally.

```ts
const { setConfig, getConfig } = useEnfyraConfig();

setConfig({
  apiUrl: 'https://api.example.com',
  apiPrefix: '/api',
  defaultHeaders: {
    'Authorization': 'Bearer token',
    'Custom-Header': 'value'
  }
});
```

### useEnfyraApi(path, options)

Main composable for API interactions.

**Parameters:**
- `path`: string | (() => string) - API endpoint path
- `options`: ApiOptions - Configuration options

**Options:**
- `method`: 'get' | 'post' | 'put' | 'patch' | 'delete' (default: 'get')
- `body`: any - Request body
- `query`: Record<string, any> - Query parameters
- `headers`: Record<string, string> - Custom headers
- `errorContext`: string - Context for error handling
- `disableBatch`: boolean - Disable batch operations

**Returns:**
- `data`: Ref<T | null> - Response data
- `error`: Ref<any> - Error state
- `pending`: Ref<boolean> - Loading state
- `execute`: Function - Execute the request

### Execute Options

The `execute` function accepts optional parameters:

```ts
await execute({
  body: { name: 'John' },           // Override body
  id: 123,                          // Single ID for path
  ids: [1, 2, 3],                  // Multiple IDs for batch operations
  files: [fileObj1, fileObj2]       // File objects for batch upload
});
```

## Advanced Usage

### Dynamic Paths

```ts
const userId = ref(1);
const { data, execute } = useEnfyraApi(() => `/users/${userId.value}`);

// Path will update reactively when userId changes
```

### Custom Error Handling

```ts
const { data, error, execute } = useEnfyraApi('/users', {
  errorContext: 'User Management'
});

// Errors will be logged with context
```

### File Uploads

```ts
const uploadApi = useEnfyraApi('/files', { method: 'post' });

const uploadFiles = async (files: File[]) => {
  const fileObjects = files.map(file => ({
    file,
    folder: null
  }));
  
  await uploadApi.execute({ files: fileObjects });
};
```

## TypeScript Support

The SDK is fully typed. Define your data types:

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

const { data } = useEnfyraApi<User[]>('/users');
// data is now typed as Ref<User[] | null>
```

## License

MIT# enfyra-sdk-vue
