import { getDomain } from '@/actions/domain.action';
import ChatLiveWindow from '@/ui/chat-live-window'
import React from 'react'

export default async function ChatBotWindow({params}) {
  const domainId = params.id;
  const domain = await getDomain(domainId);
  return (
    <ChatLiveWindow domain={domain}/>
  )
}
