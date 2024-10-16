
import React from 'react';
import UsageMetricsUI from '@/ui/dashboard/usage-metrics-ui';
import { getAuthId } from '@/actions/auth';
import { getAuthUser } from '@/actions/user.action';
import {
  totalEmailCountForUser,
} from '@/actions/campaign.action';
import AppSectionContainer from '@/components/app-section-container';
import GridPattern from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';
import AppSectionHeroContainer from '@/components/app-section-hero-container';

const page = async () => {
  const authId = await getAuthId();
  const user = await getAuthUser(authId!);
  const numEmails = await totalEmailCountForUser(user.id);
  const metrics = [
    {
      label: 'Domains',
      value: user.domains.length,
      max: user.billing.plan.domainLimit,
    },
    {
      label: 'Emails',
      value: numEmails,
      max: user.billing.plan.emailLimit,
    },
  ];
  return (
    <div className='w-full'>
      <AppSectionHeroContainer className="relative bg-background-secondary">
        <h1 className='text-4xl text-text-foreground font-bold'>Usage</h1>
        <p className='text-secondary mt-8 text-sm'>
          This section provides insights into your usage.
        </p>
      </AppSectionHeroContainer>
      <AppSectionContainer>
        <div className='mt-8'>
          <UsageMetricsUI metrics={metrics} />
        </div>
      </AppSectionContainer>
    </div>
  );
};

export default page;
