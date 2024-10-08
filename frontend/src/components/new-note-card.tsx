import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

interface NewNoteCardProps {
  newNote: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export const NewNoteCard = ({ newNote }: NewNoteCardProps) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState("");

  const handleCloseModal = () => {
    setShouldShowOnboarding(true);
  };

  const handleStartEditor = () => {
    setShouldShowOnboarding(false);
  };

  const handleContentChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSaveNote = async (event: FormEvent) => {
    event.preventDefault();

    if (content === "") {
      return;
    }

    newNote(content);
    setContent("");
    setShouldShowOnboarding(true);
  };

  const handleStartRecording = () => {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      alert("Infelizmente seu navegador não suporta a API de gravação!");
      return;
    }

    setIsRecording(true);
    setShouldShowOnboarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.log(event);
    };
    speechRecognition.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);

    speechRecognition?.stop();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content
          onInteractOutside={handleCloseModal}
          className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 outline-none md:rounded-md flex flex-col overflow-hidden"
        >
          <Dialog.Close
            onClick={handleCloseModal}
            className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 focus:ring-2 focus:ring-slate-500 outline-none"
          >
            <XIcon size={20} />
          </Dialog.Close>

          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>
              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="font-medium text-lime-400 hover:underline focus:ring-2 focus:ring-slate-500 outline-none"
                  >
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline focus:ring-2 focus:ring-slate-500 outline-none"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  value={content}
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChanged}
                />
              )}
            </div>

            {isRecording ? (
              <button
                onClick={handleStopRecording}
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-sm text-slate-300 outline-none font-medium hover:text-slate-100 transition-all"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button
                onClick={handleSaveNote}
                type="button"
                className="w-full bg-lime-400 py-4 text-sm text-lime-950 outline-none font-medium hover:bg-lime-500 transition-all"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
