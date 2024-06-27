<!-- <template>
  <div>
    <video ref="videoPlayer" class="video-js" style="width: 900px;; height: 400px;"></video>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch  } from "vue"
import videojs from "video.js"
import "video.js/dist/video-js.css"

const props = defineProps(['url', 'img'])

const videoPlayer = ref(null)

const myPlayer = ref(null)

watch(
  () => props.url,
  (url) => {
    if (url) {
      myPlayer.value = videojs(videoPlayer.value, {
        poster: props.img || "//vjs.zencdn.net/v/oceans.png",
        controls: true,
        sources: [
          {
            src: props.url || "//vjs.zencdn.net/v/oceans.mp4",
            type: 'video/mp4',
          }
        ],
        controlBar: {
          remainingTimeDisplay: {
            displayNegative: false
          }
        },
        playbackRates: [0.5, 1, 1.5, 2]
      }, () => {
        myPlayer.value.log("play.....")
      })
    }
  }
)

onUnmounted(() => {
  if (myPlayer.value) {
    myPlayer.value.dispose()
  }
})

</script> -->

<template>
  <iframe
     id="closeBox"
    style="width: 960px;height: 450px;"
    :src="props.url"
    frameborder="0">
  </iframe>
</template>

<script setup lang="ts">
const props = defineProps(['url'])
import { watch} from "vue"


console.log('props', props);
watch(props.url,
  ()=>{
    console.log('props.url', props.url);
    
  }
)

</script>

<style scoped>
 /* @media screen and (max-aspect-ratio: 16/9){
        #closeBox {
            width: 100vw;
            height: calc(100vw * 9 / 16);
        }
    }
    @media screen and (min-aspect-ratio: 16/9){
        #closeBox {
            width: calc(100vh * 16 / 9);
            height: 100vh;
        }
    } */
</style>