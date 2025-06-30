import { useImageObserver } from '@/hooks/useImageObserver';

interface TextSectionProps {
  id?: string;
  heading: string;
  children: React.ReactNode;
  imageUrl?: string;
}

export default function TextSection({ id, heading, children, imageUrl }: TextSectionProps) {
  const sectionRef = useImageObserver(imageUrl);

  return (
    <section id={id} ref={sectionRef} className="backdrop-blur-sm bg-white/80 rounded-2xl p-6 md:p-8 lg:p-12">
      <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4 md:mb-12 lg:mb-16 text-center font-[Cormorant_Infant]">
        {heading}
      </h3>
      <div className="text-lg text-gray-700 leading-relaxed font-[Inter]">
        {children}
      </div>
    </section>
  );
}
