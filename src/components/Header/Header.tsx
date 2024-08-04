import { css } from '@emotion/css'
import { Language } from '@mui/icons-material'
import { IconButton, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

const header = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '1rem',
})

function Header() {
  const theme = useTheme()
  const { t, i18n } = useTranslation()
  const changeLanguage = () => {
    const langOptions = Object.keys(i18n.store.data)
    const nextLanguage =
      langOptions[(langOptions.indexOf(i18n.language) + 1) % langOptions.length]
    i18n.changeLanguage(nextLanguage)
  }

  return (
    <div className={header} style={{ color: theme.palette.primary.main }}>
      <h2>{t('header')}</h2>
      <IconButton onClick={changeLanguage}>
        <Language />
      </IconButton>
    </div>
  )
}

export default Header
