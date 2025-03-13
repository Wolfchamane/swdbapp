<script lang='ts' setup>
    import { DefaultPeopleHttpClient, type People } from '@swdbapp/infra-http';
    import { onMounted, type Ref, ref } from 'vue';

    const people: Ref<People|null> = ref(null);

    onMounted(async () => {
        const httpClient = new DefaultPeopleHttpClient();
        const response = await httpClient.list();
        people.value = response.results;
    });
</script>

<template>
    <header class='app-header'></header>
    <main class='app-main'>
        <h1>It works!</h1>
        <p>{{ people }}</p>
    </main>
    <footer class='app-footer'></footer>
</template>
