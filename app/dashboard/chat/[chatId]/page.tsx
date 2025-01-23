import { Id } from '@/convex/_generated/dataModel';
import { getConvexClient } from '@/lib/convex';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

interface ChatPageProps {
    params: {
      chatId: Id<"chats">;
    };
  }
  

async function ChatPage ({ params }: ChatPageProps)  {
    const {chatId} = await params

    // Get user authentication

    const {userId} = await auth()

    if (!userId) {
        redirect("/")
    }

    // Get Convex Client and fetch chat and messages
    const convex = getConvexClient()



  return (
    <div>ChatPage : {chatId}</div>
  )
}

export default ChatPage