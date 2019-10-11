<template>
  <div class="container mt-4">
    <h2 class="text-center text-secondary pb-2">台北市營運餐廳</h2>
    <div class="map-container border rounded">
      <ul class="nav justify-content-center border-bottom">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :class="{active: $route.query.district === 'xinyi' || !$route.query.district}"
            :to="{name: 'restaurants', query: {district: 'xinyi'}}"
          >信義區</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :class="{active: $route.query.district === 'daan'}"
            :to="{name: 'restaurants', query: {district: 'daan'}}"
          >大安區</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :class="{active: $route.query.district === 'songshan'}"
            :to="{name: 'restaurants', query: {district: 'songshan'}}"
          >松山區</router-link>
        </li>
      </ul>

      <GMap
        v-if="!isLoading"
        :center="{lat, lng}"
        :restaurants="restaurants"
        :streetViewControl="false"
        :mapTypeControl="false"
        :fullscreenControl="true"
        :zoomControl="true"
      ></GMap>
    </div>
  </div>
</template>

<script>
import xinyiDummyRestaurants from "../dummy_data/xinyi.json";
import daanDummyRestaurants from "../dummy_data/daan.json";
import songshanDummyRestaurants from "../dummy_data/songshan.json";
import GMap from "../components/GMap";

export default {
  name: "Restaurants",
  components: {
    GMap
  },
  data() {
    return {
      lat: 25.0325917,
      lng: 121.5624999,
      restaurants: [],
      isLoading: true
    };
  },
  mounted() {
    const { district } = this.$route.query;
    this.fetchRestaurants(district);
  },
  beforeRouteUpdate(to, from, next) {
    const { district } = to.query;
    this.fetchRestaurants(district);
    next();
  },
  methods: {
    fetchRestaurants(district = "xinyi") {
      let dummyData = {};

      if (district === "daan") {
        dummyData = daanDummyRestaurants;
      } else if (district === "xinyi") {
        dummyData = xinyiDummyRestaurants;
      } else {
        dummyData = songshanDummyRestaurants;
      }

      this.restaurants = dummyData.restaurants;
      this.lat = dummyData.center.lat;
      this.lng = dummyData.center.lng;
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 400px;
}

a.active {
  border-bottom: 3px solid #007bff;
}
</style>
