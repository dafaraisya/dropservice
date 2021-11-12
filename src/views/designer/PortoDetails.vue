<template>
    <div class="container d-flex justify-content-center vh-100">
        <div class="row w-100 h-100">
            <div class="col h-100 d-flex flex-column justify-content-center text-start">
                <p class="h4 fw-bold m-0">Portofolio Details</p>
                <div class="porto-img bg-black my-3"></div>
                <p class="h3 fw-bold">{{ this.$route.params.titleporto }}</p>
                <p class="h6">Rp500.000,00/item(approximately)</p>
            </div>
            <div class="col h-100 d-flex flex-column justify-content-center">
                <p class="m-0 fs-6">Video intro 3-5 minutes full HD</p>
                <p class="m-0 fs-6">Contact for more information</p>
                <TabNav class="mt-4 w-75" :tabs="['Provision', 'How to Order']" :selected="selected" @selected="setSelected">
                    <Tab class="mt-1" :isSelected="selected === 'Provision'">
                        <textarea class="px-2 border-0 shadow-none fw-light" placeholder="Your description here" rows="3"></textarea>
                    </Tab>
                    <Tab class="mt-1" :isSelected="selected === 'How to Order'">
                        <textarea class="px-2 border-0 shadow-none fw-light" placeholder="How to order your service" rows="3"></textarea>
                    </Tab>
                </TabNav>
                <div class="row w-75 mt-3 align-self-center">
                    <div class="col">
                        <p class="h3 bi bi-share-fill"></p>
                    </div>
                    <div class="col">
                        <p class="h3 bi bi-heart-fill"></p>
                    </div>
                    <div class="col">
                        <p class="h3 bi bi-chat-right-text-fill"></p>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-dark w-100">Change</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TabNav from '@/components/TabNav.vue';
import Tab from '@/components/Tab.vue';

export default {
    name: 'Portofolio Details',
    components: { TabNav, Tab },
    data() {
        return {
            selected: 'Provision'
        };
    },
    methods: {
        setSelected(tab) {
            this.selected = tab;
        }
    },
    // props: {
    //     portoName: {
    //         type: String,
    //         required: true
    //     }
    // }
}
</script>

<style>
    #circle-profile {
        width: 50px;
        height: 50px;
    }

    .porto-img {
        height: 40%;
    }

    textarea {
        resize: none;
		width: 500px;
    }

    textarea:focus {
        outline: none;
    }
</style>