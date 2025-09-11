import { useState } from "react";
import { FileText, X } from "lucide-react";

interface Props {
  path?: string | null;   
  label: string;          
}

export default function DocumentPreview({ path, label }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isProvided = path && path.trim() !== "";

  const openPreview = () => {
    if (path) setPreviewUrl(`/preview?path=${encodeURIComponent(path)}`);
  };
  const closePreview = () => setPreviewUrl(null);

  return (
    <div className="mb-4">
      <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </p>

      {isProvided ? (
        <button
          type="button"
          onClick={openPreview}
          className="mt-1 flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
        >
          <FileText className="h-4 w-4" />
          <span>Voir le document</span>
        </button>
      ) : (
        <p className="mt-1 text-gray-500 dark:text-gray-400">Non fourni</p>
      )}

      {/* Modale */}
      {previewUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-5xl h-[85vh]">
            <button
              onClick={closePreview}
              className="absolute -top-12 right-0 inline-flex items-center rounded-lg bg-white/90 px-3 py-2 text-sm font-medium shadow hover:bg-white"
            >
              <X className="mr-1 h-4 w-4" />
              Fermer
            </button>

            <div className="h-full w-full overflow-hidden rounded-xl bg-white shadow-lg">
              <iframe
                src={previewUrl}
                className="h-full w-full"
                title={`Aperçu - ${label}`}
              />
            </div>

            <div className="mt-2 text-center text-xs text-white/80">
              Si le document ne s’affiche pas, essayez de le télécharger depuis
              le navigateur.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
