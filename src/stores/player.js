import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
      playing: null,
      currentTrackId: null,
      currentVariantId: null,
      isWithBitrate: null,
      isWithDiscordRichPresence: null,
      isWithScrobbling: null,
      isWithScrobbleNotifications: null,
      scrobblePercent: null,
      variants: null,
      isWithAlbum: null,
      audioSources: null,
      isWithEqualizer: null
    }
  },
  getters: {
    variantsCount (
      state
    ) {
      return state.variants.length
    }
  },
  actions: {
    setVariants (
      value
    ) {
      this.variants = value
    },
    setPlaying (
      value
    ) {
      this.playing = value
    },
    setCurrentTrackId (
      value
    ) {
      this.currentTrackId = value
    },
    setCurrentVariantId (
      value
    ) {
      this.currentVariantId = value
    },
    setIsWithScrobbling (
      value
    ) {
      this.isWithScrobbling = value
    },
    setIsWithScrobbleNotifications (
      value
    ) {
      this.isWithScrobbleNotifications = value
    },
    setScrobblePercent (
      value
    ) {
      this.scrobblePercent = value
    },
    setIsWithBitrate (
      value
    ) {
      this.isWithBitrate = value
    },
    setIsWithAlbum (
      value
    ) {
      this.isWithAlbum = value
    },
    setAudioSources (
      value
    ) {
      this.audioSources = value
    },
    setIsWithDiscordRichPresence (
      value
    ) {
      this.isWithDiscordRichPresence = value
    },
    setIsWithEqualizer (
      value
    ) {
      this.isWithEqualizer = value
    }
  }
}

export default defineStore(
  'player',
  data
)
