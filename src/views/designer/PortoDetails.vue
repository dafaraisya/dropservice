<template>
    <div class="container d-flex justify-content-center">
        <div class="row w-100 vh-100" :class="isMobile() ? 'row-cols-1' : ''">
            <div class="col d-flex flex-column justify-top text-start" :class="isMobile() ? 'mb-5' : ''">
                <p class="h4 fw-bold m-0">Portofolio Details</p>
                <!-- <div class="porto-img bg-black mt-3 mb-2"></div> -->
                <Carousel class="porto-img bg-black mt-3 mb-2 overflow-hidden" :assets="assets"/>
                <!-- <p class="h3 fw-bold">{{ this.$route.params.titleporto }}</p> -->
                <input v-model="portoTitle" type="text" class="border-0 m-0 p-0 fs-3 fw-bold" placeholder="Your Portofolio">
                <input v-model="price" type="text" class="border-0 m-0 p-0 fs-6" placeholder="Price (Example : Rp500.000,00/item)">
                <!-- <p class="h6">Rp500.000,00/item(approximately)</p> -->
            </div>
            <div class="col d-flex flex-column justify-bottom">
                <!-- <p class="m-0 fs-6">Video intro 3-5 minutes full HD</p>
                <p class="m-0 fs-6">Contact for more information</p> -->
                <textarea v-model="description" class="px-5 align-self-center text-center lh-sm w-75 border-0" placeholder="Write a description of your &#10;service in this section" rows="2"></textarea>
                <TabNav class="mt-4 w-75" :tabs="['Provision', 'How to Order']" :selected="selected" @selected="setSelected">
                    <Tab class="mt-1" :isSelected="selected === 'Provision'">
                        <textarea v-model="provision" class="form-control px-2 border-0 shadow-none fw-light" placeholder="Your provision here" rows="3"></textarea>
                    </Tab>
                    <Tab class="mt-1" :isSelected="selected === 'How to Order'">
                        <textarea v-model="order" class="form-control px-2 border-0 shadow-none fw-light" placeholder="How to order your service" rows="3"></textarea>
                    </Tab>
                </TabNav>
                <div class="w-75 mt-3 align-self-center">
                    <button class="btn btn-dark w-100">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TabNav from '@/components/TabNav.vue';
import Tab from '@/components/Tab.vue';
import Carousel from '@/components/CarouselDetails.vue'

export default {
    name: 'Portofolio Details',
    components: { TabNav, Tab, Carousel },
    data() {
        return {
            windowWidth: 0,
            selected: 'Provision',
            description: '',
            portoTitle: '',
            price: '',
            provision: '',
            order: '',
            assets: [
                'https://i.picsum.photos/id/1066/600/400.jpg?hmac=UuVv5829ZbdNQNaZ_UA0tbS15_xKJQTmH0inYMH_wOs',
                'https://i.picsum.photos/id/609/600/400.jpg?hmac=r-IiITWKZ2Q_t4oL01WKmqixoWMI-QJ7LDooJ-JiJ9c',
                'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
            ]  
        };
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    methods: {
        setSelected(tab) {
            this.selected = tab;
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
        isMobile() {
            if(this.windowWidth <= 1000) return true
            else return false
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
        height: fit-content;
    }

    .justify-top, .justify-bottom {
        justify-content: center;
    }

    textarea {
        resize: none;
		outline: none;
    }

    .form-control {
        background: transparent !important;
        border-radius: 0 !important;
        height: 100% !important;
    }

    input {
        outline: none;
    }

    @media only screen and (max-width: 1000px) {
        .justify-top {
            justify-content: end !important;
        }

        .justify-bottom {
            justify-content: start !important;
        }
    }
</style>