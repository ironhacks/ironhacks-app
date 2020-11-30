import { InfoBanner } from './info-banner'
import { InputCheckbox } from '../../components/input'
import { fire2Date } from '../../util/date-utils'
import { Link } from 'react-router-dom'

const InfoBannerPreview = ({
  bannerId,
  content,
  starts_at,
  ends_at,
  color,
  bg_color,
  active,
  onToggleActive,
  onEditInfoBanner,
  onDeleteInfoBanner,
}) => {
  let timeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour12: true,
    timeZoneName: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }

  const toggleActive = async () => {
    if (onToggleActive) {
      onToggleActive(bannerId, active)
    }
  }

  const deleteInfoBanner = () => {
    if (onDeleteInfoBanner) {
      onDeleteInfoBanner(bannerId)
    }
  }

  const editInfoBanner = () => {
    if (onEditInfoBanner) {
      onEditInfoBanner()
    }
  }

  if (starts_at.seconds) {
    starts_at = fire2Date(starts_at)
  }

  if (ends_at.seconds) {
    ends_at = fire2Date(ends_at)
  }

  return (
    <div className="my-4">
      <div className="mt-4 mb-2 flex flex-align-center">
        <div className="btn badge bg-secondary cl-white mr-1" onClick={editInfoBanner}>
          <Link to={`banners/${bannerId}/edit`}>Edit</Link>
        </div>

        <div className="mr-2 flex-1">
          <InfoBanner content={content} color={color} bg_color={bg_color} />
        </div>
        <div className="flex-0">
          <InputCheckbox
            name="active"
            label="Active"
            containerClass="my-0 mr-1 badge badge-dark flex flex-align-center"
            labelClass="mr-2"
            inputClass=""
            isChecked={active}
            onInputChange={toggleActive}
          />
        </div>
        <div className="flex-0">
          <div className="btn badge cl-red fs-1" onClick={deleteInfoBanner}>
            X
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex flex-align-center">
          <span className="flex-1">Starts: </span>
          <span className="flex-9 fs-m1 font-bold ml-3">{starts_at.toLocaleString('en-us', timeFormatOptions)}</span>
        </div>
        <div className="flex flex-align-center">
          <span className="flex-1">Ends: </span>
          <span className="flex-9 fs-m1 font-bold ml-3">{ends_at.toLocaleString('en-us', timeFormatOptions)}</span>
        </div>
      </div>
    </div>
  )
}

export { InfoBannerPreview }
