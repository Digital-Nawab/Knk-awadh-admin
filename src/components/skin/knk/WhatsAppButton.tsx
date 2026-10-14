import { MessageCircle } from "lucide-react";

/**
 * Floating WhatsApp button, mounted once site-wide. UI-complete per the reference layout, but
 * intentionally non-functional (no href) until the client provides a real WhatsApp number —
 * a fake wa.me link would look real and go nowhere.
 */
const WhatsAppButton = () => (
  <a
    href="https://wa.me/918881000552?text=Hello%20KNK%20SKKIN!%20I%20would%20like%20to%20inquire%20about%20a%20skin%20and%20aesthetics%20consultation."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with KNK SKKIN on WhatsApp"
    className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a]"
  >
    <MessageCircle className="h-6 w-6" aria-hidden />
    <span className="sr-only">Chat on WhatsApp</span>
  </a>
);

export default WhatsAppButton;
