<template>
  <div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { imagesCollection, storage} from '../firebase'
import {Image} from "../../models/Image";

@Component({
  components: {
  },
})
export default class Console extends Vue {
  public images: Image[] = [] as Image[]

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
  mounted() {
    this.getImages()
  }

}
</script>
