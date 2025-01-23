import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();
    // if (!identity) {
    //   throw new Error("Not authenticated");
    // }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      .order("asc")
      .collect();

    

    return messages;
  },
});


export const send = mutation ({
    args: {
        chatId: v.id("chats"),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        // Save the user message with preserved newlines
        const messageId = await ctx.db.insert("messages", {
            chatId: args.chatId,
            content: args.content.replace(/\n/g, "\\n"),
            role: "user",
            createdAt: Date.now(),
        });

        return messageId
    },
})



export const store = mutation ({
    args: {
        chatId: v.id("chats"),
        content: v.string(),
        role: v.union(v.literal("user"), v.literal("assistant"))
    },

    handler : async (ctx, args) => {
        // Store message with preserved newlines amd HTML
        const messageId = await ctx.db.insert("messages", {
            chatId: args.chatId,
            content: args.content.replace(/\\/g, "\\\\"),
            createdAt: Date.now(),
            role: args.role
        });

        return messageId

    }
})