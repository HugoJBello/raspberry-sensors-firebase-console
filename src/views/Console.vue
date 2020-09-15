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


    imagesCollection
        .onSnapshot(async (ref) => {
          const result = await ref.query.orderBy("date").limit(3).get()
          console.log(result)
        });
  }
  mounted() {
    this.getImages()
  }

}
</script>
