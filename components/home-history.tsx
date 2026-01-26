"use client";

import { subWeeks } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import useSWRInfinite from "swr/infinite";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Chat } from "@/lib/db/schema";
import { fetcher } from "@/lib/utils";
import { MoreHorizontalIcon, TrashIcon } from "./icons";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type GroupedChats = {
  active: Chat[];
  archived: Chat[];
};

type ChatHistory = {
  chats: Chat[];
  hasMore: boolean;
};

const PAGE_SIZE = 20;

const groupChatsByStatus = (chats: Chat[]): GroupedChats => {
  const oneWeekAgo = subWeeks(new Date(), 1);

  return chats.reduce(
    (groups, chat) => {
      const chatDate = new Date(chat.createdAt);

      if (chatDate > oneWeekAgo) {
        groups.active.push(chat);
      } else {
        groups.archived.push(chat);
      }

      return groups;
    },
    {
      active: [],
      archived: [],
    } as GroupedChats
  );
};

function getChatHistoryPaginationKey(
  pageIndex: number,
  previousPageData: ChatHistory
) {
  if (previousPageData && previousPageData.hasMore === false) {
    return null;
  }

  if (pageIndex === 0) {
    return `/api/history?limit=${PAGE_SIZE}`;
  }

  const firstChatFromPage = previousPageData.chats.at(-1);

  if (!firstChatFromPage) {
    return null;
  }

  return `/api/history?ending_before=${firstChatFromPage.id}&limit=${PAGE_SIZE}`;
}

function ChatHistoryItem({
  chat,
  onDelete,
}: {
  chat: Chat;
  onDelete: (chatId: string) => void;
}) {
  return (
    <div className="group flex items-center justify-between py-1">
      <Link
        className="flex-1 truncate text-[14px] text-foreground hover:underline"
        href={`/chat/${chat.id}`}
      >
        {chat.title}
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="size-6 opacity-0 group-hover:opacity-100"
            size="icon"
            variant="ghost"
          >
            <MoreHorizontalIcon />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:bg-destructive/15 focus:text-destructive"
            onSelect={() => onDelete(chat.id)}
          >
            <TrashIcon />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ChatGroup({
  title,
  chats,
  onDelete,
}: {
  title: string;
  chats: Chat[];
  onDelete: (chatId: string) => void;
}) {
  if (chats.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="mb-2 text-[14px] text-muted-foreground">{title}</h3>
      <div className="flex flex-col">
        {chats.map((chat) => (
          <ChatHistoryItem chat={chat} key={chat.id} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export function HomeHistory() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    data: paginatedChatHistories,
    isLoading,
    mutate,
  } = useSWRInfinite<ChatHistory>(getChatHistoryPaginationKey, fetcher, {
    fallbackData: [],
  });

  const hasEmptyChatHistory = paginatedChatHistories
    ? paginatedChatHistories.every((page) => page.chats.length === 0)
    : false;

  const handleDelete = () => {
    const chatToDelete = deleteId;

    setShowDeleteDialog(false);

    const deletePromise = fetch(`/api/chat?id=${chatToDelete}`, {
      method: "DELETE",
    });

    toast.promise(deletePromise, {
      loading: "Deleting chat...",
      success: () => {
        mutate((chatHistories) => {
          if (chatHistories) {
            return chatHistories.map((chatHistory) => ({
              ...chatHistory,
              chats: chatHistory.chats.filter(
                (chat) => chat.id !== chatToDelete
              ),
            }));
          }
        });
        return "Chat deleted successfully";
      },
      error: "Failed to delete chat",
    });
  };

  const openDeleteDialog = (chatId: string) => {
    setDeleteId(chatId);
    setShowDeleteDialog(true);
  };

  const chatsFromHistory =
    paginatedChatHistories?.flatMap(
      (paginatedChatHistory) => paginatedChatHistory.chats
    ) ?? [];

  const groupedChats = groupChatsByStatus(chatsFromHistory);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-2">
          {[44, 32, 28, 64, 52].map((item, index) => (
            <div className="flex h-6 items-center" key={index}>
              <div
                className="h-4 animate-pulse rounded bg-muted"
                style={{ width: `${item}%` }}
              />
            </div>
          ))}
        </div>
      );
    }

    if (hasEmptyChatHistory) {
      return (
        <p className="text-muted-foreground">
          Your conversations will appear here once you start chatting.
        </p>
      );
    }

    return (
      <>
        <ChatGroup
          chats={groupedChats.active}
          onDelete={openDeleteDialog}
          title="Active sessions"
        />
        <ChatGroup
          chats={groupedChats.archived}
          onDelete={openDeleteDialog}
          title="Archived sessions"
        />
      </>
    );
  };

  return (
    <>
      <section className="px-8 py-12">
        <div className="relative mx-auto max-w-[1280px] bg-[#F3F3F3] p-8">
          <h2 className="mb-2 font-serif text-[28px] text-foreground leading-[1.5]">
            Application history
          </h2>
          <p className="mb-6 text-[16px] text-foreground">
            Where you&apos;ll find a view-only record of your past sessions
          </p>
          {renderContent()}
        </div>
      </section>

      <AlertDialog onOpenChange={setShowDeleteDialog} open={showDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              chat and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
