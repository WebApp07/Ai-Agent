import {mutation} from "./_generated/server"
import {v} from "convex/values"

export const createChat = mutation ({
    args: {
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()
        if(!identity) {
            throw new Error("Not authenticated.")
        }

        const chat = await ctx.db.insert("chats", {
            title: args.title,
            userId: identity.subject,
            createdAt: Date.now()
        });
        return chat
    }
})


export const deleteChat = mutation({
    args: {id: v.id("chats")},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const chat = await ctx.db.get(args.id);
        if (!chat || chat.userId !== identity.subject) {
            throw new Error("Unauthorized")
        }
    }
})