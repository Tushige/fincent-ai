'use client'
import { createFreeSubscription } from '@/actions/stripe'
import { GradientText } from '@/components/app-gradient-text'
import { Button } from '@/components/ui/button'
import Confetti, { ConfettiRef } from '@/components/ui/confetti'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useRef } from 'react'

const MembershipChangePlan = ({ }) => {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const confettiRef = useRef<ConfettiRef>(null)

  const addFreeTier = async () => {
    try {
      const subscription = await createFreeSubscription('cus_Qwnug52pnmlUpS')
    } catch (err) {
      console.error(err)
    }
  }
  // TODO - upon successful purchase, we need to save stripe client id in our DB so that later the same customer can change their plans
  // do we save this client id from within a webhook?
  if (success === 'true') {
    return (
      <div className="w-full h-[100vh] relative flex justify-center">
        <GradientText className="text-3xl sm:text-4xl lg:text-6xl uppercase font-bold mt-[30px] md:mt-[100px] lg:mt-[200px]">
          Congratulations!
        </GradientText>
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-[0] size-full"
          onMouseEnter={() => {
           confettiRef.current?.fire({}) 
          }}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Button className="text-text bg-surface" onClick={addFreeTier}>
          Add Free Tier
        </Button>
      </div>
    )
  }
}

export default MembershipChangePlan