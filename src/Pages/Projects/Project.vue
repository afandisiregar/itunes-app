<template>
    <div class="container-project">
        <div class="navbar-container">
            <div class="navbar-box"></div>
            <div class="navbar-curve"></div>
            <div class="navbar-list">
                <div class="navbar-icon_menu">
                    <i class="ri-menu-line"></i>
                </div>
                <div class="navbar-title">
                    <img :src="require('./../../assets/ngmusic@3x.png')" alt="ngmusic">
                </div>
                <div class="navbar-icon_search" @click.prevent="handleShowPopup">
                    <i class="ri-search-line"></i>
                </div>
            </div>
        </div>

        <div class="search-popup_wrapper" id="search-popup">
            <div class="body-search_popup">
                <div class="icon-close" @click.prevent="handleClosePopup">
                    <i class="ri-close-fill"></i>
                </div>
                <h6 class="title-search_popup">
                    Search
                </h6>
                <input type="text" class="form-control" placeholder="Artist / Album /Title" v-model="search">
                <button type="submit" class="text-white btn-search" @click="handleSearch">
                    Search
                </button>
            </div>
        </div>
        
        <div class="content-container">
            <div class="result-wrapper flex items-center justify-center">
                <p class="title-result text-sm">Search result for :</p>
                <p class="value-result ml-1 text-lg font-bold">{{search}}</p>
            </div>

            <div class="list-result_wrapper">
                <div class="result-item flex" v-for="(data,index) in companiesLoaded" :key="index">
                    <div class="image-wrapper">
                        <div class="image-cover">
                            <img :src="data.artworkUrl100" :alt="data.artistName">
                        </div>
                    </div>
                    <div class="item-info">
                        <div class="artist-name">{{data.artistName}}</div>
                        <div class="collection-name">{{data.collectionCensoredName}}</div>
                        <div class="bottom-info">
                            <div class="genre-name">{{data.primaryGenreName}}</div>
                            <div class="price">
                                <i class="ri-money-dollar-circle-line mr-1"></i>
                                {{data.trackPrice}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="load-more_wrapper p-3">
                    <button type="button" class="bg-gray-300 btn-load_more" @click="loadMore">Load More</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Project',
    data() {
        return {
            search: this.$route.query.search !== undefined ? this.$route.query.search : '',
            length: 5
        }
    },
    components: {
    },
    computed: {
        ...mapGetters({
            datas: 'search/getDatas',
        }),
        companiesLoaded() {
            return this.datas.slice(0, this.length);
        },
    },
    created()  {
        this.searchData()
    },
    methods: {
        async searchData() {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            params.append('term',this.search)
            await this.$store.dispatch('search/setSearch',params.toString())
        },
        loadMore() {
            if (this.length > this.datas.length) return;
            this.length = this.length + 3;
        },
        handleShowPopup() {
            const searchPopup = document.querySelector("#search-popup")

            if (!searchPopup.classList.contains('show-popup')) {
                searchPopup.classList.toggle('show-popup')
                document.body.style.position = 'fixed'
                document.body.style.top = '0px'
                document.body.style.height = '100vw'
            }
            // else {
            //     document.body.style.position = 'initial'
            //     document.body.style.top = null
            //     document.body.style.height = null
            //     document.body.style.width = 'auto'
            // }
        },
        handleClosePopup() {
            const searchPopup = document.querySelector("#search-popup")
            if (searchPopup.classList.contains('show-popup')) {
                searchPopup.classList.remove('show-popup')
                document.body.style.position = 'initial'
                document.body.style.top = null
                document.body.style.height = null
                document.body.style.width = 'auto'
            }
        },
        async handleSearch() {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            params.append('term',this.search)
            await this.$store.dispatch('search/setSearch',params.toString())
            this.$router.push(`/projects?search=${this.search}`)
            const searchPopup = document.querySelector("#search-popup")
            if (searchPopup.classList.contains('show-popup')) {
                searchPopup.classList.remove('show-popup')
                document.body.style.position = 'initial'
                document.body.style.top = null
                document.body.style.height = null
                document.body.style.width = 'auto'
            }
        }
    }
}
</script>

<style scoped>
    .container-project {
        position:relative;
        transition: all .3s;
    }

    .navbar-container {
        position: relative;
        width: 100%;
        height: 60px;
    }
    .navbar-box{
        position: absolute;
        top: 0;
        left: 0;
         width: 100%;
         height: 50px;
         box-shadow: 0 0 6px 0 rgba(148, 77, 230, 0.75);
         padding: 18px 15px 22.2px;
         background-image: linear-gradient(100deg, #712bda, #a45deb 100%);
    }

    .navbar-curve{
        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(100deg, #712bda, #a45deb 100%);
        width: 100%;
        height: 60px;
        border-bottom-left-radius:80% 40%;
        border-bottom-right-radius:80% 40%;
    }

    .navbar-list{
        z-index: 1024;
        position: absolute;
        height: 60px;
        top: 0;
        left: 0;
        width: 100%;
        padding: 18px 15px 22.2px;
    }

    .navbar-list {
        display:flex;
        align-items: center;
        justify-content: space-between;
    }

    .navbar-title{
        width: 72.2px;
    }

    .navbar-icon_menu i, .navbar-icon_search i {
        color: #FFF;
        font-size: 20px;
        cursor: pointer;
    }

    .content-container {
        margin-top: 30px;
        padding: 0 20px;
    }

    .title-result {
        color: #334155;
    }

    .value-result {
        color: #7b34dd;
    }

    .list-result_wrapper{
        margin-top: 1rem;
    }

    .result-item {
        width: 100%;
        height: 123px;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
        background-color: #fff;
        padding: .75rem;
        border-radius: 10px;
    }

    .result-item:not(:last-child){ 
        margin-bottom: .5rem;
    }

    .image-wrapper {
        width: 138px;
        height: 100px;
    }

    .image-cover img{
        border-radius:10px;
    }

    .item-info {
        margin-left: .75rem;
        position: relative;
        width: 100%;
    }

    .artist-name {
        font-size: 12px;
        font-weight: 500;
        color: #334155;
    }
    
    .collection-name {
        font-size: 14px;
        font-weight: bold;
    }

    .bottom-info {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content:space-between;
    }

    .genre-name {
        width: fit-content;
        font-size: 12px;
        background-color: #10b981;
        padding: 0.25rem 1rem;
        border-radius: 10px;
        color: #FFF;
    }

    .price {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #f5b014;
        font-weight: bold;
    }

    .load-more_wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-load_more {
        width: 120px;
        height: 34px;
        color: #64748b;
        font-size: 12px;
        font-weight: 500;
        border-radius: 17px;
    }

    .search-popup_wrapper {
        position: absolute;
        top: -100%;
        left: 0;
        height: 100%;
        /* background-color: #000; */
        width: 100%;
        z-index: 1024;
        background-color: rgba(28, 28, 45, 0.9);
        transition: all .3s;
    }

    .show-popup {
        top: 0;
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
         background-image: linear-gradient(98deg, #712bda, #a45deb);
    }

    .body-search_popup {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 0 20px;
        position: relative;
    }

    .title-search_popup {
        font-size: 20px;
        font-weight: bold;
        color: #FFF;
        margin-bottom: 2rem;
    }

    .icon-close{
        position: absolute;
        top: 0;
        right: 10px;
        color: #FFF;
        font-size: 30px;
        cursor: pointer;
    }
</style>