export const singer = state => state.singer

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
