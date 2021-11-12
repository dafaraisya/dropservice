<template>
    <div class="align-self-center">
        <ul class="nav nav-tabs nav-fill">
            <li v-for="tab in tabs" :key="tab" class="nav-item">
                <a class="nav-link text-black fw-bold" :class="{ active: tab === selected }" @click="setTab(tab)">
                    {{ tab }}
                </a>
            </li>
        </ul>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        tabs: {
            type: Array,
            required: true,
        },
        selected: {
            type: String,
            required: true,
        }
    },
    methods: {
        setTab(tab) {
            this.$emit('selected', tab);
        }
    }
}
</script>

<style>
    .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
            border-top: #FFFFFF;
            border-right: #FFFFFF;
            border-left: #FFFFFF;
            border-bottom: 3px solid #000;
    }
</style>