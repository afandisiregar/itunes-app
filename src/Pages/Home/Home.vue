<template>
    <div class="container-home">
        <div class="logo-cover">
            <img :src="require('./../../assets/logo@3x.png')" alt="Logo">
        </div>
        <div class="filter-group">
            <!-- <router-link to="/projects">
                <button type="button" class="text-gray-500 bg-white btn-title">
                    Artist / Album / Title
                </button>
            </router-link> -->
            <form @submit.prevent="handleSearch">
                <input type="text" class="form-control" placeholder="Artist / Album / Title" v-model="searchTo">
                <button type="submit" class="text-white btn-search">
                    Search
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    data() {
        return {
            searchTo: ''
        }
    },
    methods: {
        handleSearch() {
            this.$router.push(`/projects?search=${this.searchTo}`)
        }
    }
}
</script>

<style scoped>
    .container-home {
        height: 100vh;
        background-image: linear-gradient(153deg, #712bda, #a45deb 100%);
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        position: relative;
    }

    .logo-cover {
        width: 72.2px;
        height: 83.8px;
    }

    .logo-cover img {
        width: 100%;
        height: 100%;
    }

    .filter-group {
        position: absolute;
        bottom: 35px;
        width: 280px;
    }

    .form-control, .btn-search {
        width: 100%;
        height: 40px;
        padding: 13px 81px 13px 79px;
        border-radius: 20px;
        border: none;
        font-size: 12px;
        font-weight: 500;
    }

    .form-control{ 
        margin-bottom: .75rem;
        text-align: center;
    }

    .btn-search {
         background-color: rgba(255, 255, 255, 0.2);
    }
</style>