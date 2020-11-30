import { Component } from 'react'
import { InfoBannerEditForm } from '../../components/info-banner'
import { Section } from '../../components/layout'
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'

class AdminHackInfoBannersEdit extends Component {
  constructor(props) {
    super(props)

    this.bannerId = this.props.match.params.bannerId

    this.state = {
      loading: false,
    }
  }

  cancelEditInfoBanner = () => {
    this.props.history.goBack()
  }

  updateInfoBanner = async (bannerData) => {
    if (this.state.loading) {
      return false
    }

    this.setState({ loading: true })

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('banners')
      .doc(this.bannerId)
      .set(bannerData)

    Swal.fire({
      icon: 'success',
      title: 'Banner saved',
      text: 'Banner was saved sucessfully',
    }).then(() => {
      this.props.history.goBack()
    })

    this.setState({ loading: false })
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">{`${this.props.hackName} Edit Info Banner`}</h2>
        </Section>

        <Section sectionClass="mb-3">
          <InfoBannerEditForm
            hackId={this.props.hackId}
            bannerId={this.bannerId}
            onCancel={this.cancelEditInfoBanner}
            onUpdate={this.updateInfoBanner}
            disabled={this.state.loading}
          />
        </Section>
      </>
    )
  }
}

export default withRouter(AdminHackInfoBannersEdit)
