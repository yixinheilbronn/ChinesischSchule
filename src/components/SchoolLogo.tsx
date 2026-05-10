import Image from "next/image";

export default function SchoolLogo({
  size,
  className = "",
  responsive = true,
}: {
  size?: number;
  className?: string;
  responsive?: boolean;
}) {
  if (responsive) {
    // Use responsive sizing with w-full and h-auto
    return (
      <Image
        src="/logo.jpg"
        alt="Yi Xin Chinese Language School Logo"
        width={500}
        height={500}
        className={`w-full h-auto ${className}`}
        priority
      />
    );
  }

  // Fallback to fixed size if responsive is false
  return (
    <Image
      src="/logo.jpg"
      alt="Yi Xin Chinese Language School Logo"
      width={size || 160}
      height={size || 160}
      className={className}
      priority
    />
  );
}
