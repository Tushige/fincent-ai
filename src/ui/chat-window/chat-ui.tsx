'use client'
import {motion} from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import ChatForm from './chat-form'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { XIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { CHATBOT_TOKEN_DURATION } from '@/app/constants'
import useSWR, {SWRConfig} from 'swr'
import Loader from '@/components/loader'

function fetcher(...args) {
  return fetch(...args).then(res => res.json())
}

const ChatUI = ({
  domain,
  bot,
}) => {
  const {toast} = useToast()
  const [open, setOpen] = useState(false)
  const [conversationId, setConversationId] = useState(null)
  const [token, setToken] = useState(null)
  const {data, isLoading, error, isValidating } = useSWR(open ? `/api/session?cbkbotId=${bot.id}&domainBotId=${domain.chatBot.id}` : null, fetcher, { 
    dedupingInterval: CHATBOT_TOKEN_DURATION * 100,
    revalidateOnFocus: false,
  })
  useEffect(() => {
    if (data) {
      setConversationId(data.conversationId)
      setToken(data.token)
    }
    if (error) {
      toast({
        title: <span className="text-error">Error</span>,
        description: 'Failed to connect to Chat'
      })
    }
  }, [data, error])
  const onChatButtonClick = async () => {
    setOpen(true)
  }
  return (
    <>
      <div className="fixed bottom-[20px] right-[50px] z-50">
        <motion.button
          onClick={() => onChatButtonClick()}
          className="flex justify-center items-center rounded-full p-4 bg-accent text-text size-[60px]"
          whileHover={{
            scale: 1.1,
            transition: {duration: 0.2}
          }}
          initial={{y: 200}}
          whileTap={{scale: 0.8}}
          animate={(open && !isLoading) ? {y: 200} : {y: 0}}
        >
          {
            isLoading ? (
              <Loader className="size-4 bg-text-foreground"/>
            ) : (
              <ChatBubbleBottomCenterTextIcon className="size-12 text-text-foreground"/>
            )
          }
        </motion.button>
      </div>
      <div className="fixed bottom-[20px] right-[50px] z-51">
        <motion.div
          animate={ (open && data) ? {y: 0} : {y: 1000}}
          className="relative h-[600px] w-[400px] border bg-background border-zinc-200 rounded-xl shadow-md "
        >
          <div className="flex flex-row gap-2 relative items-center mb-4">
            <div className="w-[80px] h-[80px] rounded-full flex justify-center items-center bg-background">
              <Image
                src="/images/plus.png"
                width={36}
                height={36}
                alt="chatbot avatar"
              />
            </div>
            <p>
              {bot.name}
            </p>
            <XIcon
              className="absolute right-[10px] top-[10px] size-6 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <Separator />
          {
            (token && conversationId) ? (
              <ChatForm
                bot={bot}
                botId={domain.chatBot.id}
                domainId={domain.id}
                conversationId={conversationId}
                token={token}
              />
            ) : (
              <div>loading</div>
            )
          }
        </motion.div>
      </div>
    </>
  )
}

export default ChatUI