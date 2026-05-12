import React from 'react'
import Contactus from './components/Contactus'
import Map from './components/Map'
import Inquiry from './components/Inquiry'
import { getAllSiteInfo } from '@/src/services/siteInfoService'

const ContactPage = async () => {
    const siteInfo = await getAllSiteInfo();


    return (
        <>
            <Contactus />
            <Map />
            <Inquiry siteInfo={siteInfo} />
        </>
    )
}

export default ContactPage
