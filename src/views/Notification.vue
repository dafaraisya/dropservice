<template>
  <div class="container vh-100">
    <div class="row h-100">
      <div
        class="col my-3 d-none d-lg-flex flex-column justify-content-center align-items-center"
      >
        <div
          class="
            profile-shape
            d-flex
            justify-content-center
            align-items-center
            rounded-circle
            bg-black
          "
        >
          <p class="m-0 display-1">{{ this.$store.state.profileInitials }}</p>
        </div>
        <div class="">
          <p class="fs-1 fw-bold m-0 mt-2">
            {{ this.$store.state.profileName }}
          </p>
          <p
            v-if="this.$store.state.profileRole == 'designer'"
            class="fs-3 m-0 lh-1"
          >
            Designer
          </p>
          <p v-if="this.$store.state.profileRole == 'client'" class="fs-3">
            Client
          </p>
        </div>
      </div>
      <div class="col h-100 py-2 d-flex flex-column justify-content-start align-items-center">
        <!-- Back Button -->
        <div class="py-2 w-100 border-bottom">
            <div class="d-flex align-items-center py-1">
              <router-link to="/chats">
                <button class="border-0 bg-transparent">
                  <i class="bi bi-arrow-left h2 me-2"></i>
                </button>
              </router-link>
              <strong class="m-0 p-0 lh-base align-middle">Notification</strong>
            </div>
        </div>
        
        <!-- Notification Container -->
        <div class="notif-container d-flex flex-column align-items-start w-100 h-100 py-3 pe-2">
            <NotificationCard 
                profileSrc="https://picsum.photos/600/400.jpg" 
                profileName="Dafa Raisya" 
                message="started following you"
            />
            <NotificationCard 
                profileSrc="https://picsum.photos/600/400.jpg" 
                profileName="Bakar Desain" 
                message="replied to your message replied to your message"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationCard from '@/components/NotificationCard.vue'
export default {
    name: 'Notification',
    components: { NotificationCard }
}
</script>

<style>
    .profile-shape {
        height: 9em;
        width: 9em;
        color: #fff;
    }

    .notif-container {
        overflow-y: scroll;
    }
</style>