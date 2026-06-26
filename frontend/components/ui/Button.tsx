"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  variant?: "primary" | "danger" | "secondary";
  className?: string;
}

const variants = {
  primary: "bg-indigo-600 hover:bg-indigo-500 text-white",
  danger: "bg-red-600 hover:bg-red-500 text-white",
  secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/10",
};

export default function Button({
  children,
  onClick,
  type = "button",
  loading = false,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
