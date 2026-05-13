import React from 'react'
import Map from './components/Map'
import Inquiry from './components/Inquiry'
import { getAllSiteInfo } from '@/src/services/siteInfoService'
import SectionHeader from '@/src/shared/components/SectionHeader'

const ContactPage = async () => {
    const siteInfo = await getAllSiteInfo();


    return (
        <>
            <SectionHeader
                title="Contact Us"
                description="Leave us a little info, and we’ll be in touch."
                customObjectVariant="orange-disk"
            />
            <Map />
            <Inquiry siteInfo={siteInfo} />
        </>
    )
}

export default ContactPage
