'use client';
import { motion } from 'framer-motion';
import ChatForm from './chat-form';
import { useEffect, useState } from 'react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';
import { CHATBOT_TOKEN_DURATION } from '@/app/constants';
import useSWR from 'swr';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';

function fetcher(...args) {
  return fetch(...args).then((res) => res.json());
}

const ChatUI = ({ domain, cbkBot, className = '' }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [cbkConversationId, setCbkConversationId] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [token, setToken] = useState(null);
  const { data, isLoading, error } = useSWR(
    open
      ? `/api/session?cbkbotId=${cbkBot.id}&domainBotId=${domain.chatBot.id}&domainId=${domain.id}`
      : null,
    fetcher,
    {
      dedupingInterval: CHATBOT_TOKEN_DURATION * 100,
      revalidateOnFocus: false,
    }
  )

  useEffect(() => {
    if (data) {
      setCbkConversationId(data.cbk_conversation_id);
      setConversation(data.conversation);
      setToken(data.token);
    }
    if (error) {
      toast({
        title: <span className='text-error'>Error</span>,
        description: 'Chat connection failed',
      });
    }
  }, [data, error]);

  const openChatWindow = async () => {
    setOpen(true);
  };

  return (
    <>
      <div className={cn('fixed bottom-0 right-0 z-50', className)}>
        <motion.button
          onClick={() => openChatWindow()}
          className='flex size-[60px] items-center justify-center rounded-full bg-accent p-4 text-text'
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          initial={{ y: 200 }}
          whileTap={{ scale: 0.8 }}
          animate={open && !isLoading ? { y: 200 } : { y: 0 }}
        >
          {isLoading ? (
            <Loader className='size-4 bg-text-foreground' />
          ) : (
            <ChatBubbleBottomCenterTextIcon className='size-12 text-text-foreground' />
          )}
        </motion.button>
      </div>
      <div className='z-51 fixed bottom-0 right-0 text-text'>
        <motion.div
          initial={{y: 1000}}
          animate={open && !isLoading ? { y: 0 } : { y: 1000 }}
          className='relative h-[600px] w-[400px] rounded-xl border border-zinc-200 bg-background shadow-md'
        >
          {token && cbkConversationId ? (
            <ChatForm
              setOpen={setOpen} 
              cbkBot={cbkBot}
              botIcon={domain.icon}
              domainId={domain.id}
              cbkConversationId={cbkConversationId}
              conversation={conversation}
              token={token}
              welcomeMessage={domain.chatBot.welcomeMessage}
            />
          ) : (
            <div>loading</div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default ChatUI;
