import { api } from '@/convex/_generated/api';
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

    try {

         // Get Convex Client and fetch chat and messages
    const convex = getConvexClient()

    // Get messages
    const initialMessages = await convex.query(api.messages.list, {chatId})



  return (
    <div>
        <ChatInterface chatId={chatId} initialMessages={initialMessages} />
    </div>
  )

    } catch (error) {
        console.log("Error loading chat:", error)
        redirect("/dashboard")
    }

   
}

export default ChatPage