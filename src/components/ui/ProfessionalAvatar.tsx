import Image from 'next/image';

interface ProfessionalAvatarProps {
  imageUrl?: string;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  gender?: 'male' | 'female';
}

export default function ProfessionalAvatar({ 
  imageUrl, 
  name, 
  className = '', 
  size = 'md',
  gender 
}: ProfessionalAvatarProps) {
  // Size classes mapping
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-24 h-24',
    xl: 'w-32 h-32 md:w-40 md:h-40'
  };

  const baseClasses = `relative rounded-full overflow-hidden bg-primary-blue flex items-center justify-center ${sizeClasses[size]} ${className}`;

  return (
    <div className={baseClasses}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="160px"
        />
      ) : (
        <span className="text-primary-yellow font-bold text-lg">
          {name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </span>
      )}
    </div>
  );
}
