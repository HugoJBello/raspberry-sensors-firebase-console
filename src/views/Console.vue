<template>
  <div>
    <v-container fluid>
      <!--
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
              :items="devices.map((device) => device.device_id)"
              label="Device"
              v-model="deviceSelected"
              @input='getImages'
          ></v-select>
        </v-col>
      </v-row>
      -->
      <v-row no-gutters>
        <v-col
            v-for="(device) in devices"
            :key="device.device_id"
            cols="12"
            sm="4">
          <v-card class="ma-4" v-if="device.device_id">
            <div>{{device.device_id }}</div>
            <v-carousel v-if="images[device.device_id]">
              <v-carousel-item
                  v-for="(image) in images[device.device_id]"
                  :key="image.filename"
                  :src="image.url"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
              >
                <span class="headline white--text" v-text="image.filename"></span>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
      </v-row>


    </v-container>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {devicesCollection, imagesCollection, storage} from '../firebase'
import {Image} from "../../models/Image";
import {Device} from "../../models/Device";
import QuerySnapshot from "firebase"
import DocumentData from "firebase"

@Component({
  components: {},
})
export default class Console extends Vue {
  public images: any = {}
  public devices: Device[] = [] as Device[]
  public deviceSelected = ""

  public async getImages() {
    for (const device of this.devices){
      await this.getImagesInDevice(device.device_id)
    }
    this.$forceUpdate();

  }

  public async getImagesInDevice(deviceId: string) {
    const result  = await imagesCollection.limit(10).where("device_id", "==", deviceId).orderBy("date", "desc").get()

    const extractedImages = [] as Image[]
    for (const doc of result.docs) {
      const image: any = doc.data()
      image.date = image.date.toDate()
      const pathReference = storage.ref(image.filename);
      const url = await pathReference.getDownloadURL()
      image.url = url
      extractedImages.push(image as Image)
    }
    this.images[deviceId] = extractedImages
    console.log(this.images)
  }

  public async getDevices() {
    const result = await devicesCollection.limit(10).orderBy("date", "desc").get()
    const extractedDevices = [] as Device[]
    for (const doc of result.docs) {
      const device: any = doc.data()
      device.date = device.date.toDate()
      extractedDevices.push(device as Device)
    }
    this.devices = extractedDevices
    if (this.devices[0]) this.deviceSelected = this.devices[0].device_id
    console.log(this.devices)

  }

  async created() {
    await this.getDevices()
    await this.getImages()
  }

}
</script>
