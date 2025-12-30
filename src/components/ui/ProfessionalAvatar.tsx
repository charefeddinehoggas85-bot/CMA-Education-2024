import Image from 'next/image';

interface ProfessionalAvatarProps {
  imageUrl?: string;
  name: string;
  className?: string;
}

export default function ProfessionalAvatar({ imageUrl, name, className = '' }: ProfessionalAvatarProps) {
  return (
    <div className={`relative w-16 h-16 rounded-full overflow-hidden bg-primary-blue flex items-center justify-center ${className}`}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="64px"
        />
      ) : (
        <span className="text-primary-yellow font-bold text-lg">
          {name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </span>
      )}
    </div>
  );
}