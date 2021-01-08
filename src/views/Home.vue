<template>
    <div class="wrapper">
        <v-header />
        <v-siderbar />

        <div class="content-box" :class="{'content-collapse':collapse}">
          <div class="content">
            <transition name="move" model="out-in">
                <router-view></router-view>
            </transition>
          </div>
        </div>
    </div>
</template>

<script>
    //这么命名是为了防止和html本身的标签起冲突
    import vHeader from '../components/Header.vue';
    import vSiderbar from '../components/Sidebar.vue';

    export default {
        data() {
            return {
                collapse: false,
            };
        },
        components: {
            vHeader,
            vSiderbar,
        },
        created(){
          this.$bus.on("collapse-content", msg => {
            this.collapse = msg;
          })
        },
        beforeDestroy(){
          this.$bus.off("collapse-content", msg => {
            this.collapse = msg;
          })
        }
    }
</script>

<style scoped>

</style>