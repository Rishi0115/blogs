"use client";

interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  id?: string;
}

export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  id,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-white/80">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`rounded-lg border bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:ring-2 focus:ring-indigo-500 ${error ? "border-red-500" : "border-white/10 hover:border-white/20"
          }`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
