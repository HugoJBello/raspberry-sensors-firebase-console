<template>
  <div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { imagesCollection } from '../firebase'

@Component({
  components: {
  },
})
export default class Console extends Vue {
  public async getImages() {
    console.log("bla")


    const result = await imagesCollection.where("date",">", 0).orderBy("date").limit(3).get()
    console.log(result)

  }
  mounted() {
    this.getImages()
  }

}
</script>
