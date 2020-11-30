import { Component } from 'react'
import { InfoBannerPreview, InfoBannerForm } from '../../components/info-banner'
import { Section } from '../../components/layout'
import Swal from 'sweetalert2'

class AdminHackInfoBanners extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      banners: [],
    }
  }

  componentDidMount() {
    this.getInfoBanners()
  }

  getInfoBanners = async () => {
    this.setState({ loading: true })
    let banners = []
    let snap = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('banners')
      .get()

    snap.forEach((doc, index) => {
      let banner = doc.data()
      banner.bannerId = doc.id
      banners.push(banner)
    })

    this.setState({
      banners: banners,
      loading: false,
    })
  }

  updateInfoBannerActive = async (index, bannerId, active) => {
    if (this.state.loading) {
      return false
    }

    this.setState({ loading: true })

    let banners = this.state.banners
    banners[index].active = !active

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('banners')
      .doc(bannerId)
      .set(
        {
          active: !active,
        },
        { merge: true }
      )

    this.setState({
      banners: banners,
      loading: false,
    })
  }

  deleteInfoBanner = async (index, bannerId) => {
    if (this.state.loading) {
      return false
    }

    this.setState({ loading: true })

    let confirm = await Swal.fire({
      title: 'Are you sure?',
      html: `
        <p>Confirm you want to delete this Banner.</p>
        <code>${bannerId}</code>`,
      icon: 'question',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    })

    if (confirm.value) {
      let banners = this.state.banners
      await window.firebase
        .firestore()
        .collection('hacks')
        .doc(this.props.hackId)
        .collection('banners')
        .doc(bannerId)
        .delete()

      banners = [...banners.slice(0, index), ...banners.slice(index + 1, banners.length)]
      this.setState({
        banners: banners,
        loading: false,
      })
    } else {
      this.setState({ loading: false })
    }
  }

  createInfoBanner = async (bannerData) => {
    if (this.state.loading) {
      return false
    }

    let doc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('banners')
      .add(bannerData)

    console.log(doc)

    bannerData.bannerId = doc.id
    let banners = this.state.banners
    banners.unshift(bannerData)
    this.setState({ banners: banners })
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">{`${this.props.hackName} Info Banners`}</h2>
        </Section>

        <Section sectionClass="mb-3">
          <InfoBannerForm onCreate={this.createInfoBanner} disabled={this.state.loading} />
        </Section>

        <Section>
          <div>
            {this.state.banners.map((item, index) => (
              <InfoBannerPreview
                key={index}
                bannerId={item.bannerId}
                content={item.content}
                starts_at={item.starts_at}
                ends_at={item.ends_at}
                color={item.color}
                bg_color={item.bg_color}
                active={item.active}
                onToggleActive={(bannerId, active) => {
                  this.updateInfoBannerActive(index, bannerId, active)
                }}
                onDeleteInfoBanner={(bannerId) => {
                  this.deleteInfoBanner(index, bannerId)
                }}
              />
            ))}
          </div>
        </Section>

        <Section>
          <p>
            <strong>Note:</strong> If more than one banner is active at one time, only the one with the earliest
            starting date will be displayed.
          </p>

          <p>
            List of available emojis list:{' '}
            <a href="https://github.com/showdownjs/showdown/wiki/Emojis" className="text-underline" target="_blank">
              showdownjs/showdown/wiki/Emojis
            </a>
          </p>
        </Section>
      </>
    )
  }
}

export default AdminHackInfoBanners
