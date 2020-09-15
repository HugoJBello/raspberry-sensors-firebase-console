<template>
  <v-card>
  <v-carousel class="ma-4">
    <v-carousel-item
        v-for="(image,i) in images"
        :key="i"
        :src="image.url"
        reverse-transition="fade-transition"
        transition="fade-transition"
    >
      <span class="headline white--text" v-text="image.filename"></span>
    </v-carousel-item>
  </v-carousel>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {devicesCollection, imagesCollection, storage} from '../firebase'
import {Image} from "../../models/Image";
import {Device} from "../../models/Device";

@Component({
  components: {
  },
})
export default class Console extends Vue {
  public images: Image[] = [] as Image[]
  public devices: Device[] = [] as Device[]

  public async getImages() {
    const result = await imagesCollection.limit(10).orderBy("date","desc").get()
    const extractedImages = [] as Image[]
    for (const doc of result.docs) {
      const image: any = doc.data()
      image.date = image.date.toDate()
      const pathReference = storage.ref(image.filename);
      const url = await pathReference.getDownloadURL()
      image.url = url
      extractedImages.push(image as Image)
    }
    this.images = extractedImages
    console.log(this.images)

  }

  public async getDevices() {
    const result = await devicesCollection.limit(10).orderBy("date","desc").get()
    const extractedDevices = [] as Device[]
    for (const doc of result.docs) {
      const device: any = doc.data()
      device.date = device.date.toDate()
      extractedDevices.push(device as Device)
    }
    this.devices = extractedDevices
    console.log(this.devices)

  }
  mounted() {
    this.getImages()
    this.getDevices()
  }

}
</script>
