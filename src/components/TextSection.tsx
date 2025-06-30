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
    <section id={id} ref={sectionRef} className="bg-white/30 backdrop-blur-sm rounded-lg p-8 md:p-12">
      <h3 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-12 md:mb-16 text-center font-[Cormorant_Infant]">
        {heading}
      </h3>
      <div className="text-base md:text-lg text-gray-700 leading-relaxed font-[Inter]">
        {children}
      </div>
    </section>
  );
}
