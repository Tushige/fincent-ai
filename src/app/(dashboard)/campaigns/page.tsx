import AppPageTitle from '@/components/app-page-title'
import Link from 'next/link'
import React from 'react'
import { getAllDomains } from '@/actions/domain.action'
import { ArrowRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const CampaignsPage = async () => {
  const domains = await getAllDomains()
  return (
    <div className="flex flex-col">
      <AppPageTitle title="Campaigns" description="Organize your email campaigns and track them effectively here"/>
      {
        !domains || domains.length < 1 ? (
          <div className="lg:mt-[200px] text-secondary text-medium text-center text-secondary">
            Create a Domain first and then come back
          </div>
        ) : (
          <>
            <h3 className="text-secondary">
              Select a domain too see campaigns
            </h3>
            <Separator className="border-border mt-4 mb-8"/>
            <ul className="flex flex-col gap-4">
              {
                domains.map(domain => {
                  return (
                    <Link
                      key={domain.key}
                      href={`/campaigns/domains/${domain.id}`}
                      className="flex flex-row gap-2 items-center"
                    >
                      <span className="underline">{domain.name}</span>
                      <ArrowRight className="size-4"/>
                    </Link>
                  )
                })
              }
            </ul>
          </>
        )
      }
    </div>
  )
}
export default CampaignsPage