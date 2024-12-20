import { getAllDomains } from '@/actions/domain.action';
import ConversationUI from '@/ui/conversations/conversation-ui';
import React from 'react';

const ConversationsPage = async () => {
  const domains = await getAllDomains();
  return (
    <div className='container h-full pr-4 lg:pr-0 pl-4 md:pl-8'>
      <ConversationUI domains={domains} />
    </div>
  );
};

export default ConversationsPage;
