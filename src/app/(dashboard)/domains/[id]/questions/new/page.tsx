import { getChatbotByDomainId } from '@/actions/chatbot.action'
import { getBotQuestionsByDomainId } from '@/actions/questions.action'
import { Separator } from '@/components/ui/separator'
import BotQuestionForm from '@/ui/domain/bot-questions/bot-question-form'
import BotQuestionList from '@/ui/domain/bot-questions/bot-question-list'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

const NewQuestionPage = async ({
  params
}) => {
  const questions = await getBotQuestionsByDomainId(params.id)
  const bot = await getChatbotByDomainId(params.id)
  return (
    <div className="w-full h-full pl-2 md:pl-4">
      <div className="max-w-[42rem] pt-10">
        <Link href={`/domains/${params.id}`} className="flex font-thin mb-4">
          <ArrowLongLeftIcon className="size-6"/>
          Go Back to Settings
        </Link>
        <h1 className="font-bold text-2xl mb-2">
          Bot Training Questions
        </h1>
        <p className="text-sm mb-8">Tailor your bot to ask the questions you want to ask from your customers</p>
        <BotQuestionForm domainId={params.id} chatBotKitId={bot.chatBotKitId} />
        <Separator className="my-4"/>
        <div>
          <h2 className="mb-4 text-text-foreground font-bold">
            Your Questions
          </h2>
          <BotQuestionList questions={questions} chatBotKitId={bot.chatBotKitId} domainId={params.id}/>
        </div>
      </div>
    </div>
  )
}

export default NewQuestionPage