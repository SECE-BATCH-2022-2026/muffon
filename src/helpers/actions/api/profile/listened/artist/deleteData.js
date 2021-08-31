import axios from 'axios'
import store from '*/store'

export default function ({ artistId }) {
  this.isLoading = true
  this.error = null

  const profileId =
    store.state.profile.info.id
  const url = `profiles/${profileId}` +
    `/listened/artists/${artistId}`

  const token =
    store.state.profile.token
  const params = { token }

  const handleSuccess = () => {
    this.listenedId = null
  }

  const handleError = error => {
    this.error = error
  }

  const handleFinish = () => {
    this.isLoading = false
  }

  axios
    .delete(url, { params })
    .then(handleSuccess)
    .catch(handleError)
    .finally(handleFinish)
}
