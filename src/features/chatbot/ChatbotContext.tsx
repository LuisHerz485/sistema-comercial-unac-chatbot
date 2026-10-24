import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { IntentId } from './types';
import { useChatbot } from './useChatbot';

type ChatbotApi = ReturnType<typeof useChatbot> & {
  isOpen: boolean;
  open: (intent?: IntentId) => void;
  close: () => void;
};

const ChatbotContext = createContext<ChatbotApi | null>(null);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const chatbot = useChatbot();
  const [isOpen, setIsOpen] = useState(false);
  const { send, state } = chatbot;
  const canPickIntent =
    state.stage.name === 'awaiting-query' || state.stage.name === 'choose-intent';

  const open = useCallback(
    (intent?: IntentId) => {
      setIsOpen(true);
      if (intent && canPickIntent) send({ type: 'pick-intent', intent });
    },
    [canPickIntent, send],
  );

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ ...chatbot, isOpen, open, close }),
    [chatbot, isOpen, open, close],
  );

  return <ChatbotContext value={value}>{children}</ChatbotContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChatbotContext(): ChatbotApi {
  const context = useContext(ChatbotContext);
  if (!context) throw new Error('useChatbotContext debe usarse dentro de <ChatbotProvider>.');
  return context;
}
