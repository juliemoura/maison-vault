import { useCallback, useRef, useState } from "react";
import { Upload, X, FileText, Loader2 } from "lucide-react";

export interface UploadFile {
  file: File;
  preview?: string;
  progress?: number;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
}

interface UploaderProps {
  label?: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  maxFiles?: number;
  value?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  onUpload?: (file: File) => Promise<string>;
  variant?: "dropzone" | "compact";
}

export function Uploader({
  label = "Imagens do produto",
  hint = "PNG, JPG ou WEBP — até 5MB cada",
  accept = "image/*",
  multiple = true,
  maxSizeMB = 5,
  maxFiles = 6,
  value = [],
  onChange,
  onUpload,
  variant = "dropzone",
}: UploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isImage = (file: File) => file.type.startsWith("image/");

  const processFiles = useCallback(
    async (fileList: FileList | File[]) => {
      setError(null);
      const incoming = Array.from(fileList);

      if (value.length + incoming.length > maxFiles) {
        setError(`Máximo de ${maxFiles} arquivos`);
        return;
      }

      const accepted: UploadFile[] = [];
      for (const file of incoming) {
        if (file.size > maxSizeMB * 1024 * 1024) {
          setError(`"${file.name}" excede ${maxSizeMB}MB`);
          continue;
        }
        const preview = isImage(file) ? URL.createObjectURL(file) : undefined;
        accepted.push({ file, preview, status: "pending" });
      }

      const next = [...value, ...accepted];
      onChange?.(next);

      if (onUpload) {
        for (const item of accepted) {
          const index = next.findIndex((f) => f.file === item.file);
          next[index] = { ...next[index], status: "uploading" };
          onChange?.([...next]);

          try {
            await onUpload(item.file);
            next[index] = { ...next[index], status: "done" };
          } catch {
            next[index] = {
              ...next[index],
              status: "error",
              error: "Falha no upload",
            };
          }
          onChange?.([...next]);
        }
      }
    },
    [value, maxFiles, maxSizeMB, onChange, onUpload],
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
  }

  function removeFile(index: number) {
    const next = value.filter((_, i) => i !== index);
    onChange?.(next);
  }

  if (variant === "compact") {
    const item = value[0];
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-[9px] tracking-[0.25em] text-[#5a4a38] uppercase">
            {label}
          </label>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="relative w-24 h-24 rounded-sm border border-[#2e2218] bg-[#1a1208] flex items-center justify-center overflow-hidden hover:border-[#c9a87a] transition-colors group"
        >
          {item?.preview ? (
            <>
              <img
                src={item.preview}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0f0c08]/0 group-hover:bg-[#0f0c08]/60 flex items-center justify-center transition-colors">
                <Upload
                  size={16}
                  className="text-[#f0e9dc] opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </>
          ) : (
            <Upload
              size={18}
              className="text-[#3a2c1c] group-hover:text-[#c9a87a] transition-colors"
            />
          )}
          {item?.status === "uploading" && (
            <div className="absolute inset-0 bg-[#0f0c08]/70 flex items-center justify-center">
              <Loader2 size={16} className="text-[#c9a87a] animate-spin" />
            </div>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={false}
          className="hidden"
          onChange={(e) => e.target.files && processFiles(e.target.files)}
        />
        {error && <span className="text-[10px] text-[#b07d4a]">{error}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <label className="text-[9px] tracking-[0.25em] text-[#5a4a38] uppercase">
          {label}
        </label>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center gap-3
          border border-dashed rounded-sm py-10 px-6 cursor-pointer
          transition-colors duration-200
          ${
            isDragging
              ? "border-[#c9a87a] bg-[#1c1408]"
              : "border-[#2e2218] bg-[#1a1208] hover:border-[#3a2c1c]"
          }
        `}
      >
        <div className="w-11 h-11 rounded-full border border-[#2e2218] flex items-center justify-center">
          <Upload size={17} className="text-[#7a6248]" />
        </div>
        <div className="text-center">
          <p className="text-[12px] text-[#b8a090]">
            <span className="text-[#c9a87a]">Clique para enviar</span> ou
            arraste aqui
          </p>
          <p className="text-[10px] text-[#5a4a38] mt-1">{hint}</p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && processFiles(e.target.files)}
        />
      </div>

      {error && (
        <span className="text-[10px] text-[#b07d4a] tracking-wide">
          {error}
        </span>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {value.map((item, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-sm border border-[#2e2218] bg-[#1a1208] overflow-hidden group"
            >
              {item.preview ? (
                <img
                  src={item.preview}
                  alt={item.file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2">
                  <FileText size={20} className="text-[#5a4a38]" />
                  <span className="text-[8px] text-[#5a4a38] text-center truncate w-full">
                    {item.file.name}
                  </span>
                </div>
              )}

              {item.status === "uploading" && (
                <div className="absolute inset-0 bg-[#0f0c08]/70 flex items-center justify-center">
                  <Loader2 size={18} className="text-[#c9a87a] animate-spin" />
                </div>
              )}
              {item.status === "error" && (
                <div className="absolute inset-0 bg-[#0f0c08]/80 flex items-center justify-center">
                  <span className="text-[8px] text-[#b07d4a] text-center px-2">
                    {item.error ?? "Erro"}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                aria-label="Remover arquivo"
                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-sm bg-[#0f0c08]/80 border border-[#2e2218] flex items-center justify-center text-[#7a6248] opacity-0 group-hover:opacity-100 hover:text-[#c9a87a] hover:border-[#c9a87a] transition-all"
              >
                <X size={11} />
              </button>

              {item.status === "done" && (
                <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#c9a87a]" />
              )}
            </div>
          ))}
        </div>
      )}

      {value.length > 0 && (
        <p className="text-[9px] text-[#3a2c1c] tracking-wide">
          {value.length} de {maxFiles} arquivos
        </p>
      )}
    </div>
  );
}
