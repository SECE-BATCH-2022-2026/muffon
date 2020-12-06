import React from 'react'
import axios from 'axios'
import ErrorMessage from 'global/ErrorMessage'
import { Segment, Header } from 'semantic-ui-react'
import Paginated from 'global/Paginated'
import List from './tracks/List'

export default class Tracks extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isLoading: false }
  }

  componentDidMount () {
    this._isMounted = true
    this.request = axios.CancelToken.source()

    this.getData()
  }

  componentWillUnmount () {
    this._isMounted = false
    this.request.cancel()
  }

  getData = page => {
    const switchLoader = isLoading => {
      this._isMounted && this.setState({ ...{ isLoading } })
    }

    switchLoader(true)

    const tagNameEncoded = encodeURIComponent(this.props.tagName)
    const url = `/lastfm/tags/${tagNameEncoded}/tracks`
    const params = { ...{ page } }
    const cancelToken = this.request.token
    const extra = { ...{ params, cancelToken } }

    const handleSuccess = resp => {
      const { tag } = resp.data

      const tracks = tag.tracks
      const responseTotalPages = tag.total_pages
      const responseCurrentPage = tag.page
      const error = null

      this.setState({
        ...{ tracks, responseTotalPages, responseCurrentPage, error }
      })
    }

    const handleError = error => {
      const tracks = null

      !axios.isCancel(error) && this.setState({ ...{ tracks, error } })
    }

    const handleFinish = () => switchLoader(false)

    axios
      .get(url, extra)
      .then(handleSuccess)
      .catch(handleError)
      .then(handleFinish)
  }

  tracksData () {
    const {
      tracks,
      responseTotalPages,
      responseCurrentPage,
      isLoading
    } = this.state
    const { scrollToTop } = this.props
    const { getData } = this

    const clientPageLimit = 10
    const responsePageLimit = 50
    const collection = tracks
    const collectionName = 'tracks'
    const collectionList = <List />

    const tracksDataProps = {
      responseTotalPages,
      responseCurrentPage,
      isLoading,
      scrollToTop,
      getData,
      clientPageLimit,
      responsePageLimit,
      collection,
      collectionName,
      collectionList
    }

    return <Paginated {...tracksDataProps} />
  }

  render () {
    const { tracks, error, isLoading } = this.state

    const headerData = <Header as="h3" content="Top tracks" />

    const tracksData = tracks && this.tracksData()

    const errorData = error && <ErrorMessage {...{ error }} />

    const contentData = tracksData || errorData

    return (
      <Segment.Group className="tagsPageSegmentWrap">
        <Segment content={headerData} />
        <Segment
          className="tagsPageSegment"
          content={contentData}
          loading={isLoading}
        />
      </Segment.Group>
    )
  }
}
