<template>
    <div class="video-wrap" style="max-width:650px">
        <youtube :video-id="videoId" ref="youtube" @playing="playing" resize fitParent></youtube>
    </div>
</template>

<script>
export default {
    props: {
       identifier: { 
            type: String,
            default: '6WRlMvxPlCA' 
        }
    },
    data() {
        return {
            videoId: this.identifier,
            videoWidth: [
                {size: 'sm', width: 289},
                {size: 'md', width: 289},
                {size: 'xs', width: 289}
            ]
        }
    },
    methods: {
        playVideo() {
            this.player.playVideo()
        },
        playing() {
            console.log('we are watching!!!')
        }
    },
    computed: {
        player () {
            return this.$refs.youtube.player
        }
    }
}
</script>