import { motion } from "framer-motion";
import { MessageSquare, Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      setMessages([...messages, { id: Date.now(), text: message, isBot: false }]);
      setMessage("");
      
      // Simulate bot typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: "Thank you for your message! I'm here to assist you with your health and nutrition questions.",
          isBot: true
        }]);
      }, 1500);

      // Show toast notification
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully!",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-accent pt-16 px-4"
    >
      <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-lg h-[calc(100vh-8rem)]">
        <div className="h-full flex flex-col">
          <div className="flex items-center p-4 border-b">
            <MessageSquare className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-xl font-serif font-semibold">Health Assistant</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isBot
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-muted text-foreground p-3 rounded-lg">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </span>
                </div>
              </motion.div>
            )}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="flex-none"
                onClick={() => toast({
                  title: "Emoji picker",
                  description: "Emoji picker is not implemented yet!",
                })}
              >
                <Smile className="w-5 h-5" />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit">
                <Send className="w-4 h-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;