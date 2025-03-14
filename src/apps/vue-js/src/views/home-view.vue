<script lang='ts' setup>
</script>

<template>
    <div class='home-view h-100 p-1 d-flex align-center justify-center flex-wrap overflow-hidden overflow-y-auto'>
        <router-link :to='{ name: "people-view" }'>
            <div class='home-view__card card d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer'>
                <div class='home-view__card-picture-wrapper p-1 overflow-hidden'>
                    <img class='home-view__card-picture' :src='"images/people.png"' alt='People'/>
                </div>
                <div class='home-view__card-title center py-05 border-top-1'>People</div>
            </div>
        </router-link>
        <div class='home-view__card card d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer'>
            <div class='home-view__card-picture-wrapper p-1 overflow-hidden'>
                <img class='home-view__card-picture' :src='"images/films.png"' alt='Films'/>
            </div>
            <div class='home-view__card-title center py-05 border-top-1'>Films</div>
        </div>
        <div class='home-view__card card d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer'>
            <div class='home-view__card-picture-wrapper p-1 overflow-hidden'>
                <img class='home-view__card-picture' :src='"images/planets.png"' alt='Planets'/>
            </div>
            <div class='home-view__card-title center py-05 border-top-1'>Planets</div>
        </div>
        <div class='home-view__card card d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer'>
            <div class='home-view__card-picture-wrapper p-1 overflow-hidden'>
                <img class='home-view__card-picture' :src='"images/species.png"' alt='Species'/>
            </div>
            <div class='home-view__card-title center py-05 border-top-1'>Species</div>
        </div>
        <div class='home-view__card card d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer'>
            <div class='home-view__card-picture-wrapper p-1 overflow-hidden'>
                <img class='home-view__card-picture' :src='"images/starships.png"' alt='Starships'/>
            </div>
            <div class='home-view__card-title center py-05 border-top-1'>Starships</div>
        </div>
        <div class='home-view__card card d-flex flex-column overflow-hidden m-1 border-1 radius-s shadow cursor-pointer'>
            <div class='home-view__card-picture-wrapper p-1 overflow-hidden'>
                <img class='home-view__card-picture' :src='"images/vehicles.png"' alt='Vehicles'/>
            </div>
            <div class='home-view__card-title center py-05 border-top-1'>Vehicles</div>
        </div>
    </div>
</template>
