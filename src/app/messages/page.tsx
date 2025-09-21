
'use client';

import { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  MoreVertical,
  Search,
  Paperclip,
  Send,
  Flag,
  Globe,
  Archive,
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from '@/components/ui/separator';

const initialConversations = [
  {
    id: 'convo-1',
    name: 'Anjali P.',
    avatar: 'https://picsum.photos/seed/woman-portrait/100/100',
    lastMessage: "I love the vase! Can you tell me more about the blue dye?",
    unread: 2,
    messages: [
      { sender: 'Anjali P.', text: "Hi, I love the vase! Can you tell me more about the blue dye?", time: "10:00 AM" },
      { sender: 'Me', text: "Thank you so much! The blue dye is made from natural indigo leaves.", time: "10:02 AM" },
      { sender: 'Anjali P.', text: "That's fascinating! How long does it take to make?", time: "10:03 AM" },
       { sender: 'Anjali P.', text: "And do you ship to Mumbai?", time: "10:03 AM" },
    ],
  },
  {
    id: 'convo-2',
    name: 'Ismail Khatri',
    avatar: 'https://picsum.photos/seed/man-block-printing/100/100',
    lastMessage: 'Sounds great, looking forward to it.',
    unread: 0,
    messages: [
        { sender: 'Ismail Khatri', text: "Sounds great, looking forward to it.", time: "Yesterday" }
    ],
  },
  {
    id: 'convo-3',
    name: 'Priya K.',
    avatar: 'https://picsum.photos/seed/woman-smiling/100/100',
    lastMessage: 'Can I get this in a different color?',
    unread: 0,
    messages: [
        { sender: 'Priya K.', text: "Can I get this in a different color?", time: "2 days ago" }
    ],
  },
  {
    id: 'convo-4',
    name: 'Kriti Support',
    avatar: 'https://picsum.photos/seed/kriti-logo/100/100', // Use fallback
    lastMessage: 'Welcome! How can we help you get started?',
    unread: 1,
    messages: [
        { sender: 'Kriti Support', text: 'Welcome to Kriti Connect! Let us know if you have any questions about setting up your shop.', time: "3 days ago" },
         { sender: 'Kriti Support', text: 'We have new guides available in the Learning Corner to help you with photography and writing your bio!', time: "1 day ago" },
    ],
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConvoId, setSelectedConvoId] = useState(conversations[0].id);
  const [newMessage, setNewMessage] = useState('');
  
  const selectedConvo = conversations.find(c => c.id === selectedConvoId);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedConvoId) return;

    const message = {
        sender: 'Me',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prevConvos => 
        prevConvos.map(convo => {
            if (convo.id === selectedConvoId) {
                return {
                    ...convo,
                    messages: [...convo.messages, message],
                    lastMessage: newMessage,
                };
            }
            return convo;
        })
    );

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
  }

  return (
    <TooltipProvider>
    <div className="h-[calc(100vh-150px)] flex flex-col">
       <header className="mb-6">
            <h1 className="font-headline text-4xl font-bold tracking-tight">Messages</h1>
            <p className="mt-1 text-lg text-muted-foreground">Your conversation hub for connecting with buyers and artisans.</p>
        </header>

      <div className="border rounded-lg grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 flex-1 overflow-hidden">
        {/* Contact List */}
        <div className="flex flex-col border-r h-full bg-card">
          <div className="p-4 border-b">
            <div className="relative">
              <Input placeholder="Search messages..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <nav className="p-2 space-y-1">
              {conversations.map((convo) => (
                <button
                  key={convo.id}
                  onClick={() => setSelectedConvoId(convo.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
                    selectedConvoId === convo.id ? 'bg-secondary' : 'hover:bg-muted/50'
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={convo.avatar} alt={convo.name} />
                    <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 truncate">
                    <p className="font-semibold text-sm">{convo.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
                  </div>
                  {convo.unread > 0 && (
                    <Badge className="bg-primary h-5 w-5 justify-center p-0">{convo.unread}</Badge>
                  )}
                </button>
              ))}
            </nav>
          </ScrollArea>
           <div className="p-4 border-t mt-auto">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <Archive className="mr-2"/> Archived Chats
              </Button>
           </div>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 xl:col-span-3 flex flex-col h-full">
          {selectedConvo ? (
            <>
              {/* Chat Header */}
              <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                   <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConvo.avatar} alt={selectedConvo.name} />
                    <AvatarFallback>{selectedConvo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-semibold">{selectedConvo.name}</h2>
                </div>
                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon"><Globe /></Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Translate Conversation</p></TooltipContent>
                    </Tooltip>
                     <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon"><Flag /></Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Report User</p></TooltipContent>
                    </Tooltip>
                   <Button variant="ghost" size="icon"><MoreVertical /></Button>
                </div>
              </header>

              {/* Chat History */}
              <ScrollArea className="flex-1 p-4">
                 <div className="space-y-4">
                    {selectedConvo.messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'Me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.sender === 'Me' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p className="text-sm">{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.sender === 'Me' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
                            </div>
                        </div>
                    ))}
                 </div>
              </ScrollArea>

              {/* Input Box */}
              <footer className="p-4 border-t bg-background mt-auto">
                <div className="relative">
                  <Input 
                    placeholder="Type your message..." 
                    className="pr-24" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                   <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button variant="ghost" size="icon"><Paperclip /></Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Attach File</p></TooltipContent>
                    </Tooltip>
                     <Button size="icon" className="h-8 w-8" onClick={handleSendMessage}><Send /></Button>
                   </div>
                </div>
              </footer>
            </>
          ) : (
             <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <MessageSquare className="h-20 w-20 text-muted-foreground mb-4"/>
                <h2 className="text-2xl font-semibold">Select a conversation</h2>
                <p className="text-muted-foreground">Choose one of your existing conversations to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
